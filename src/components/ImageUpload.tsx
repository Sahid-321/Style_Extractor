import React, { useCallback, useState } from 'react';
import './ImageUpload.css';

interface ImageUploadProps {
  onImageUpload: (file: File, imageUrl: string) => void;
  onImageUrlChange?: (url: string) => void;
  isProcessing?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  onImageUrlChange,
  isProcessing = false,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    // Create object URL for preview
    const url = URL.createObjectURL(file);
    onImageUpload(file, url);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;

    // Basic URL validation
    try {
      new URL(imageUrl);
    } catch {
      alert('Please enter a valid URL');
      return;
    }

    // Create a fake File object from URL for consistency
    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const file = new File([blob], 'uploaded-image.jpg', { type: blob.type });
        onImageUpload(file, imageUrl);
      })
      .catch(error => {
        console.error('Failed to load image from URL:', error);
        alert('Failed to load image from URL. Please check the URL and try again.');
      });
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setImageUrl(url);
    onImageUrlChange?.(url);
  };

  const sampleImages = [
    {
      name: 'Modern Dashboard',
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMzYwIiBoZWlnaHQ9IjYwIiBmaWxsPSIjZmZmIiByeD0iOCIvPjxyZWN0IHg9IjQwIiB5PSIzNSIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIzMCIgZmlsbD0iIzM5ODFmNiIgcng9IjYiLz48cmVjdCB4PSIyMCIgeT0iMTAwIiB3aWR0aD0iMTcwIiBoZWlnaHQ9IjE4MCIgZmlsbD0iI2ZmZiIgcng9IjgiLz48cmVjdCB4PSIyMTAiIHk9IjEwMCIgd2lkdGg9IjE3MCIgaGVpZ2h0PSIxODAiIGZpbGw9IiNmZmYiIHJ4PSI4Ii8+PHRleHQgeD0iNDAiIHk9IjUwIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTYiIGZpbGw9IiMxZjI5MzciPkRhc2hib2FyZDwvdGV4dD48L3N2Zz4='
    },
    {
      name: 'Button Components',
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjlmYWZiIi8+PHJlY3QgeD0iNTAiIHk9IjUwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMzk4MWY2IiByeD0iNiIvPjxyZWN0IHg9IjIwMCIgeT0iNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNlZjQ0NDQiIHJ4PSI2Ii8+PHJlY3QgeD0iNTAiIHk9IjEyMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzEwYjk4MSIgcng9IjYiLz48cmVjdCB4PSIyMDAiIHk9IjEyMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2Y1OTUwOCIgcng9IjYiLz48dGV4dCB4PSI3NSIgeT0iNzQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiI+UHJpbWFyeTwvdGV4dD48dGV4dCB4PSIyNTAiIHk9Ijc0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNmZmYiPkRhbmdlcjwvdGV4dD48dGV4dCB4PSIxMDAiIHk9IjE0NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjZmZmIj5TdWNjZXNzPC90ZXh0Pjx0ZXh0IHg9IjI1MCIgeT0iMTQ0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNmZmYiPldvcm5pbmc8L3RleHQ+PC9zdmc+'
    },
    {
      name: 'Card Layout',
      url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHJlY3QgeD0iMjAiIHk9IjIwIiB3aWR0aD0iMzYwIiBoZWlnaHQ9IjI2MCIgZmlsbD0iI2ZmZiIgcng9IjEyIiBzdHJva2U9IiNlMWU1ZTkiLz48Y2lyY2xlIGN4PSIyMDAiIGN5PSI4MCIgcj0iMzAiIGZpbGw9IiNkMWQ1ZGIiLz48cmVjdCB4PSI0MCIgeT0iMTMwIiB3aWR0aD0iMzIwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjMWYyOTM3IiByeD0iNCIvPjxyZWN0IHg9IjQwIiB5PSIxNjAiIHdpZHRoPSIyNDAiIGhlaWdodD0iMTYiIGZpbGw9IiM2Yjc0ODMiIHJ4PSI0Ii8+PHJlY3QgeD0iNDAiIHk9IjE4NSIgd2lkdGg9IjE4MCIgaGVpZ2h0PSIxNiIgZmlsbD0iIzZiNzQ4MyIgcng9IjQiLz48cmVjdCB4PSI0MCIgeT0iMjMwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMyIiBmaWxsPSIjMzk4MWY2IiByeD0iNiIvPjxyZWN0IHg9IjE2MCIgeT0iMjMwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjMyIiBmaWxsPSIjZjlmYWZiIiBzdHJva2U9IiNkMWQ1ZGIiIHJ4PSI2Ii8+PC9zdmc+'
    }
  ];

  return (
    <div className="image-upload">
      <div className="upload-header">
        <h3>Upload Design Screenshot</h3>
        <div className="upload-method-selector">
          <button
            className={`method-btn ${uploadMethod === 'file' ? 'active' : ''}`}
            onClick={() => setUploadMethod('file')}
          >
            Upload File
          </button>
          <button
            className={`method-btn ${uploadMethod === 'url' ? 'active' : ''}`}
            onClick={() => setUploadMethod('url')}
          >
            From URL
          </button>
        </div>
      </div>

      {uploadMethod === 'file' ? (
        <div
          className={`upload-area ${dragActive ? 'drag-active' : ''} ${isProcessing ? 'processing' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="file-input"
            id="image-upload"
            disabled={isProcessing}
          />
          
          <div className="upload-content">
            <div className="upload-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path
                  d="M14.2 12L12 14.2L9.8 12M12 8V14.2M7.8 20H16.2C17.8802 20 18.7202 20 19.362 19.673C19.9265 19.3854 20.3854 18.9265 20.673 18.362C21 17.7202 21 16.8802 21 15.2V8.8C21 7.11984 21 6.27976 20.673 5.63803C20.3854 5.07354 19.9265 4.6146 19.362 4.32698C18.7202 4 17.8802 4 16.2 4H7.8C6.11984 4 5.27976 4 4.63803 4.32698C4.07354 4.6146 3.6146 5.07354 3.32698 5.63803C3 6.27976 3 7.11984 3 8.8V15.2C3 16.8802 3 17.7202 3.32698 18.362C3.6146 18.9265 4.07354 19.3854 4.63803 19.673C5.27976 20 6.11984 20 7.8 20Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            
            <div className="upload-text">
              <h4>Drop your image here, or <label htmlFor="image-upload" className="upload-link">browse</label></h4>
              <p>Supports PNG, JPEG, WEBP up to 10MB</p>
            </div>
            
            {isProcessing && (
              <div className="processing-indicator">
                <div className="spinner"></div>
                <span>Processing image...</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="url-upload">
          <form onSubmit={handleUrlSubmit} className="url-form">
            <div className="url-input-group">
              <input
                type="url"
                value={imageUrl}
                onChange={handleUrlChange}
                placeholder="Enter image URL (https://...)"
                className="url-input"
                disabled={isProcessing}
              />
              <button 
                type="submit" 
                className="url-submit-btn"
                disabled={!imageUrl.trim() || isProcessing}
              >
                {isProcessing ? 'Loading...' : 'Load Image'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="sample-images">
        <h4>Try Sample Images</h4>
        <div className="sample-grid">
          {sampleImages.map((sample, index) => (
            <button
              key={index}
              className="sample-btn"
              onClick={() => {
                // Create a fake file for consistency
                fetch(sample.url)
                  .then(response => response.blob())
                  .then(blob => {
                    const file = new File([blob], `${sample.name}.svg`, { type: 'image/svg+xml' });
                    onImageUpload(file, sample.url);
                  });
              }}
              disabled={isProcessing}
            >
              <img src={sample.url} alt={sample.name} className="sample-image" />
              <span className="sample-name">{sample.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="upload-tips">
        <h4>Tips for Best Results</h4>
        <ul>
          <li>Use high-resolution screenshots (at least 1200px wide)</li>
          <li>Ensure good contrast between elements</li>
          <li>Include different component states when possible</li>
          <li>Avoid overlapping or occluded components</li>
          <li>Use clean, uncompressed formats (PNG preferred)</li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUpload;
