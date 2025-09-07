# Style Extractor - Assessment Implementation

A React-based application that extracts comprehensive style specifications from UI screenshots and design images. This tool identifies and measures style elements, interprets design components, and packages them into a usable, editable specification.

## 🎯 Features

### Core Functionality
- **Image Upload**: Support for drag & drop, file selection, and URL-based image loading
- **Style Extraction**: Automatic detection and extraction of:
  - Colors (with frequency analysis and semantic naming)
  - Typography (font families, sizes, weights, spacing)
  - Spacing tokens (padding, margins, gaps)
  - Border styles and border radius
  - Shadow effects
- **Component Detection**: Identifies common UI components (buttons, cards, inputs, etc.)
- **Visual Preview**: Side-by-side comparison with original design
- **Editable Interface**: Modify extracted values before export
- **Multiple Export Formats**: JSON, CSS, SCSS, Tailwind Config

### Advanced Features
- **Tolerance Settings**: Configurable ranges for acceptable deviations
- **Multiple Viewport Support**: Desktop, tablet, and mobile layouts
- **Component States**: Detection of hover, active, disabled states
- **Real-time Updates**: Live preview of changes
- **Test Cases**: Built-in sample designs for testing

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Navigate to the project directory
cd style-extractor

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`.

### Available Scripts
- `npm start` - Run development server
- `npm test` - Run test suite
- `npm run build` - Build for production
- `npm run eject` - Eject from Create React App

## 📋 Usage

### 1. Upload Design Screenshot
- **File Upload**: Drag & drop or click to select image files (PNG, JPEG, WEBP)
- **URL Input**: Load images directly from URLs
- **Sample Images**: Try built-in test cases

### 2. Configure Detection Settings
Adjust tolerance levels for:
- **Color Tolerance**: RGB difference threshold (1-50)
- **Spacing Tolerance**: Pixel difference threshold (1-20px)
- **Typography Tolerance**: Font size difference threshold (1-5px)
- **Border Radius Tolerance**: Radius difference threshold (1-10px)

### 3. Review & Edit Extracted Styles

#### Colors Tab
- View extracted color palette with frequency analysis
- Edit color names, hex values, and usage classifications
- Semantic color naming (primary, secondary, etc.)
- RGB and HSL value display

#### Typography Tab
- Preview text styles with sample content
- Edit font families, sizes, weights, line heights
- Letter spacing and text alignment controls
- Color assignment for text elements

#### Components Tab  
- Visual component detection overlay
- Bounding box visualization
- Component type classification (button, card, input, etc.)
- Measurement details (dimensions, padding, margins)
- State detection (default, hover, active)

#### Export Tab
- Multiple format options (JSON, CSS, SCSS, Tailwind)
- Include/exclude tokens and components
- Minification options
- Live preview of output
- Copy to clipboard or download file

### 4. Export Results

Example JSON output:
```json
{
  "metadata": {
    "extractedAt": "2024-12-09T...",
    "viewport": "desktop",
    "tolerances": {...}
  },
  "tokens": {
    "colors": [
      {
        "id": "primary-blue",
        "name": "Primary Blue", 
        "hex": "#3b82f6",
        "usage": "background",
        "frequency": 50
      }
    ],
    "typography": [...],
    "spacing": [...],
    "borders": [...],
    "shadows": [...]
  },
  "components": [...]
}
```

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18 with TypeScript
- **Styling**: CSS3 with CSS Modules
- **Image Processing**: HTML5 Canvas API, Fabric.js
- **State Management**: React Hooks (useState, useCallback)
- **Build Tool**: Create React App

### Project Structure
```
src/
├── components/           # React components
│   ├── ColorPalette.tsx     # Color token editor
│   ├── TypographyPreview.tsx # Typography editor  
│   ├── ComponentDetection.tsx # Component visualization
│   ├── StyleExport.tsx      # Export functionality
│   └── ImageUpload.tsx      # Image upload interface
├── types/               # TypeScript definitions
│   └── index.ts
├── utils/               # Core utilities
│   ├── styleExtractor.ts    # Main extraction logic
│   └── testCases.ts         # Sample test data
└── App.tsx              # Main application component
```

### Core Classes

#### `StyleExtractor`
Main extraction engine with these key methods:
- `extractFromImage()` - Primary extraction pipeline
- Delegates to specialized analyzers

#### `ColorAnalyzer` 
- Canvas pixel sampling and analysis
- Color frequency calculation  
- Semantic naming generation
- Usage classification (background/text/border)

#### `ComponentDetector`
- Shape detection algorithms
- Component type inference
- Bounding box calculation
- State detection

#### `TypographyAnalyzer`
- Font detection and measurement
- Text style analysis
- Hierarchy classification

## 🧪 Test Cases

The application includes three comprehensive test scenarios:

### 1. Modern Dashboard (Desktop)
- **Components**: Navigation bar, primary/secondary buttons, cards
- **Colors**: 6 semantic colors with usage classification
- **Typography**: 5 hierarchical text styles
- **Spacing**: 8-point spacing system
- **Viewport**: Desktop (1200px+)

### 2. Button Components
- **Components**: 4 button variants (primary, danger, success, warning) 
- **States**: Default, hover, active states
- **Colors**: Brand color palette
- **Typography**: Consistent button text styling
- **Focus**: Component state variations

### 3. Mobile Card Layout  
- **Components**: Stacked card layout
- **Colors**: Minimal grayscale palette
- **Spacing**: Mobile-optimized spacing tokens
- **Viewport**: Mobile (375px)
- **Focus**: Responsive design patterns

## 🔧 Implementation Details

### Style Detection Logic

#### Color Extraction
```typescript
// Sample pixels to avoid processing every pixel
const sampleRate = Math.max(1, Math.floor(pixels.length / 40000));

for (let i = 0; i < pixels.length; i += 4 * sampleRate) {
  const r = pixels[i];
  const g = pixels[i + 1]; 
  const b = pixels[i + 2];
  const a = pixels[i + 3];
  
  if (a < 128) continue; // Skip transparent
  
  const hex = this.rgbToHex(r, g, b);
  colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
}
```

#### Component Detection
Uses simplified computer vision techniques:
- Edge detection for shape identification
- Aspect ratio analysis for component classification
- Spatial relationship mapping
- Bounding box calculation

#### Measurement Calculation
- Pixel-perfect dimension extraction
- Padding/margin inference from spacing patterns
- Border radius detection via corner analysis
- Shadow extraction from blur patterns

### Tolerances & Accuracy

The tolerance system allows for acceptable variations:

- **Color Tolerance**: Handles slight variations in similar colors (10 RGB units default)
- **Spacing Tolerance**: Accounts for sub-pixel positioning (5px default)  
- **Typography Tolerance**: Font size variations (2px default)
- **Border Radius**: Corner radius variations (3px default)

### Export Formats

#### JSON
Complete specification with metadata, tokens, and components

#### CSS  
CSS custom properties for design tokens
```css
:root {
  --color-primary: #3b82f6;
  --font-heading-size: 32px;
  --spacing-md: 16px;
}
```

#### SCSS
Sass variables and maps
```scss
$color-primary: #3b82f6;
$font-heading: (
  size: 32px,
  weight: 700
);
```

#### Tailwind Config
Tailwind CSS configuration extension
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'primary': '#3b82f6'
      }
    }
  }
};
```

## 🚧 Challenges & Limitations

### Current Limitations
1. **Simplified Computer Vision**: Uses basic shape detection rather than advanced ML
2. **Typography Recognition**: Limited to inference based on visual patterns
3. **Component State Detection**: Requires manual classification in many cases
4. **Cross-Origin Images**: URL loading subject to CORS restrictions
5. **Complex Layouts**: May struggle with overlapping or irregular components

### Accuracy Considerations
- **Image Quality**: Higher resolution images yield better results
- **Contrast Requirements**: Clear distinction between elements improves detection
- **Component Isolation**: Clean, separated components are easier to detect
- **File Format**: Uncompressed formats (PNG) preferred over JPEG

### Potential Improvements
1. **Machine Learning Integration**: Use trained models for better component detection
2. **OCR Integration**: Improve typography analysis with text recognition
3. **Advanced Image Processing**: Implement sophisticated edge detection algorithms  
4. **Template Matching**: Pre-trained component pattern recognition
5. **Batch Processing**: Support for multiple image analysis
6. **Design System Integration**: Direct integration with design system APIs

## 📊 Performance Considerations

### Optimization Techniques
- **Pixel Sampling**: Reduces processing load by analyzing subset of pixels
- **Debounced Updates**: Prevents excessive re-renders during editing
- **Lazy Loading**: Components loaded on-demand
- **Memory Management**: Canvas cleanup and blob URL revocation

### Scalability
- **Large Images**: Automatic downsampling for images > 2MB
- **Processing Time**: ~2-5 seconds for typical screenshots
- **Memory Usage**: ~50-100MB for average design files
- **Browser Compatibility**: Modern browsers with Canvas support

## 🤝 Contributing

### Development Setup
```bash
npm install
npm start
```

### Code Style
- TypeScript strict mode enabled
- ESLint configuration included  
- Prettier formatting
- Semantic commit messages

### Testing Strategy
- Unit tests for utility functions
- Integration tests for component interactions
- Visual regression tests for UI consistency
- Performance benchmarks for extraction speed

## 📝 License

This project is created for assessment purposes.

---

## 📞 Support

For questions or issues related to this assessment implementation, please refer to the inline code documentation and comments explaining the logic and assumptions made during development.
