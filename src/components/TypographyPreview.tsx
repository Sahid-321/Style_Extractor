import React from 'react';
import { TypographyToken } from '../types';
import './TypographyPreview.css';

interface TypographyPreviewProps {
  typography: TypographyToken[];
  onTypographyEdit: (id: string, updates: Partial<TypographyToken>) => void;
  onTypographyDelete: (id: string) => void;
}

const TypographyPreview: React.FC<TypographyPreviewProps> = ({
  typography,
  onTypographyEdit,
  onTypographyDelete,
}) => {
  const handleTypographyChange = (id: string, field: keyof TypographyToken, value: any) => {
    onTypographyEdit(id, { [field]: value });
  };

  const generatePreviewStyle = (token: TypographyToken) => ({
    fontFamily: token.fontFamily,
    fontSize: `${token.fontSize}px`,
    fontWeight: token.fontWeight,
    lineHeight: `${token.lineHeight}px`,
    letterSpacing: `${token.letterSpacing}px`,
    textAlign: token.textAlign,
    color: token.color,
  });

  return (
    <div className="typography-preview">
      <h3>Typography Tokens</h3>
      <div className="typography-grid">
        {typography.map((token) => (
          <div key={token.id} className="typography-token">
            <div className="typography-preview-text">
              <div style={generatePreviewStyle(token)}>
                The quick brown fox jumps over the lazy dog
              </div>
              <div className="typography-sample-sizes">
                <div style={{ ...generatePreviewStyle(token), fontSize: '24px' }}>Heading</div>
                <div style={{ ...generatePreviewStyle(token), fontSize: '16px' }}>Body text</div>
                <div style={{ ...generatePreviewStyle(token), fontSize: '12px' }}>Caption</div>
              </div>
            </div>
            
            <div className="typography-controls">
              <div className="typography-control-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={token.name}
                  onChange={(e) => handleTypographyChange(token.id, 'name', e.target.value)}
                  className="typography-name-input"
                />
              </div>
              
              <div className="typography-control-group">
                <label>Font Family:</label>
                <input
                  type="text"
                  value={token.fontFamily}
                  onChange={(e) => handleTypographyChange(token.id, 'fontFamily', e.target.value)}
                  className="typography-input"
                />
              </div>
              
              <div className="typography-control-row">
                <div className="typography-control-group">
                  <label>Size:</label>
                  <input
                    type="number"
                    value={token.fontSize}
                    onChange={(e) => handleTypographyChange(token.id, 'fontSize', parseInt(e.target.value))}
                    className="typography-number-input"
                    min="8"
                    max="72"
                  />
                  <span className="unit">px</span>
                </div>
                
                <div className="typography-control-group">
                  <label>Weight:</label>
                  <select
                    value={token.fontWeight}
                    onChange={(e) => handleTypographyChange(token.id, 'fontWeight', parseInt(e.target.value))}
                    className="typography-select"
                  >
                    <option value={100}>100 - Thin</option>
                    <option value={200}>200 - Extra Light</option>
                    <option value={300}>300 - Light</option>
                    <option value={400}>400 - Regular</option>
                    <option value={500}>500 - Medium</option>
                    <option value={600}>600 - Semi Bold</option>
                    <option value={700}>700 - Bold</option>
                    <option value={800}>800 - Extra Bold</option>
                    <option value={900}>900 - Black</option>
                  </select>
                </div>
              </div>
              
              <div className="typography-control-row">
                <div className="typography-control-group">
                  <label>Line Height:</label>
                  <input
                    type="number"
                    value={token.lineHeight}
                    onChange={(e) => handleTypographyChange(token.id, 'lineHeight', parseInt(e.target.value))}
                    className="typography-number-input"
                    min="10"
                    max="100"
                  />
                  <span className="unit">px</span>
                </div>
                
                <div className="typography-control-group">
                  <label>Letter Spacing:</label>
                  <input
                    type="number"
                    value={token.letterSpacing}
                    onChange={(e) => handleTypographyChange(token.id, 'letterSpacing', parseFloat(e.target.value))}
                    className="typography-number-input"
                    min="-2"
                    max="2"
                    step="0.1"
                  />
                  <span className="unit">px</span>
                </div>
              </div>
              
              <div className="typography-control-row">
                <div className="typography-control-group">
                  <label>Text Align:</label>
                  <select
                    value={token.textAlign}
                    onChange={(e) => handleTypographyChange(token.id, 'textAlign', e.target.value)}
                    className="typography-select"
                  >
                    <option value="left">Left</option>
                    <option value="center">Center</option>
                    <option value="right">Right</option>
                    <option value="justify">Justify</option>
                  </select>
                </div>
                
                <div className="typography-control-group">
                  <label>Color:</label>
                  <input
                    type="color"
                    value={token.color}
                    onChange={(e) => handleTypographyChange(token.id, 'color', e.target.value)}
                    className="typography-color-input"
                  />
                </div>
              </div>
              
              <button
                onClick={() => onTypographyDelete(token.id)}
                className="delete-typography-btn"
                aria-label="Delete typography token"
              >
                Delete Token
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TypographyPreview;
