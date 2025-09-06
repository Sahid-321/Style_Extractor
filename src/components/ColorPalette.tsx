import React from 'react';
import { ColorToken } from '../types';
import './ColorPalette.css';

interface ColorPaletteProps {
  colors: ColorToken[];
  onColorEdit: (id: string, updates: Partial<ColorToken>) => void;
  onColorDelete: (id: string) => void;
}

const ColorPalette: React.FC<ColorPaletteProps> = ({
  colors,
  onColorEdit,
  onColorDelete,
}) => {
  const handleColorChange = (id: string, field: keyof ColorToken, value: string) => {
    onColorEdit(id, { [field]: value });
  };

  return (
    <div className="color-palette">
      <h3>Color Tokens</h3>
      <div className="color-grid">
        {colors.map((color) => (
          <div key={color.id} className="color-token">
            <div 
              className="color-swatch" 
              style={{ backgroundColor: color.hex }}
              title={`${color.name}: ${color.hex}`}
            />
            <div className="color-details">
              <input
                type="text"
                value={color.name}
                onChange={(e) => handleColorChange(color.id, 'name', e.target.value)}
                className="color-name-input"
                placeholder="Color name"
              />
              <div className="color-values">
                <div className="color-value">
                  <label>HEX:</label>
                  <input
                    type="text"
                    value={color.hex}
                    onChange={(e) => handleColorChange(color.id, 'hex', e.target.value)}
                    className="color-hex-input"
                  />
                </div>
                <div className="color-value">
                  <label>RGB:</label>
                  <span className="color-display">{color.rgb}</span>
                </div>
                <div className="color-value">
                  <label>HSL:</label>
                  <span className="color-display">{color.hsl}</span>
                </div>
              </div>
              <div className="color-metadata">
                <select
                  value={color.usage}
                  onChange={(e) => handleColorChange(color.id, 'usage', e.target.value)}
                  className="usage-select"
                >
                  <option value="background">Background</option>
                  <option value="text">Text</option>
                  <option value="border">Border</option>
                  <option value="shadow">Shadow</option>
                  <option value="other">Other</option>
                </select>
                <span className="frequency">Used {color.frequency}×</span>
              </div>
              <button
                onClick={() => onColorDelete(color.id)}
                className="delete-color-btn"
                aria-label="Delete color"
              >
                ×
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorPalette;
