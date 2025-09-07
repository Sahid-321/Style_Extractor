import React, { useState, useRef, useEffect } from 'react';
import { ComponentSpec } from '../types';
import './ComponentDetection.css';

interface ComponentDetectionProps {
  imageUrl: string;
  components: ComponentSpec[];
  onComponentSelect: (component: ComponentSpec) => void;
  onComponentEdit: (id: string, updates: Partial<ComponentSpec>) => void;
  onComponentDelete: (id: string) => void;
}

const ComponentDetection: React.FC<ComponentDetectionProps> = ({
  imageUrl,
  components,
  onComponentSelect,
  onComponentEdit,
  onComponentDelete,
}) => {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [showOverlay, setShowOverlay] = useState(true);
  const [imageScale, setImageScale] = useState({ scaleX: 1, scaleY: 1, offsetX: 0, offsetY: 0 });
  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleComponentClick = (component: ComponentSpec) => {
    setSelectedComponent(component.id);
    onComponentSelect(component);
  };

  const handleComponentUpdate = (id: string, field: keyof ComponentSpec, value: any) => {
    onComponentEdit(id, { [field]: value });
  };

  const calculateImageScale = () => {
    if (!imageRef.current || !containerRef.current) return;
    
    const img = imageRef.current;
    const container = containerRef.current;
    
    // Get the natural and displayed image dimensions
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    const displayedWidth = img.offsetWidth;
    const displayedHeight = img.offsetHeight;
    
    // Get the container dimensions and padding
    const containerRect = container.getBoundingClientRect();
    const imgRect = img.getBoundingClientRect();
    
    // Calculate scale factors
    const scaleX = displayedWidth / naturalWidth;
    const scaleY = displayedHeight / naturalHeight;
    
    // Calculate offset (how much the image is offset from the container's top-left)
    const offsetX = imgRect.left - containerRect.left;
    const offsetY = imgRect.top - containerRect.top;
    
    setImageScale({ scaleX, scaleY, offsetX, offsetY });
  };

  useEffect(() => {
    calculateImageScale();
  }, [imageUrl, components]);

  useEffect(() => {
    const handleResize = () => calculateImageScale();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="component-detection">
      <div className="component-detection-header">
        <h3>Detected Components</h3>
        <div className="component-controls">
          <label className="overlay-toggle">
            <input
              type="checkbox"
              checked={showOverlay}
              onChange={(e) => setShowOverlay(e.target.checked)}
            />
            Show component overlay
          </label>
          <span className="component-count">{components.length} components detected</span>
        </div>
      </div>

      <div className="component-visualization">
        <div className="image-container" ref={containerRef}>
          <img 
            ref={imageRef}
            src={imageUrl} 
            alt="Design to analyze" 
            className="analysis-image"
            onLoad={calculateImageScale}
          />
          
          {showOverlay && (
            <div className="component-overlay">
              {components.map((component) => (
                <div
                  key={component.id}
                  className={`component-bbox ${
                    selectedComponent === component.id ? 'selected' : ''
                  }`}
                  style={{
                    left: `${imageScale.offsetX + (component.boundingBox.x * imageScale.scaleX)}px`,
                    top: `${imageScale.offsetY + (component.boundingBox.y * imageScale.scaleY)}px`,
                    width: `${component.boundingBox.width * imageScale.scaleX}px`,
                    height: `${component.boundingBox.height * imageScale.scaleY}px`,
                  }}
                  onClick={() => handleComponentClick(component)}
                  title={`${component.name} (${component.type})`}
                >
                  <div className="component-label">
                    {component.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="component-list">
          <h4>Component List</h4>
          {components.map((component) => (
            <div
              key={component.id}
              className={`component-item ${
                selectedComponent === component.id ? 'selected' : ''
              }`}
              onClick={() => handleComponentClick(component)}
            >
              <div className="component-header">
                <div className="component-info">
                  <input
                    type="text"
                    value={component.name}
                    onChange={(e) => handleComponentUpdate(component.id, 'name', e.target.value)}
                    className="component-name-input"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <select
                    value={component.type}
                    onChange={(e) => handleComponentUpdate(component.id, 'type', e.target.value)}
                    className="component-type-select"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <option value="button">Button</option>
                    <option value="card">Card</option>
                    <option value="input">Input</option>
                    <option value="accordion">Accordion</option>
                    <option value="breadcrumb">Breadcrumb</option>
                    <option value="modal">Modal</option>
                    <option value="navbar">Navbar</option>
                    <option value="list">List</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onComponentDelete(component.id);
                  }}
                  className="delete-component-btn"
                  aria-label="Delete component"
                >
                  ×
                </button>
              </div>

              <div className="component-measurements">
                <div className="measurement-row">
                  <span className="measurement-label">Position:</span>
                  <span className="measurement-value">
                    {component.boundingBox.x}, {component.boundingBox.y}
                  </span>
                </div>
                <div className="measurement-row">
                  <span className="measurement-label">Size:</span>
                  <span className="measurement-value">
                    {component.measurements.width} × {component.measurements.height}px
                  </span>
                </div>
                <div className="measurement-row">
                  <span className="measurement-label">Padding:</span>
                  <span className="measurement-value">
                    {component.measurements.padding.top}px {component.measurements.padding.right}px{' '}
                    {component.measurements.padding.bottom}px {component.measurements.padding.left}px
                  </span>
                </div>
              </div>

              {component.states && component.states.length > 0 && (
                <div className="component-states">
                  <span className="states-label">States:</span>
                  <div className="states-list">
                    {component.states.map((state) => (
                      <span key={state} className="state-badge">
                        {state}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="component-style-summary">
                <div className="style-count">
                  Colors: {component.styles.colors.length} |{' '}
                  Typography: {component.styles.typography.length} |{' '}
                  Spacing: {component.styles.spacing.length}
                </div>
              </div>
            </div>
          ))}

          {components.length === 0 && (
            <div className="no-components">
              <p>No components detected yet. Upload an image to start analysis.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComponentDetection;
