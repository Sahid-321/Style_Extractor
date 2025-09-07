import React, { useState } from 'react';
import { ExtractedStyles, ExportFormat } from '../types';
import './StyleExport.css';

interface StyleExportProps {
  extractedStyles: ExtractedStyles | null;
  onExport: (format: ExportFormat) => void;
}

const StyleExport: React.FC<StyleExportProps> = ({ extractedStyles, onExport }) => {
  const [exportFormat, setExportFormat] = useState<ExportFormat>({
    format: 'json',
    includeTokens: true,
    includeComponents: true,
    minifyOutput: false,
  });

  const [previewOutput, setPreviewOutput] = useState<string>('');

  const handleFormatChange = (updates: Partial<ExportFormat>) => {
    const newFormat = { ...exportFormat, ...updates };
    setExportFormat(newFormat);
    generatePreview(newFormat);
  };

  const generatePreview = (format: ExportFormat) => {
    if (!extractedStyles) {
      setPreviewOutput('');
      return;
    }

    let output = '';

    switch (format.format) {
      case 'json':
        output = generateJSONOutput(extractedStyles, format);
        break;
      case 'css':
        output = generateCSSOutput(extractedStyles, format);
        break;
      case 'scss':
        output = generateSCSSOutput(extractedStyles, format);
        break;
      case 'tailwind':
        output = generateTailwindOutput(extractedStyles, format);
        break;
    }

    if (format.minifyOutput && format.format === 'json') {
      output = JSON.stringify(JSON.parse(output));
    }

    setPreviewOutput(output);
  };

  const generateJSONOutput = (styles: ExtractedStyles, format: ExportFormat): string => {
    const output: any = {
      metadata: styles.metadata,
    };

    if (format.includeTokens) {
      output.tokens = styles.tokens;
    }

    if (format.includeComponents) {
      output.components = styles.components;
    }

    return JSON.stringify(output, null, format.minifyOutput ? 0 : 2);
  };

  const generateCSSOutput = (styles: ExtractedStyles, format: ExportFormat): string => {
    let css = '';

    if (format.includeTokens) {
      css += ':root {\n';
      
      // Colors
      styles.tokens.colors.forEach(color => {
        css += `  --color-${color.name.toLowerCase().replace(/\s+/g, '-')}: ${color.hex};\n`;
      });

      // Typography
      styles.tokens.typography.forEach(typo => {
        css += `  --font-${typo.name.toLowerCase().replace(/\s+/g, '-')}-family: ${typo.fontFamily};\n`;
        css += `  --font-${typo.name.toLowerCase().replace(/\s+/g, '-')}-size: ${typo.fontSize}px;\n`;
        css += `  --font-${typo.name.toLowerCase().replace(/\s+/g, '-')}-weight: ${typo.fontWeight};\n`;
      });

      // Spacing
      styles.tokens.spacing.forEach(spacing => {
        css += `  --spacing-${spacing.name.toLowerCase().replace(/\s+/g, '-')}: ${spacing.value}${spacing.unit};\n`;
      });

      css += '}\n\n';
    }

    if (format.includeComponents) {
      styles.components.forEach(component => {
        css += `.component-${component.type}-${component.id} {\n`;
        css += `  width: ${component.measurements.width}px;\n`;
        css += `  height: ${component.measurements.height}px;\n`;
        css += `  padding: ${component.measurements.padding.top}px ${component.measurements.padding.right}px ${component.measurements.padding.bottom}px ${component.measurements.padding.left}px;\n`;
        
        if (component.styles.colors.length > 0) {
          css += `  background-color: ${component.styles.colors[0].hex};\n`;
        }
        
        css += '}\n\n';
      });
    }

    return css;
  };

  const generateSCSSOutput = (styles: ExtractedStyles, format: ExportFormat): string => {
    let scss = '';

    if (format.includeTokens) {
      scss += '// Color tokens\n';
      styles.tokens.colors.forEach(color => {
        scss += `$color-${color.name.toLowerCase().replace(/\s+/g, '-')}: ${color.hex};\n`;
      });
      scss += '\n';

      scss += '// Typography tokens\n';
      styles.tokens.typography.forEach(typo => {
        scss += `$font-${typo.name.toLowerCase().replace(/\s+/g, '-')}: (\n`;
        scss += `  family: ${typo.fontFamily},\n`;
        scss += `  size: ${typo.fontSize}px,\n`;
        scss += `  weight: ${typo.fontWeight}\n`;
        scss += ');\n';
      });
      scss += '\n';

      scss += '// Spacing tokens\n';
      styles.tokens.spacing.forEach(spacing => {
        scss += `$spacing-${spacing.name.toLowerCase().replace(/\s+/g, '-')}: ${spacing.value}${spacing.unit};\n`;
      });
      scss += '\n';
    }

    if (format.includeComponents) {
      styles.components.forEach(component => {
        scss += `.component-${component.type}-${component.id} {\n`;
        scss += `  width: ${component.measurements.width}px;\n`;
        scss += `  height: ${component.measurements.height}px;\n`;
        scss += `  padding: ${component.measurements.padding.top}px ${component.measurements.padding.right}px ${component.measurements.padding.bottom}px ${component.measurements.padding.left}px;\n`;
        
        if (component.styles.colors.length > 0) {
          scss += `  background-color: $color-${component.styles.colors[0].name.toLowerCase().replace(/\s+/g, '-')};\n`;
        }
        
        scss += '}\n\n';
      });
    }

    return scss;
  };

  const generateTailwindOutput = (styles: ExtractedStyles, format: ExportFormat): string => {
    const config: any = {
      theme: {
        extend: {}
      }
    };

    if (format.includeTokens) {
      // Colors
      const colors: any = {};
      styles.tokens.colors.forEach(color => {
        colors[color.name.toLowerCase().replace(/\s+/g, '-')] = color.hex;
      });
      config.theme.extend.colors = colors;

      // Typography
      const fontFamily: any = {};
      const fontSize: any = {};
      styles.tokens.typography.forEach(typo => {
        const name = typo.name.toLowerCase().replace(/\s+/g, '-');
        fontFamily[name] = typo.fontFamily.split(',').map(f => f.trim());
        fontSize[name] = `${typo.fontSize}px`;
      });
      config.theme.extend.fontFamily = fontFamily;
      config.theme.extend.fontSize = fontSize;

      // Spacing
      const spacing: any = {};
      styles.tokens.spacing.forEach(spacingToken => {
        spacing[spacingToken.name.toLowerCase().replace(/\s+/g, '-')] = `${spacingToken.value}${spacingToken.unit}`;
      });
      config.theme.extend.spacing = spacing;
    }

    return `module.exports = ${JSON.stringify(config, null, 2)};`;
  };

  React.useEffect(() => {
    generatePreview(exportFormat);
  }, [extractedStyles, exportFormat]);

  const handleExport = () => {
    onExport(exportFormat);
  };

  const downloadOutput = () => {
    if (!previewOutput) return;

    const fileExtensions = {
      json: 'json',
      css: 'css',
      scss: 'scss',
      tailwind: 'js',
    };

    const fileName = `style-tokens.${fileExtensions[exportFormat.format]}`;
    const blob = new Blob([previewOutput], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const copyToClipboard = async () => {
    if (!previewOutput) return;
    
    try {
      await navigator.clipboard.writeText(previewOutput);
      // You could add a toast notification here
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  return (
    <div className="style-export">
      <div className="export-header">
        <h3>Export Styles</h3>
        <div className="export-actions">
          <button 
            onClick={copyToClipboard} 
            className="copy-btn"
            disabled={!previewOutput}
          >
            Copy to Clipboard
          </button>
          <button 
            onClick={downloadOutput} 
            className="download-btn"
            disabled={!previewOutput}
          >
            Download File
          </button>
        </div>
      </div>

      <div className="export-controls">
        <div className="format-controls">
          <div className="control-group">
            <label>Export Format:</label>
            <select
              value={exportFormat.format}
              onChange={(e) => handleFormatChange({ format: e.target.value as any })}
              className="format-select"
            >
              <option value="json">JSON</option>
              <option value="css">CSS</option>
              <option value="scss">SCSS</option>
              <option value="tailwind">Tailwind Config</option>
            </select>
          </div>

          <div className="control-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={exportFormat.includeTokens}
                onChange={(e) => handleFormatChange({ includeTokens: e.target.checked })}
              />
              Include Tokens
            </label>
          </div>

          <div className="control-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={exportFormat.includeComponents}
                onChange={(e) => handleFormatChange({ includeComponents: e.target.checked })}
              />
              Include Components
            </label>
          </div>

          <div className="control-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={exportFormat.minifyOutput}
                onChange={(e) => handleFormatChange({ minifyOutput: e.target.checked })}
                disabled={exportFormat.format !== 'json'}
              />
              Minify Output (JSON only)
            </label>
          </div>
        </div>
      </div>

      <div className="export-preview">
        <div className="preview-header">
          <h4>Preview Output</h4>
          <span className="preview-info">
            {previewOutput.split('\n').length} lines, {previewOutput.length} characters
          </span>
        </div>
        <div className="preview-content">
          <pre>
            <code className={`language-${exportFormat.format}`}>
              {previewOutput || 'Upload an image and extract styles to see preview...'}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default StyleExport;
