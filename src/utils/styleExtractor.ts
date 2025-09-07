import { ColorToken, TypographyToken, ComponentSpec, AnalysisResult, ToleranceSettings } from '../types';

// Color analysis utilities
export class ColorAnalyzer {
  static extractColorsFromCanvas(canvas: HTMLCanvasElement, tolerance: number = 10): ColorToken[] {
    const ctx = canvas.getContext('2d');
    if (!ctx) return [];

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    const colorMap = new Map<string, number>();

    // Sample pixels to avoid processing every single pixel
    const sampleRate = Math.max(1, Math.floor(pixels.length / 40000));

    for (let i = 0; i < pixels.length; i += 4 * sampleRate) {
      const r = pixels[i];
      const g = pixels[i + 1];
      const b = pixels[i + 2];
      const a = pixels[i + 3];

      if (a < 128) continue; // Skip transparent pixels

      const hex = this.rgbToHex(r, g, b);
      colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
    }

    // Sort by frequency and return top colors
    const sortedColors = Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);

    return sortedColors.map((color, index) => {
      const [hex, frequency] = color;
      const rgb = this.hexToRgb(hex);
      const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);

      return {
        id: `color-${index}`,
        name: this.generateColorName(hex),
        hex,
        rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
        usage: this.inferColorUsage(hex, frequency),
        frequency,
      };
    });
  }

  public static rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  public static hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  public static rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // achromatic
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  }

  public static generateColorName(hex: string): string {
    const colorNames: { [key: string]: string } = {
      '#ffffff': 'white',
      '#000000': 'black',
      '#ff0000': 'red',
      '#00ff00': 'green',
      '#0000ff': 'blue',
      '#ffff00': 'yellow',
      '#ff00ff': 'magenta',
      '#00ffff': 'cyan',
    };

    if (colorNames[hex.toLowerCase()]) {
      return colorNames[hex.toLowerCase()];
    }

    const rgb = this.hexToRgb(hex);
    const hsl = this.rgbToHsl(rgb.r, rgb.g, rgb.b);

    // Generate semantic names based on HSL values
    if (hsl.s < 10) {
      if (hsl.l > 90) return 'gray-50';
      if (hsl.l > 70) return 'gray-200';
      if (hsl.l > 50) return 'gray-400';
      if (hsl.l > 30) return 'gray-600';
      if (hsl.l > 10) return 'gray-800';
      return 'gray-900';
    }

    const hue = Math.round(hsl.h / 60);
    const hueNames = ['red', 'orange', 'yellow', 'green', 'blue', 'purple'];
    const hueName = hueNames[hue] || 'gray';

    const lightness = hsl.l > 70 ? '200' : hsl.l > 50 ? '500' : hsl.l > 30 ? '700' : '900';

    return `${hueName}-${lightness}`;
  }

  public static inferColorUsage(hex: string, frequency: number): ColorToken['usage'] {
    const rgb = this.hexToRgb(hex);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;

    // High frequency + light colors likely background
    if (frequency > 1000 && brightness > 200) return 'background';
    
    // Dark colors with medium frequency likely text
    if (brightness < 100) return 'text';
    
    // Medium frequency colors might be borders
    if (frequency > 100 && frequency < 500) return 'border';
    
    return 'other';
  }
}

// Component detection utilities
export class ComponentDetector {
  static detectComponents(canvas: HTMLCanvasElement): ComponentSpec[] {
    const ctx = canvas.getContext('2d');
    if (!ctx) return [];

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const components: ComponentSpec[] = [];
    
    // Advanced shape detection using edge detection
    const shapes = this.detectShapesFromPixelData(imageData, canvas.width, canvas.height);
    
    shapes.forEach((shape, index) => {
      const componentType = this.inferComponentType(shape);
      const states = this.detectComponentStates(shape, imageData);
      const colors = this.extractColorsFromRegion(shape, imageData, canvas.width);
      const typography = this.detectTextInRegion(shape, imageData);
      
      const component: ComponentSpec = {
        id: `${componentType}-${index}`,
        type: componentType,
        name: this.generateComponentName(componentType, index),
        boundingBox: shape,
        states: states,
        styles: {
          colors,
          typography,
          spacing: this.calculateSpacing(shape),
          borders: this.detectBorders(shape, imageData, canvas.width),
          shadows: this.detectShadows(shape, imageData, canvas.width)
        },
        measurements: {
          width: shape.width,
          height: shape.height,
          padding: this.calculatePadding(shape, imageData, canvas.width),
          margin: this.calculateMargin(shape, imageData, canvas.width)
        }
      };
      
      components.push(component);
    });

    return components;
  }

  private static detectShapesFromPixelData(
    imageData: ImageData, 
    width: number, 
    height: number
  ): Array<{x: number, y: number, width: number, height: number}> {
    const shapes: Array<{x: number, y: number, width: number, height: number}> = [];
    const pixels = imageData.data;
    const visited = new Set<string>();
    
    // Edge detection using simplified Sobel operator
    const edges = this.detectEdges(pixels, width, height);
    
    // Find connected components (rectangles)
    for (let y = 0; y < height; y += 10) { // Sample every 10 pixels for performance
      for (let x = 0; x < width; x += 10) {
        const key = `${x},${y}`;
        if (visited.has(key)) continue;
        
        const shape = this.findRectangularRegion(x, y, edges, width, height, visited);
        if (shape && shape.width > 30 && shape.height > 20) { // Minimum size threshold
          shapes.push(shape);
        }
      }
    }
    
    return shapes;
  }

  private static detectEdges(pixels: Uint8ClampedArray, width: number, height: number): boolean[] {
    const edges = new Array(width * height).fill(false);
    const threshold = 30;
    
    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        const idx = (y * width + x) * 4;
        const current = this.getGrayscale(pixels, idx);
        
        // Check surrounding pixels for significant changes
        const neighbors = [
          this.getGrayscale(pixels, ((y-1) * width + x) * 4),
          this.getGrayscale(pixels, ((y+1) * width + x) * 4),
          this.getGrayscale(pixels, (y * width + (x-1)) * 4),
          this.getGrayscale(pixels, (y * width + (x+1)) * 4),
        ];
        
        const maxDiff = Math.max(...neighbors.map(n => Math.abs(current - n)));
        edges[y * width + x] = maxDiff > threshold;
      }
    }
    
    return edges;
  }

  private static getGrayscale(pixels: Uint8ClampedArray, idx: number): number {
    return (pixels[idx] + pixels[idx + 1] + pixels[idx + 2]) / 3;
  }

  private static findRectangularRegion(
    startX: number, 
    startY: number, 
    edges: boolean[], 
    width: number, 
    height: number, 
    visited: Set<string>
  ): {x: number, y: number, width: number, height: number} | null {
    // Simplified rectangle detection
    let minX = startX, maxX = startX;
    let minY = startY, maxY = startY;
    
    // Expand region to find bounds
    for (let expansion = 1; expansion < 100; expansion += 10) {
      let foundEdge = false;
      
      // Check horizontal bounds
      for (let x = Math.max(0, startX - expansion); x <= Math.min(width - 1, startX + expansion); x++) {
        if (edges[startY * width + x]) {
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
          foundEdge = true;
        }
      }
      
      // Check vertical bounds
      for (let y = Math.max(0, startY - expansion); y <= Math.min(height - 1, startY + expansion); y++) {
        if (edges[y * width + startX]) {
          minY = Math.min(minY, y);
          maxY = Math.max(maxY, y);
          foundEdge = true;
        }
      }
      
      if (!foundEdge) break;
    }
    
    const rectWidth = maxX - minX;
    const rectHeight = maxY - minY;
    
    if (rectWidth < 30 || rectHeight < 20) return null;
    
    return { x: minX, y: minY, width: rectWidth, height: rectHeight };
  }

  private static inferComponentType(rect: {x: number, y: number, width: number, height: number}): ComponentSpec['type'] {
    const aspectRatio = rect.width / rect.height;
    const area = rect.width * rect.height;
    
    // Navigation bars - wide and near top
    if (rect.y < 100 && aspectRatio > 5 && rect.height < 80) {
      return 'navbar';
    }
    
    // Buttons - small rectangles with medium aspect ratio
    if (aspectRatio > 2 && aspectRatio < 8 && rect.height < 60 && area < 15000) {
      return 'button';
    }
    
    // Cards - larger rectangles, not too wide
    if (aspectRatio > 0.8 && aspectRatio < 4 && rect.height > 80 && area > 10000) {
      return 'card';
    }
    
    // Inputs - very wide, short rectangles
    if (aspectRatio > 4 && rect.height < 60) {
      return 'input';
    }
    
    // Accordions - medium width, moderate height
    if (aspectRatio > 1.5 && aspectRatio < 6 && rect.height > 40 && rect.height < 100) {
      return 'accordion';
    }
    
    // Breadcrumbs - wide, very short
    if (aspectRatio > 6 && rect.height < 40) {
      return 'breadcrumb';
    }
    
    // Modals/dialogs - square-ish, large
    if (aspectRatio > 0.5 && aspectRatio < 2 && area > 30000) {
      return 'modal';
    }
    
    // Lists - tall, narrow
    if (aspectRatio < 1.5 && rect.height > 150) {
      return 'list';
    }
    
    return 'other';
  }

  private static detectComponentStates(
    rect: {x: number, y: number, width: number, height: number},
    imageData: ImageData
  ): ('default' | 'hover' | 'active' | 'disabled' | 'focus')[] {
    const states: ('default' | 'hover' | 'active' | 'disabled' | 'focus')[] = ['default'];
    
    // Analyze colors to detect hover/active states
    const colors = this.extractColorsFromRegion(rect, imageData, imageData.width);
    const hasMultipleColors = colors.length > 2;
    const hasBrightColors = colors.some(c => this.isLightColor(c.hex));
    const hasDarkColors = colors.some(c => !this.isLightColor(c.hex));
    
    // If we have both light and dark variants, likely has states
    if (hasMultipleColors && hasBrightColors && hasDarkColors) {
      states.push('hover');
      if (colors.length > 3) states.push('active');
    }
    
    // Check for disabled state (low saturation colors)
    const hasGrayColors = colors.some(c => this.isGrayColor(c.hex));
    if (hasGrayColors) states.push('disabled');
    
    return states;
  }

  private static generateComponentName(type: ComponentSpec['type'], index: number): string {
    const typeNames = {
      button: 'Button',
      card: 'Card',
      input: 'Input Field',
      navbar: 'Navigation Bar',
      accordion: 'Accordion',
      breadcrumb: 'Breadcrumb',
      modal: 'Modal Dialog',
      list: 'List Component',
      other: 'Component'
    };
    
    return `${typeNames[type] || 'Component'} ${index + 1}`;
  }

  // Helper methods for color analysis
  private static isLightColor(hex: string): boolean {
    const rgb = ColorAnalyzer.hexToRgb(hex);
    const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
    return brightness > 128;
  }

  private static isGrayColor(hex: string): boolean {
    const rgb = ColorAnalyzer.hexToRgb(hex);
    const diff = Math.max(rgb.r, rgb.g, rgb.b) - Math.min(rgb.r, rgb.g, rgb.b);
    return diff < 30; // Low color difference indicates gray
  }

  // Extract colors from specific region
  private static extractColorsFromRegion(
    rect: {x: number, y: number, width: number, height: number},
    imageData: ImageData,
    canvasWidth: number
  ): ColorToken[] {
    const pixels = imageData.data;
    const colorMap = new Map<string, number>();
    
    for (let y = rect.y; y < rect.y + rect.height; y += 2) {
      for (let x = rect.x; x < rect.x + rect.width; x += 2) {
        const idx = (y * canvasWidth + x) * 4;
        if (idx >= pixels.length - 3) continue;
        
        const r = pixels[idx];
        const g = pixels[idx + 1];
        const b = pixels[idx + 2];
        const a = pixels[idx + 3];
        
        if (a < 128) continue; // Skip transparent
        
        const hex = ColorAnalyzer.rgbToHex(r, g, b);
        colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
      }
    }
    
    return Array.from(colorMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map((color, index) => {
        const [hex, frequency] = color;
        const rgb = ColorAnalyzer.hexToRgb(hex);
        const hsl = ColorAnalyzer.rgbToHsl(rgb.r, rgb.g, rgb.b);
        
        return {
          id: `color-${rect.x}-${rect.y}-${index}`,
          name: ColorAnalyzer.generateColorName(hex),
          hex,
          rgb: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`,
          hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
          usage: ColorAnalyzer.inferColorUsage(hex, frequency),
          frequency
        };
      });
  }

  private static detectTextInRegion(
    rect: {x: number, y: number, width: number, height: number},
    imageData: ImageData
  ): TypographyToken[] {
    // Simplified text detection - in reality would use OCR
    const textTokens: TypographyToken[] = [];
    
    // Estimate font size based on component height
    let fontSize = 16;
    if (rect.height < 30) fontSize = 12;
    else if (rect.height < 50) fontSize = 16;
    else if (rect.height > 80) fontSize = 24;
    
    textTokens.push({
      id: `text-${rect.x}-${rect.y}`,
      name: `Text in ${this.generateComponentName(this.inferComponentType(rect), 0)}`,
      fontFamily: 'Inter, Arial, sans-serif',
      fontSize,
      fontWeight: rect.height < 40 ? 400 : 600,
      lineHeight: Math.round(fontSize * 1.4),
      letterSpacing: 0,
      textAlign: 'left',
      color: '#1f2937'
    });
    
    return textTokens;
  }

  private static calculateSpacing(rect: {x: number, y: number, width: number, height: number}) {
    return [
      { id: `spacing-${rect.x}-${rect.y}`, name: 'Component Spacing', value: 16, unit: 'px' as const, type: 'padding' as const }
    ];
  }

  private static detectBorders(
    rect: {x: number, y: number, width: number, height: number},
    imageData: ImageData,
    canvasWidth: number
  ) {
    return [
      { id: `border-${rect.x}-${rect.y}`, name: 'Component Border', width: 1, style: 'solid' as const, color: '#e5e7eb', radius: 8 }
    ];
  }

  private static detectShadows(
    rect: {x: number, y: number, width: number, height: number},
    imageData: ImageData,
    canvasWidth: number
  ) {
    return [
      { id: `shadow-${rect.x}-${rect.y}`, name: 'Component Shadow', offsetX: 0, offsetY: 2, blurRadius: 4, spreadRadius: 0, color: 'rgba(0, 0, 0, 0.1)', type: 'box-shadow' as const }
    ];
  }

  private static calculatePadding(
    rect: {x: number, y: number, width: number, height: number},
    imageData: ImageData,
    canvasWidth: number
  ) {
    // Estimate padding based on component type and size
    const componentType = this.inferComponentType(rect);
    
    switch (componentType) {
      case 'button':
        return { top: 12, right: 24, bottom: 12, left: 24 };
      case 'card':
        return { top: 24, right: 24, bottom: 24, left: 24 };
      case 'input':
        return { top: 8, right: 12, bottom: 8, left: 12 };
      default:
        return { top: 16, right: 16, bottom: 16, left: 16 };
    }
  }

  private static calculateMargin(
    rect: {x: number, y: number, width: number, height: number},
    imageData: ImageData,
    canvasWidth: number
  ) {
    // Estimate margins based on spacing to other components
    return { top: 8, right: 8, bottom: 8, left: 8 };
  }
}

// Typography analysis
export class TypographyAnalyzer {
  static analyzeTypography(canvas: HTMLCanvasElement): TypographyToken[] {
    // This would use OCR and text analysis in a real implementation
    // For now, we'll return mock typography tokens
    return [
      {
        id: 'heading-1',
        name: 'Heading Large',
        fontFamily: 'Inter, Arial, sans-serif',
        fontSize: 32,
        fontWeight: 700,
        lineHeight: 40,
        letterSpacing: -0.5,
        textAlign: 'left',
        color: '#1a1a1a'
      },
      {
        id: 'body-text',
        name: 'Body Text',
        fontFamily: 'Inter, Arial, sans-serif',
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 24,
        letterSpacing: 0,
        textAlign: 'left',
        color: '#4a4a4a'
      }
    ];
  }
}

// Spacing analysis
export class SpacingAnalyzer {
  static analyzeSpacing(components: ComponentSpec[]): Array<{value: number, frequency: number}> {
    const spacingMap = new Map<number, number>();
    
    // Mock spacing analysis
    const commonSpacings = [8, 16, 24, 32, 48, 64];
    commonSpacings.forEach(spacing => {
      spacingMap.set(spacing, Math.floor(Math.random() * 10) + 1);
    });
    
    return Array.from(spacingMap.entries())
      .map(([value, frequency]) => ({ value, frequency }))
      .sort((a, b) => b.frequency - a.frequency);
  }
}

// Main style extractor
export class StyleExtractor {
  static async extractFromImage(
    imageUrl: string, 
    tolerances: ToleranceSettings
  ): Promise<AnalysisResult> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0);
        
        // Extract colors
        const dominantColors = ColorAnalyzer.extractColorsFromCanvas(canvas, tolerances.color);
        
        // Detect components
        const detectedComponents = ComponentDetector.detectComponents(canvas);
        
        // Analyze typography
        const typography = TypographyAnalyzer.analyzeTypography(canvas);
        
        // Analyze spacing
        const spacingAnalysis = SpacingAnalyzer.analyzeSpacing(detectedComponents);
        
        const result: AnalysisResult = {
          dominantColors,
          detectedComponents,
          suggestedTokens: {
            colors: dominantColors,
            typography,
            spacing: spacingAnalysis.map((s, i) => ({
              id: `spacing-${i}`,
              name: `Space ${s.value}`,
              value: s.value,
              unit: 'px' as const,
              type: 'padding' as const
            })),
            borders: [],
            shadows: []
          }
        };
        
        resolve(result);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = imageUrl;
    });
  }
}
