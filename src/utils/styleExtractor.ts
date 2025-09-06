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

  private static rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  private static hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  private static rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
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

  private static generateColorName(hex: string): string {
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

  private static inferColorUsage(hex: string, frequency: number): ColorToken['usage'] {
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

    // This is a simplified component detection
    // In a real implementation, you'd use more sophisticated computer vision
    const components: ComponentSpec[] = [];
    
    // Simulate detecting rectangular components
    const rects = this.findRectangularShapes(canvas);
    
    rects.forEach((rect, index) => {
      const component: ComponentSpec = {
        id: `component-${index}`,
        type: this.inferComponentType(rect),
        name: `Component ${index + 1}`,
        boundingBox: rect,
        styles: {
          colors: [],
          typography: [],
          spacing: [],
          borders: [],
          shadows: []
        },
        measurements: {
          width: rect.width,
          height: rect.height,
          padding: { top: 0, right: 0, bottom: 0, left: 0 },
          margin: { top: 0, right: 0, bottom: 0, left: 0 }
        }
      };
      
      components.push(component);
    });

    return components;
  }

  private static findRectangularShapes(canvas: HTMLCanvasElement): Array<{x: number, y: number, width: number, height: number}> {
    // Simplified shape detection - in reality you'd use edge detection algorithms
    const shapes = [];
    const width = canvas.width;
    const height = canvas.height;
    
    // Create some mock detected shapes
    shapes.push({ x: 50, y: 50, width: 200, height: 40 }); // Button
    shapes.push({ x: 50, y: 120, width: 300, height: 150 }); // Card
    shapes.push({ x: 50, y: 300, width: 250, height: 30 }); // Input
    
    return shapes;
  }

  private static inferComponentType(rect: {x: number, y: number, width: number, height: number}): ComponentSpec['type'] {
    const aspectRatio = rect.width / rect.height;
    
    // Button-like aspect ratio
    if (aspectRatio > 2 && aspectRatio < 8 && rect.height < 60) {
      return 'button';
    }
    
    // Card-like aspect ratio
    if (aspectRatio > 1.2 && aspectRatio < 3 && rect.height > 100) {
      return 'card';
    }
    
    // Input-like aspect ratio
    if (aspectRatio > 4 && rect.height < 50) {
      return 'input';
    }
    
    return 'other';
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
