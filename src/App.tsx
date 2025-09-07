import React, { useState, useCallback } from 'react';
import ImageUpload from './components/ImageUpload';
import ColorPalette from './components/ColorPalette';
import TypographyPreview from './components/TypographyPreview';
import ComponentDetection from './components/ComponentDetection';
import StyleExport from './components/StyleExport';
import { StyleExtractor } from './utils/styleExtractor';
import { 
  ExtractedStyles, 
  ColorToken, 
  TypographyToken, 
  ComponentSpec, 
  ToleranceSettings, 
  ExportFormat 
} from './types';
import './App.css';

function App() {
  const [extractedStyles, setExtractedStyles] = useState<ExtractedStyles | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState<string>('');
  const [selectedComponent, setSelectedComponent] = useState<ComponentSpec | null>(null);
  const [activeTab, setActiveTab] = useState<'colors' | 'typography' | 'components' | 'export'>('colors');
  
  const [tolerances, setTolerances] = useState<ToleranceSettings>({
    color: 10,
    spacing: 5,
    typography: 2,
    borderRadius: 3,
  });

  const handleImageUpload = useCallback(async (file: File, imageUrl: string) => {
    setIsProcessing(true);
    setCurrentImageUrl(imageUrl);
    
    try {
      // Extract styles from the uploaded image
      const analysisResult = await StyleExtractor.extractFromImage(imageUrl, tolerances);
      
      // Create extracted styles object
      const extractedData: ExtractedStyles = {
        id: `extraction-${Date.now()}`,
        sourceImage: imageUrl,
        components: analysisResult.detectedComponents,
        tokens: analysisResult.suggestedTokens,
        metadata: {
          extractedAt: new Date(),
          imageUrl,
          imageDimensions: { width: 0, height: 0 }, // Will be filled by actual image dimensions
          viewport: 'desktop', // Could be detected from image dimensions
          tolerances,
        }
      };
      
      setExtractedStyles(extractedData);
      
      // Auto-switch to colors tab after successful extraction
      setActiveTab('colors');
      
    } catch (error) {
      console.error('Failed to extract styles:', error);
      alert('Failed to extract styles from image. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  }, [tolerances]);

  const handleColorEdit = useCallback((id: string, updates: Partial<ColorToken>) => {
    if (!extractedStyles) return;
    
    setExtractedStyles(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        tokens: {
          ...prev.tokens,
          colors: prev.tokens.colors.map(color => 
            color.id === id ? { ...color, ...updates } : color
          )
        }
      };
    });
  }, []);

  const handleColorDelete = useCallback((id: string) => {
    if (!extractedStyles) return;
    
    setExtractedStyles(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        tokens: {
          ...prev.tokens,
          colors: prev.tokens.colors.filter(color => color.id !== id)
        }
      };
    });
  }, []);

  const handleTypographyEdit = useCallback((id: string, updates: Partial<TypographyToken>) => {
    if (!extractedStyles) return;
    
    setExtractedStyles(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        tokens: {
          ...prev.tokens,
          typography: prev.tokens.typography.map(typo => 
            typo.id === id ? { ...typo, ...updates } : typo
          )
        }
      };
    });
  }, []);

  const handleTypographyDelete = useCallback((id: string) => {
    if (!extractedStyles) return;
    
    setExtractedStyles(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        tokens: {
          ...prev.tokens,
          typography: prev.tokens.typography.filter(typo => typo.id !== id)
        }
      };
    });
  }, []);

  const handleComponentSelect = useCallback((component: ComponentSpec) => {
    setSelectedComponent(component);
  }, []);

  const handleComponentEdit = useCallback((id: string, updates: Partial<ComponentSpec>) => {
    if (!extractedStyles) return;
    
    setExtractedStyles(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        components: prev.components.map(component => 
          component.id === id ? { ...component, ...updates } : component
        )
      };
    });
  }, []);

  const handleComponentDelete = useCallback((id: string) => {
    if (!extractedStyles) return;
    
    setExtractedStyles(prev => {
      if (!prev) return prev;
      
      return {
        ...prev,
        components: prev.components.filter(component => component.id !== id)
      };
    });
    
    if (selectedComponent?.id === id) {
      setSelectedComponent(null);
    }
  }, [selectedComponent]);

  const handleToleranceChange = (key: keyof ToleranceSettings, value: number) => {
    setTolerances(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExport = useCallback((format: ExportFormat) => {
    if (!extractedStyles) return;
    
    console.log('Exporting styles:', { extractedStyles, format });
    // The actual export logic is handled by the StyleExport component
  }, [extractedStyles]);

  return (
    <div className="App">
      <header className="app-header">
        <div className="header-content">
          <h1>Style Extractor</h1>
          <p>Extract and edit design tokens from UI screenshots</p>
        </div>
        
        {extractedStyles && (
          <div className="extraction-info">
            <span className="extraction-status">✓ Styles extracted successfully</span>
            <span className="extraction-details">
              {extractedStyles.tokens.colors.length} colors, {extractedStyles.tokens.typography.length} typography tokens, {extractedStyles.components.length} components
            </span>
          </div>
        )}
      </header>

      <main className="app-main">
        <div className="main-content">
          <div className="upload-section">
            <ImageUpload 
              onImageUpload={handleImageUpload}
              isProcessing={isProcessing}
            />
            
            {/* Tolerance Settings */}
            {extractedStyles && (
              <div className="tolerance-settings">
                <h4>Detection Tolerances</h4>
                <div className="tolerance-controls">
                  <div className="tolerance-control">
                    <label>Color Tolerance:</label>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={tolerances.color}
                      onChange={(e) => handleToleranceChange('color', parseInt(e.target.value))}
                    />
                    <span>{tolerances.color}</span>
                  </div>
                  <div className="tolerance-control">
                    <label>Spacing Tolerance:</label>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      value={tolerances.spacing}
                      onChange={(e) => handleToleranceChange('spacing', parseInt(e.target.value))}
                    />
                    <span>{tolerances.spacing}px</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {extractedStyles && (
            <div className="analysis-section">
              <div className="analysis-tabs">
                <button 
                  className={`tab-btn ${activeTab === 'colors' ? 'active' : ''}`}
                  onClick={() => setActiveTab('colors')}
                >
                  Colors ({extractedStyles.tokens.colors.length})
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'typography' ? 'active' : ''}`}
                  onClick={() => setActiveTab('typography')}
                >
                  Typography ({extractedStyles.tokens.typography.length})
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'components' ? 'active' : ''}`}
                  onClick={() => setActiveTab('components')}
                >
                  Components ({extractedStyles.components.length})
                </button>
                <button 
                  className={`tab-btn ${activeTab === 'export' ? 'active' : ''}`}
                  onClick={() => setActiveTab('export')}
                >
                  Export
                </button>
              </div>

              <div className="tab-content">
                {activeTab === 'colors' && (
                  <ColorPalette
                    colors={extractedStyles.tokens.colors}
                    onColorEdit={handleColorEdit}
                    onColorDelete={handleColorDelete}
                  />
                )}

                {activeTab === 'typography' && (
                  <TypographyPreview
                    typography={extractedStyles.tokens.typography}
                    onTypographyEdit={handleTypographyEdit}
                    onTypographyDelete={handleTypographyDelete}
                  />
                )}

                {activeTab === 'components' && (
                  <ComponentDetection
                    imageUrl={currentImageUrl}
                    components={extractedStyles.components}
                    onComponentSelect={handleComponentSelect}
                    onComponentEdit={handleComponentEdit}
                    onComponentDelete={handleComponentDelete}
                  />
                )}

                {activeTab === 'export' && (
                  <StyleExport
                    extractedStyles={extractedStyles}
                    onExport={handleExport}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
