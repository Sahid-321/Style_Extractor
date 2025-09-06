// Style Extractor Types

export interface ColorToken {
  id: string;
  name: string;
  hex: string;
  rgb: string;
  hsl: string;
  usage: 'background' | 'text' | 'border' | 'shadow' | 'other';
  frequency: number;
  originalValue?: string;
  adjustedValue?: string;
}

export interface TypographyToken {
  id: string;
  name: string;
  fontFamily: string;
  fontSize: number;
  fontWeight: number;
  lineHeight: number;
  letterSpacing: number;
  textAlign: 'left' | 'center' | 'right' | 'justify';
  color: string;
  originalValue?: any;
  adjustedValue?: any;
}

export interface SpacingToken {
  id: string;
  name: string;
  value: number;
  unit: 'px' | 'rem' | 'em' | '%';
  type: 'padding' | 'margin' | 'gap';
  direction?: 'top' | 'right' | 'bottom' | 'left' | 'horizontal' | 'vertical' | 'all';
  originalValue?: string;
  adjustedValue?: string;
}

export interface BorderToken {
  id: string;
  name: string;
  width: number;
  style: 'solid' | 'dashed' | 'dotted' | 'none';
  color: string;
  radius: number;
  originalValue?: any;
  adjustedValue?: any;
}

export interface ShadowToken {
  id: string;
  name: string;
  offsetX: number;
  offsetY: number;
  blurRadius: number;
  spreadRadius: number;
  color: string;
  type: 'box-shadow' | 'text-shadow';
  originalValue?: string;
  adjustedValue?: string;
}

export interface ComponentSpec {
  id: string;
  type: 'button' | 'card' | 'input' | 'accordion' | 'breadcrumb' | 'modal' | 'navbar' | 'other';
  name: string;
  boundingBox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  styles: {
    colors: ColorToken[];
    typography: TypographyToken[];
    spacing: SpacingToken[];
    borders: BorderToken[];
    shadows: ShadowToken[];
  };
  states?: ('default' | 'hover' | 'active' | 'disabled' | 'focus')[];
  variants?: string[];
  measurements: {
    width: number;
    height: number;
    padding: { top: number; right: number; bottom: number; left: number };
    margin: { top: number; right: number; bottom: number; left: number };
  };
}

export interface ToleranceSettings {
  color: number; // RGB difference tolerance
  spacing: number; // pixel difference tolerance
  typography: number; // font size difference tolerance
  borderRadius: number; // border radius difference tolerance
}

export interface ExtractedStyles {
  id: string;
  sourceImage: string;
  components: ComponentSpec[];
  tokens: {
    colors: ColorToken[];
    typography: TypographyToken[];
    spacing: SpacingToken[];
    borders: BorderToken[];
    shadows: ShadowToken[];
  };
  metadata: {
    extractedAt: Date;
    imageUrl: string;
    imageDimensions: { width: number; height: number };
    viewport: 'desktop' | 'tablet' | 'mobile';
    tolerances: ToleranceSettings;
  };
}

export interface AnalysisResult {
  dominantColors: ColorToken[];
  detectedComponents: ComponentSpec[];
  suggestedTokens: {
    colors: ColorToken[];
    typography: TypographyToken[];
    spacing: SpacingToken[];
    borders: BorderToken[];
    shadows: ShadowToken[];
  };
}

export interface ExportFormat {
  format: 'json' | 'css' | 'scss' | 'tailwind';
  includeTokens: boolean;
  includeComponents: boolean;
  minifyOutput: boolean;
}
