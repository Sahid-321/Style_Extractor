import { ExtractedStyles, ComponentSpec } from '../types';

// Test case data for the Style Extractor - Comprehensive Examples
export const testCases = {
  dashboard: {
    name: 'Modern Dashboard',
    description: 'Desktop dashboard with multiple component types and states',
    viewport: 'desktop' as const,
    mockExtractedStyles: {
      id: 'test-dashboard',
      sourceImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImJ0bkdyYWQiIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMCUiIHkyPSIxMDAlIj48c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMzk4MWY2IiBzdG9wLW9wYWNpdHk9IjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMjU2M2ViIiBzdG9wLW9wYWNpdHk9IjEiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2Y5ZmFmYiIvPjxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSI4MDAiIGhlaWdodD0iODAiIGZpbGw9IiNmZmYiLz48cmVjdCB4PSIzMCIgeT0iMjAiIHdpZHRoPSIxNDAiIGhlaWdodD0iNDAiIGZpbGw9InVybCgjYnRuR3JhZCkiIHJ4PSI4Ii8+PHJlY3QgeD0iMjAwIiB5PSIyMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2VmNDQ0NCIgcng9IjgiLz48cmVjdCB4PSIzNDAiIHk9IjIwIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMTBiOTgxIiByeD0iOCIvPjxyZWN0IHg9IjQ4MCIgeT0iMjAiIHdpZHRoPSIxMjAiIGhlaWdodD0iNDAiIGZpbGw9IiNmNTk1MDgiIHJ4PSI4Ii8+PHJlY3QgeD0iNjIwIiB5PSIyMCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSI0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNjM2NmYxIiBzdHJva2Utd2lkdGg9IjIiIHJ4PSI4Ii8+PHJlY3QgeD0iMzAiIHk9IjEwMCIgd2lkdGg9IjM1MCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmZmYiIHJ4PSIxMiIgZmlsdGVyPSJkcm9wLXNoYWRvdygwIDRweCA2cHggcmdiYSgwLCAwLCAwLCAwLjEpKSIvPjxyZWN0IHg9IjQyMCIgeT0iMTAwIiB3aWR0aD0iMzUwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIgcng9IjEyIiBmaWx0ZXI9ImRyb3Atc2hhZG93KDAgNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSkpIi8+PHJlY3QgeD0iMzAiIHk9IjMyMCIgd2lkdGg9IjczMCIgaGVpZ2h0PSI2MCIgZmlsbD0iI2ZmZiIgcng9IjgiLz48cmVjdCB4PSI1MCIgeT0iMzQwIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwIiBmaWxsPSIjZGRkIiByeD0iNCIvPjxyZWN0IHg9IjMwIiB5PSI0MDAiIHdpZHRoPSI3MzAiIGhlaWdodD0iMTgwIiBmaWxsPSIjZmZmIiByeD0iOCIvPjx0ZXh0IHg9IjEwMCIgeT0iNDQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJJbnRlciwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iI2ZmZiI+UHJpbWFyeSBCdG48L3RleHQ+PHRleHQgeD0iMjYwIiB5PSI0NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjZmZmIj5EYW5nZXI8L3RleHQ+PHRleHQgeD0iNDAwIiB5PSI0NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjZmZmIj5TdWNjZXNzPC90ZXh0Pjx0ZXh0IHg9IjU0MCIgeT0iNDQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJJbnRlciwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZm9udC13ZWlnaHQ9IjYwMCIgZmlsbD0iI2ZmZiI+V2FybmluZzwvdGV4dD48dGV4dCB4PSI2OTAiIHk9IjQ0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iSW50ZXIsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSI0MDAiIGZpbGw9IiM2MzY2ZjEiPk91dGxpbmU8L3RleHQ+PHRleHQgeD0iNjAiIHk9IjEzMCIgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjIwIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSIjMWYyOTM3Ij5EYXR0ZSBDYXJkPC90ZXh0Pjx0ZXh0IHg9IjQ1MCIgeT0iMTMwIiBmb250LWZhbWlseT0iSW50ZXIsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjAiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9IiMxZjI5MzciPlN0YXRpc2Mga2FydCA8L3RleHQ+PC9zdmc+',
      components: [
        {
          id: 'navbar',
          type: 'navbar',
          name: 'Main Navigation Bar',
          boundingBox: { x: 0, y: 0, width: 800, height: 80 },
          states: ['default'],
          styles: {
            colors: [
              { id: 'nav-bg', name: 'Navigation Background', hex: '#ffffff', rgb: 'rgb(255, 255, 255)', hsl: 'hsl(0, 0%, 100%)', usage: 'background', frequency: 200 }
            ],
            typography: [],
            spacing: [
              { id: 'nav-padding', name: 'Navigation Padding', value: 20, unit: 'px', type: 'padding' }
            ],
            borders: [
              { id: 'nav-border', name: 'Navigation Border', width: 1, style: 'solid', color: '#e5e7eb', radius: 0 }
            ],
            shadows: [
              { id: 'nav-shadow', name: 'Navigation Shadow', offsetX: 0, offsetY: 2, blurRadius: 4, spreadRadius: 0, color: 'rgba(0, 0, 0, 0.05)', type: 'box-shadow' }
            ]
          },
          measurements: {
            width: 800,
            height: 80,
            padding: { top: 20, right: 30, bottom: 20, left: 30 },
            margin: { top: 0, right: 0, bottom: 0, left: 0 }
          }
        },
        {
          id: 'primary-btn',
          type: 'button',
          name: 'Primary Button',
          boundingBox: { x: 30, y: 20, width: 140, height: 40 },
          states: ['default', 'hover', 'active'],
          styles: {
            colors: [
              { id: 'btn-primary', name: 'Primary Blue', hex: '#3981f6', rgb: 'rgb(57, 129, 246)', hsl: 'hsl(217, 91%, 60%)', usage: 'background', frequency: 50 },
              { id: 'btn-primary-hover', name: 'Primary Blue Hover', hex: '#2563eb', rgb: 'rgb(37, 99, 235)', hsl: 'hsl(217, 91%, 53%)', usage: 'background', frequency: 15 }
            ],
            typography: [
              { id: 'btn-text', name: 'Button Text', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, lineHeight: 20, letterSpacing: 0, textAlign: 'center', color: '#ffffff' }
            ],
            spacing: [
              { id: 'btn-padding-x', name: 'Button Padding X', value: 20, unit: 'px', type: 'padding', direction: 'horizontal' },
              { id: 'btn-padding-y', name: 'Button Padding Y', value: 12, unit: 'px', type: 'padding', direction: 'vertical' }
            ],
            borders: [
              { id: 'btn-border', name: 'Button Border', width: 0, style: 'none', color: 'transparent', radius: 8 }
            ],
            shadows: []
          },
          measurements: {
            width: 140,
            height: 40,
            padding: { top: 12, right: 20, bottom: 12, left: 20 },
            margin: { top: 0, right: 10, bottom: 0, left: 0 }
          }
        },
        {
          id: 'danger-btn',
          type: 'button',
          name: 'Danger Button',
          boundingBox: { x: 200, y: 20, width: 120, height: 40 },
          states: ['default', 'hover', 'active'],
          styles: {
            colors: [
              { id: 'btn-danger', name: 'Danger Red', hex: '#ef4444', rgb: 'rgb(239, 68, 68)', hsl: 'hsl(0, 84%, 60%)', usage: 'background', frequency: 30 },
              { id: 'btn-danger-hover', name: 'Danger Red Hover', hex: '#dc2626', rgb: 'rgb(220, 38, 38)', hsl: 'hsl(0, 84%, 51%)', usage: 'background', frequency: 10 }
            ],
            typography: [
              { id: 'btn-text', name: 'Button Text', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, lineHeight: 20, letterSpacing: 0, textAlign: 'center', color: '#ffffff' }
            ],
            spacing: [
              { id: 'btn-padding-x', name: 'Button Padding X', value: 20, unit: 'px', type: 'padding', direction: 'horizontal' },
              { id: 'btn-padding-y', name: 'Button Padding Y', value: 12, unit: 'px', type: 'padding', direction: 'vertical' }
            ],
            borders: [
              { id: 'btn-border', name: 'Button Border', width: 0, style: 'none', color: 'transparent', radius: 8 }
            ],
            shadows: []
          },
          measurements: {
            width: 120,
            height: 40,
            padding: { top: 12, right: 20, bottom: 12, left: 20 },
            margin: { top: 0, right: 10, bottom: 0, left: 0 }
          }
        },
        {
          id: 'success-btn',
          type: 'button',
          name: 'Success Button',
          boundingBox: { x: 340, y: 20, width: 120, height: 40 },
          states: ['default', 'hover'],
          styles: {
            colors: [
              { id: 'btn-success', name: 'Success Green', hex: '#10b981', rgb: 'rgb(16, 185, 129)', hsl: 'hsl(158, 84%, 39%)', usage: 'background', frequency: 25 }
            ],
            typography: [
              { id: 'btn-text', name: 'Button Text', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, lineHeight: 20, letterSpacing: 0, textAlign: 'center', color: '#ffffff' }
            ],
            spacing: [
              { id: 'btn-padding-x', name: 'Button Padding X', value: 20, unit: 'px', type: 'padding', direction: 'horizontal' },
              { id: 'btn-padding-y', name: 'Button Padding Y', value: 12, unit: 'px', type: 'padding', direction: 'vertical' }
            ],
            borders: [
              { id: 'btn-border', name: 'Button Border', width: 0, style: 'none', color: 'transparent', radius: 8 }
            ],
            shadows: []
          },
          measurements: {
            width: 120,
            height: 40,
            padding: { top: 12, right: 20, bottom: 12, left: 20 },
            margin: { top: 0, right: 10, bottom: 0, left: 0 }
          }
        },
        {
          id: 'outline-btn',
          type: 'button',
          name: 'Outline Button',
          boundingBox: { x: 620, y: 20, width: 140, height: 40 },
          states: ['default', 'hover', 'focus'],
          styles: {
            colors: [
              { id: 'btn-outline-border', name: 'Outline Border', hex: '#6366f1', rgb: 'rgb(99, 102, 241)', hsl: 'hsl(236, 84%, 67%)', usage: 'border', frequency: 20 },
              { id: 'btn-outline-text', name: 'Outline Text', hex: '#6366f1', rgb: 'rgb(99, 102, 241)', hsl: 'hsl(236, 84%, 67%)', usage: 'text', frequency: 15 }
            ],
            typography: [
              { id: 'btn-outline-text', name: 'Button Outline Text', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: 20, letterSpacing: 0, textAlign: 'center', color: '#6366f1' }
            ],
            spacing: [
              { id: 'btn-padding-x', name: 'Button Padding X', value: 20, unit: 'px', type: 'padding', direction: 'horizontal' },
              { id: 'btn-padding-y', name: 'Button Padding Y', value: 12, unit: 'px', type: 'padding', direction: 'vertical' }
            ],
            borders: [
              { id: 'btn-outline-border', name: 'Button Outline Border', width: 2, style: 'solid', color: '#6366f1', radius: 8 }
            ],
            shadows: []
          },
          measurements: {
            width: 140,
            height: 40,
            padding: { top: 12, right: 20, bottom: 12, left: 20 },
            margin: { top: 0, right: 0, bottom: 0, left: 0 }
          }
        },
        {
          id: 'data-card',
          type: 'card',
          name: 'Data Display Card',
          boundingBox: { x: 30, y: 100, width: 350, height: 200 },
          states: ['default'],
          styles: {
            colors: [
              { id: 'card-bg', name: 'Card Background', hex: '#ffffff', rgb: 'rgb(255, 255, 255)', hsl: 'hsl(0, 0%, 100%)', usage: 'background', frequency: 150 }
            ],
            typography: [
              { id: 'card-title', name: 'Card Title', fontFamily: 'Inter, sans-serif', fontSize: 20, fontWeight: 700, lineHeight: 28, letterSpacing: -0.25, textAlign: 'left', color: '#1f2937' }
            ],
            spacing: [
              { id: 'card-padding', name: 'Card Padding', value: 24, unit: 'px', type: 'padding' },
              { id: 'card-margin', name: 'Card Margin', value: 20, unit: 'px', type: 'margin', direction: 'bottom' }
            ],
            borders: [
              { id: 'card-border', name: 'Card Border', width: 1, style: 'solid', color: '#e5e7eb', radius: 12 }
            ],
            shadows: [
              { id: 'card-shadow', name: 'Card Shadow', offsetX: 0, offsetY: 4, blurRadius: 6, spreadRadius: -1, color: 'rgba(0, 0, 0, 0.1)', type: 'box-shadow' }
            ]
          },
          measurements: {
            width: 350,
            height: 200,
            padding: { top: 24, right: 24, bottom: 24, left: 24 },
            margin: { top: 0, right: 20, bottom: 0, left: 0 }
          }
        },
        {
          id: 'input-field',
          type: 'input',
          name: 'Search Input Field',
          boundingBox: { x: 50, y: 340, width: 200, height: 20 },
          states: ['default', 'focus'],
          styles: {
            colors: [
              { id: 'input-placeholder', name: 'Input Placeholder', hex: '#dddddd', rgb: 'rgb(221, 221, 221)', hsl: 'hsl(0, 0%, 87%)', usage: 'text', frequency: 20 }
            ],
            typography: [
              { id: 'input-text', name: 'Input Text', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: 20, letterSpacing: 0, textAlign: 'left', color: '#374151' }
            ],
            spacing: [
              { id: 'input-padding-x', name: 'Input Padding X', value: 12, unit: 'px', type: 'padding', direction: 'horizontal' },
              { id: 'input-padding-y', name: 'Input Padding Y', value: 8, unit: 'px', type: 'padding', direction: 'vertical' }
            ],
            borders: [
              { id: 'input-border', name: 'Input Border', width: 1, style: 'solid', color: '#d1d5db', radius: 4 }
            ],
            shadows: [
              { id: 'input-shadow', name: 'Input Inner Shadow', offsetX: 0, offsetY: 1, blurRadius: 2, spreadRadius: 0, color: 'rgba(0, 0, 0, 0.05)', type: 'box-shadow' }
            ]
          },
          measurements: {
            width: 200,
            height: 20,
            padding: { top: 8, right: 12, bottom: 8, left: 12 },
            margin: { top: 0, right: 0, bottom: 0, left: 0 }
          }
        },
        {
          id: 'list-view',
          type: 'list',
          name: 'Data List Component',
          boundingBox: { x: 30, y: 400, width: 730, height: 180 },
          states: ['default'],
          styles: {
            colors: [
              { id: 'list-bg', name: 'List Background', hex: '#ffffff', rgb: 'rgb(255, 255, 255)', hsl: 'hsl(0, 0%, 100%)', usage: 'background', frequency: 100 }
            ],
            typography: [
              { id: 'list-item-text', name: 'List Item Text', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: 20, letterSpacing: 0, textAlign: 'left', color: '#374151' }
            ],
            spacing: [
              { id: 'list-padding', name: 'List Padding', value: 16, unit: 'px', type: 'padding' },
              { id: 'list-item-gap', name: 'List Item Gap', value: 12, unit: 'px', type: 'gap' }
            ],
            borders: [
              { id: 'list-border', name: 'List Border', width: 1, style: 'solid', color: '#e5e7eb', radius: 8 }
            ],
            shadows: []
          },
          measurements: {
            width: 730,
            height: 180,
            padding: { top: 16, right: 16, bottom: 16, left: 16 },
            margin: { top: 20, right: 0, bottom: 0, left: 0 }
          }
        }
      ] as ComponentSpec[],
      tokens: {
        colors: [
          { id: 'bg-primary', name: 'Background Primary', hex: '#ffffff', rgb: 'rgb(255, 255, 255)', hsl: 'hsl(0, 0%, 100%)', usage: 'background', frequency: 500 },
          { id: 'bg-secondary', name: 'Background Secondary', hex: '#f9fafb', rgb: 'rgb(249, 250, 251)', hsl: 'hsl(220, 14%, 98%)', usage: 'background', frequency: 200 },
          { id: 'blue-500', name: 'Primary Blue', hex: '#3981f6', rgb: 'rgb(57, 129, 246)', hsl: 'hsl(217, 91%, 60%)', usage: 'background', frequency: 65 },
          { id: 'blue-600', name: 'Primary Blue Dark', hex: '#2563eb', rgb: 'rgb(37, 99, 235)', hsl: 'hsl(217, 91%, 53%)', usage: 'background', frequency: 15 },
          { id: 'red-500', name: 'Danger Red', hex: '#ef4444', rgb: 'rgb(239, 68, 68)', hsl: 'hsl(0, 84%, 60%)', usage: 'background', frequency: 40 },
          { id: 'red-600', name: 'Danger Red Dark', hex: '#dc2626', rgb: 'rgb(220, 38, 38)', hsl: 'hsl(0, 84%, 51%)', usage: 'background', frequency: 10 },
          { id: 'green-500', name: 'Success Green', hex: '#10b981', rgb: 'rgb(16, 185, 129)', hsl: 'hsl(158, 84%, 39%)', usage: 'background', frequency: 25 },
          { id: 'yellow-500', name: 'Warning Yellow', hex: '#f59508', rgb: 'rgb(245, 149, 8)', hsl: 'hsl(35, 91%, 50%)', usage: 'background', frequency: 20 },
          { id: 'indigo-500', name: 'Accent Indigo', hex: '#6366f1', rgb: 'rgb(99, 102, 241)', hsl: 'hsl(236, 84%, 67%)', usage: 'border', frequency: 35 },
          { id: 'gray-900', name: 'Text Primary', hex: '#1f2937', rgb: 'rgb(31, 41, 55)', hsl: 'hsl(220, 26%, 17%)', usage: 'text', frequency: 150 },
          { id: 'gray-700', name: 'Text Secondary', hex: '#374151', rgb: 'rgb(55, 65, 81)', hsl: 'hsl(220, 19%, 27%)', usage: 'text', frequency: 100 },
          { id: 'gray-300', name: 'Border Light', hex: '#d1d5db', rgb: 'rgb(209, 213, 219)', hsl: 'hsl(220, 13%, 84%)', usage: 'border', frequency: 80 },
          { id: 'gray-200', name: 'Border Lighter', hex: '#e5e7eb', rgb: 'rgb(229, 231, 235)', hsl: 'hsl(220, 13%, 91%)', usage: 'border', frequency: 60 }
        ],
        typography: [
          { id: 'heading-lg', name: 'Heading Large', fontFamily: 'Inter, sans-serif', fontSize: 20, fontWeight: 700, lineHeight: 28, letterSpacing: -0.25, textAlign: 'left', color: '#1f2937' },
          { id: 'button-text', name: 'Button Text', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 600, lineHeight: 20, letterSpacing: 0, textAlign: 'center', color: '#ffffff' },
          { id: 'button-outline-text', name: 'Button Outline Text', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: 20, letterSpacing: 0, textAlign: 'center', color: '#6366f1' },
          { id: 'body-base', name: 'Body Base', fontFamily: 'Inter, sans-serif', fontSize: 14, fontWeight: 400, lineHeight: 20, letterSpacing: 0, textAlign: 'left', color: '#374151' }
        ],
        spacing: [
          { id: 'space-2', name: 'Space 8', value: 8, unit: 'px', type: 'padding' },
          { id: 'space-3', name: 'Space 12', value: 12, unit: 'px', type: 'padding' },
          { id: 'space-4', name: 'Space 16', value: 16, unit: 'px', type: 'padding' },
          { id: 'space-5', name: 'Space 20', value: 20, unit: 'px', type: 'padding' },
          { id: 'space-6', name: 'Space 24', value: 24, unit: 'px', type: 'padding' },
          { id: 'space-8', name: 'Space 32', value: 32, unit: 'px', type: 'padding' }
        ],
        borders: [
          { id: 'border-default', name: 'Default Border', width: 1, style: 'solid', color: '#e5e7eb', radius: 8 },
          { id: 'border-input', name: 'Input Border', width: 1, style: 'solid', color: '#d1d5db', radius: 4 },
          { id: 'border-card', name: 'Card Border', width: 1, style: 'solid', color: '#e5e7eb', radius: 12 },
          { id: 'border-accent', name: 'Accent Border', width: 2, style: 'solid', color: '#6366f1', radius: 8 }
        ],
        shadows: [
          { id: 'shadow-sm', name: 'Small Shadow', offsetX: 0, offsetY: 1, blurRadius: 2, spreadRadius: 0, color: 'rgba(0, 0, 0, 0.05)', type: 'box-shadow' },
          { id: 'shadow-md', name: 'Medium Shadow', offsetX: 0, offsetY: 4, blurRadius: 6, spreadRadius: -1, color: 'rgba(0, 0, 0, 0.1)', type: 'box-shadow' },
          { id: 'shadow-nav', name: 'Navigation Shadow', offsetX: 0, offsetY: 2, blurRadius: 4, spreadRadius: 0, color: 'rgba(0, 0, 0, 0.05)', type: 'box-shadow' }
        ]
      },
      metadata: {
        extractedAt: new Date(),
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAwIiBoZWlnaHQ9IjYwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4uLi48L3N2Zz4=',
        imageDimensions: { width: 800, height: 600 },
        viewport: 'desktop' as const,
        tolerances: { color: 10, spacing: 5, typography: 2, borderRadius: 3 }
      }
    } as ExtractedStyles
  },
  
  ecommerce: {
    name: 'E-commerce Components',
    description: 'Product cards, buttons, and various states',
    viewport: 'desktop' as const,
    mockExtractedStyles: {
      id: 'test-ecommerce',
      sourceImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTAwIiBoZWlnaHQ9IjcwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjlmYWZiIi8+PHJlY3QgeD0iMzAiIHk9IjMwIiB3aWR0aD0iMjUwIiBoZWlnaHQ9IjM1MCIgZmlsbD0iI2ZmZiIgcng9IjEyIiBmaWx0ZXI9ImRyb3Atc2hhZG93KDAgNHB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMSkpIi8+PHJlY3QgeD0iMzIwIiB5PSIzMCIgd2lkdGg9IjI1MCIgaGVpZ2h0PSIzNTAiIGZpbGw9IiNmZmYiIHJ4PSIxMiIgZmlsdGVyPSJkcm9wLXNoYWRvdygwIDRweCA2cHggcmdiYSgwLCAwLCAwLCAwLjEpKSIvPjxyZWN0IHg9IjYxMCIgeT0iMzAiIHdpZHRoPSIyNTAiIGhlaWdodD0iMzUwIiBmaWxsPSIjZmZmIiByeD0iMTIiIGZpbHRlcj0iZHJvcC1zaGFkb3coMCA0cHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xKSkiLz48cmVjdCB4PSI1MCIgeT0iMjAwIiB3aWR0aD0iMjEwIiBoZWlnaHQ9IjE0MCIgZmlsbD0iI2Y5ZmFmYiIgcng9IjgiLz48cmVjdCB4PSIzNDAiIHk9IjIwMCIgd2lkdGg9IjIxMCIgaGVpZ2h0PSIxNDAiIGZpbGw9IiNmOWZhZmIiIHJ4PSI4Ii8+PHJlY3QgeD0iNjMwIiB5PSIyMDAiIHdpZHRoPSIyMTAiIGhlaWdodD0iMTQwIiBmaWxsPSIjZjlmYWZiIiByeD0iOCIvPjxyZWN0IHg9IjY1IiB5PSIzNjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSIzMiIgZmlsbD0iIzM5ODFmNiIgcng9IjYiLz48cmVjdCB4PSIxNjAiIHk9IjM2MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjMyIiBmaWxsPSJub25lIiBzdHJva2U9IiMzOTgxZjYiIHN0cm9rZS13aWR0aD0iMiIgcng9IjYiLz48cmVjdCB4PSIzNTUiIHk9IjM2MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjMyIiBmaWxsPSIjMTA5OTgxIiByeD0iNiIvPjxyZWN0IHg9IjQ1MCIgeT0iMzYwIiB3aWR0aD0iODAiIGhlaWdodD0iMzIiIGZpbGw9IiNkZGQiIHJ4PSI2Ii8+PHJlY3QgeD0iNjQ1IiB5PSIzNjAiIHdpZHRoPSI4MCIgaGVpZ2h0PSIzMiIgZmlsbD0iI2VmNDQ0NCIgcng9IjYiLz48cmVjdCB4PSI3NTAiIHk9IjM2MCIgd2lkdGg9IjgwIiBoZWlnaHQ9IjMyIiBmaWxsPSJub25lIiBzdHJva2U9IiNkZGQiIHN0cm9rZS13aWR0aD0iMiIgcng9IjYiLz48cmVjdCB4PSIzMCIgeT0iNDQwIiB3aWR0aD0iODMwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjZmZmIiByeD0iOCIgZmlsdGVyPSJkcm9wLXNoYWRvdygwIDJweCIgNHB4IHJnYmEoMCwgMCwgMCwgMC4wNSkpIi8+PHJlY3QgeD0iNTAiIHk9IjQ2MCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjZmZmIiByeD0iMjAiIGZpbHRlcj0iZHJvcC1zaGFkb3coMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4xKSkiLz48cmVjdCB4PSIzMCIgeT0iNTQwIiB3aWR0aD0iODMwIiBoZWlnaHQ9IjEyMCIgZmlsbD0iIzI1NjNlYiIgcng9IjEyIi8+PHRleHQgeD0iMTU1IiB5PSI1OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjMWYyOTM3Ij5Qcm9kdWN0IEE8L3RleHQ+PHRleHQgeD0iNDQ1IiB5PSI1OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjMWYyOTM3Ij5Qcm9kdWN0IEI8L3RleHQ+PHRleHQgeD0iNzM1IiB5PSI1OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE4IiBmb250LXdlaWdodD0iNjAwIiBmaWxsPSIjMWYyOTM3Ij5Qcm9kdWN0IEM8L3RleHQ+PHRleHQgeD0iMTA1IiB5PSIzNzgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJJbnRlciwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjUwMCIgZmlsbD0iI2ZmZiI+QnV5PC90ZXh0Pjx0ZXh0IHg9IjIwMCIgeT0iMzc4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iSW50ZXIsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI0MDAiIGZpbGw9IiMzOTgxZjYiPkNhcnQ8L3RleHQ+PHRleHQgeD0iMzk1IiB5PSIzNzgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJJbnRlciwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZm9udC13ZWlnaHQ9IjUwMCIgZmlsbD0iI2ZmZiI+QXZhaWxhYmxlPC90ZXh0Pjx0ZXh0IHg9IjQ5MCIgeT0iMzc4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iSW50ZXIsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI0MDAiIGZpbGw9IiM5OTkiPkRpc2FibGVkPC90ZXh0Pjx0ZXh0IHg9IjY4NSIgeT0iMzc4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iSW50ZXIsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZvbnQtd2VpZ2h0PSI1MDAiIGZpbGw9IiNmZmYiPkRlbGV0ZTwvdGV4dD48dGV4dCB4PSI3OTAiIHk9IjM3OCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkludGVyLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjEyIiBmb250LXdlaWdodD0iNDAwIiBmaWxsPSIjOTk5Ij5PdXQgb2YgU3RvY2s8L3RleHQ+PC9zdmc+',
      components: [
        {
          id: 'product-card-1',
          type: 'card',
          name: 'Product Card A',
          boundingBox: { x: 30, y: 30, width: 250, height: 350 },
          states: ['default'],
          styles: {
            colors: [
              { id: 'card-bg', name: 'Card Background', hex: '#ffffff', rgb: 'rgb(255, 255, 255)', hsl: 'hsl(0, 0%, 100%)', usage: 'background', frequency: 300 }
            ],
            typography: [
              { id: 'product-title', name: 'Product Title', fontFamily: 'Inter, sans-serif', fontSize: 18, fontWeight: 600, lineHeight: 24, letterSpacing: -0.25, textAlign: 'center', color: '#1f2937' }
            ],
            spacing: [
              { id: 'card-padding', name: 'Card Padding', value: 20, unit: 'px', type: 'padding' }
            ],
            borders: [
              { id: 'card-border', name: 'Card Border', width: 1, style: 'solid', color: '#e5e7eb', radius: 12 }
            ],
            shadows: [
              { id: 'card-shadow', name: 'Card Drop Shadow', offsetX: 0, offsetY: 4, blurRadius: 6, spreadRadius: 0, color: 'rgba(0, 0, 0, 0.1)', type: 'box-shadow' }
            ]
          },
          measurements: {
            width: 250,
            height: 350,
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
            margin: { top: 0, right: 30, bottom: 0, left: 0 }
          }
        },
        {
          id: 'buy-button',
          type: 'button',
          name: 'Buy Button (Primary)',
          boundingBox: { x: 65, y: 360, width: 80, height: 32 },
          states: ['default', 'hover', 'active'],
          styles: {
            colors: [
              { id: 'btn-buy', name: 'Buy Button Blue', hex: '#3981f6', rgb: 'rgb(57, 129, 246)', hsl: 'hsl(217, 91%, 60%)', usage: 'background', frequency: 30 }
            ],
            typography: [
              { id: 'btn-small-text', name: 'Small Button Text', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, lineHeight: 16, letterSpacing: 0, textAlign: 'center', color: '#ffffff' }
            ],
            spacing: [
              { id: 'btn-sm-padding', name: 'Small Button Padding', value: 8, unit: 'px', type: 'padding' }
            ],
            borders: [
              { id: 'btn-border', name: 'Button Border', width: 0, style: 'none', color: 'transparent', radius: 6 }
            ],
            shadows: []
          },
          measurements: {
            width: 80,
            height: 32,
            padding: { top: 8, right: 16, bottom: 8, left: 16 },
            margin: { top: 0, right: 15, bottom: 0, left: 0 }
          }
        },
        {
          id: 'cart-button',
          type: 'button',
          name: 'Add to Cart (Outline)',
          boundingBox: { x: 160, y: 360, width: 80, height: 32 },
          states: ['default', 'hover'],
          styles: {
            colors: [
              { id: 'btn-outline', name: 'Outline Button Border', hex: '#3981f6', rgb: 'rgb(57, 129, 246)', hsl: 'hsl(217, 91%, 60%)', usage: 'border', frequency: 25 }
            ],
            typography: [
              { id: 'btn-outline-text', name: 'Outline Button Text', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, lineHeight: 16, letterSpacing: 0, textAlign: 'center', color: '#3981f6' }
            ],
            spacing: [
              { id: 'btn-sm-padding', name: 'Small Button Padding', value: 8, unit: 'px', type: 'padding' }
            ],
            borders: [
              { id: 'btn-outline-border', name: 'Outline Button Border', width: 2, style: 'solid', color: '#3981f6', radius: 6 }
            ],
            shadows: []
          },
          measurements: {
            width: 80,
            height: 32,
            padding: { top: 8, right: 16, bottom: 8, left: 16 },
            margin: { top: 0, right: 0, bottom: 0, left: 0 }
          }
        },
        {
          id: 'available-button',
          type: 'button',
          name: 'Available Button (Success)',
          boundingBox: { x: 355, y: 360, width: 80, height: 32 },
          states: ['default'],
          styles: {
            colors: [
              { id: 'btn-success', name: 'Success Green', hex: '#10b981', rgb: 'rgb(16, 185, 129)', hsl: 'hsl(158, 84%, 39%)', usage: 'background', frequency: 20 }
            ],
            typography: [
              { id: 'btn-small-text', name: 'Small Button Text', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, lineHeight: 16, letterSpacing: 0, textAlign: 'center', color: '#ffffff' }
            ],
            spacing: [],
            borders: [
              { id: 'btn-border', name: 'Button Border', width: 0, style: 'none', color: 'transparent', radius: 6 }
            ],
            shadows: []
          },
          measurements: {
            width: 80,
            height: 32,
            padding: { top: 8, right: 16, bottom: 8, left: 16 },
            margin: { top: 0, right: 15, bottom: 0, left: 0 }
          }
        },
        {
          id: 'disabled-button',
          type: 'button',
          name: 'Disabled Button',
          boundingBox: { x: 450, y: 360, width: 80, height: 32 },
          states: ['disabled'],
          styles: {
            colors: [
              { id: 'btn-disabled', name: 'Disabled Gray', hex: '#dddddd', rgb: 'rgb(221, 221, 221)', hsl: 'hsl(0, 0%, 87%)', usage: 'background', frequency: 15 }
            ],
            typography: [
              { id: 'btn-disabled-text', name: 'Disabled Button Text', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, lineHeight: 16, letterSpacing: 0, textAlign: 'center', color: '#999999' }
            ],
            spacing: [],
            borders: [
              { id: 'btn-border', name: 'Button Border', width: 0, style: 'none', color: 'transparent', radius: 6 }
            ],
            shadows: []
          },
          measurements: {
            width: 80,
            height: 32,
            padding: { top: 8, right: 16, bottom: 8, left: 16 },
            margin: { top: 0, right: 15, bottom: 0, left: 0 }
          }
        },
        {
          id: 'delete-button',
          type: 'button',
          name: 'Delete Button (Danger)',
          boundingBox: { x: 645, y: 360, width: 80, height: 32 },
          states: ['default', 'hover'],
          styles: {
            colors: [
              { id: 'btn-danger', name: 'Danger Red', hex: '#ef4444', rgb: 'rgb(239, 68, 68)', hsl: 'hsl(0, 84%, 60%)', usage: 'background', frequency: 18 }
            ],
            typography: [
              { id: 'btn-small-text', name: 'Small Button Text', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, lineHeight: 16, letterSpacing: 0, textAlign: 'center', color: '#ffffff' }
            ],
            spacing: [],
            borders: [
              { id: 'btn-border', name: 'Button Border', width: 0, style: 'none', color: 'transparent', radius: 6 }
            ],
            shadows: []
          },
          measurements: {
            width: 80,
            height: 32,
            padding: { top: 8, right: 16, bottom: 8, left: 16 },
            margin: { top: 0, right: 15, bottom: 0, left: 0 }
          }
        },
        {
          id: 'user-card',
          type: 'card',
          name: 'User Profile Card',
          boundingBox: { x: 30, y: 440, width: 830, height: 80 },
          states: ['default'],
          styles: {
            colors: [
              { id: 'user-card-bg', name: 'User Card Background', hex: '#ffffff', rgb: 'rgb(255, 255, 255)', hsl: 'hsl(0, 0%, 100%)', usage: 'background', frequency: 100 }
            ],
            typography: [],
            spacing: [
              { id: 'user-card-padding', name: 'User Card Padding', value: 20, unit: 'px', type: 'padding' }
            ],
            borders: [
              { id: 'user-card-border', name: 'User Card Border', width: 1, style: 'solid', color: '#e5e7eb', radius: 8 }
            ],
            shadows: [
              { id: 'user-card-shadow', name: 'User Card Shadow', offsetX: 0, offsetY: 2, blurRadius: 4, spreadRadius: 0, color: 'rgba(0, 0, 0, 0.05)', type: 'box-shadow' }
            ]
          },
          measurements: {
            width: 830,
            height: 80,
            padding: { top: 20, right: 20, bottom: 20, left: 20 },
            margin: { top: 20, right: 0, bottom: 20, left: 0 }
          }
        },
        {
          id: 'modal',
          type: 'modal',
          name: 'Confirmation Modal',
          boundingBox: { x: 30, y: 540, width: 830, height: 120 },
          states: ['default'],
          styles: {
            colors: [
              { id: 'modal-bg', name: 'Modal Background', hex: '#2563eb', rgb: 'rgb(37, 99, 235)', hsl: 'hsl(217, 91%, 53%)', usage: 'background', frequency: 80 }
            ],
            typography: [],
            spacing: [
              { id: 'modal-padding', name: 'Modal Padding', value: 32, unit: 'px', type: 'padding' }
            ],
            borders: [
              { id: 'modal-border', name: 'Modal Border', width: 0, style: 'none', color: 'transparent', radius: 12 }
            ],
            shadows: [
              { id: 'modal-shadow', name: 'Modal Shadow', offsetX: 0, offsetY: 8, blurRadius: 25, spreadRadius: 0, color: 'rgba(0, 0, 0, 0.15)', type: 'box-shadow' }
            ]
          },
          measurements: {
            width: 830,
            height: 120,
            padding: { top: 32, right: 32, bottom: 32, left: 32 },
            margin: { top: 20, right: 0, bottom: 0, left: 0 }
          }
        }
      ] as ComponentSpec[],
      tokens: {
        colors: [
          { id: 'white', name: 'White', hex: '#ffffff', rgb: 'rgb(255, 255, 255)', hsl: 'hsl(0, 0%, 100%)', usage: 'background', frequency: 500 },
          { id: 'gray-50', name: 'Gray 50', hex: '#f9fafb', rgb: 'rgb(249, 250, 251)', hsl: 'hsl(220, 14%, 98%)', usage: 'background', frequency: 200 },
          { id: 'blue-500', name: 'Primary Blue', hex: '#3981f6', rgb: 'rgb(57, 129, 246)', hsl: 'hsl(217, 91%, 60%)', usage: 'background', frequency: 75 },
          { id: 'blue-600', name: 'Primary Blue Dark', hex: '#2563eb', rgb: 'rgb(37, 99, 235)', hsl: 'hsl(217, 91%, 53%)', usage: 'background', frequency: 80 },
          { id: 'green-500', name: 'Success Green', hex: '#10b981', rgb: 'rgb(16, 185, 129)', hsl: 'hsl(158, 84%, 39%)', usage: 'background', frequency: 20 },
          { id: 'red-500', name: 'Danger Red', hex: '#ef4444', rgb: 'rgb(239, 68, 68)', hsl: 'hsl(0, 84%, 60%)', usage: 'background', frequency: 18 },
          { id: 'gray-300', name: 'Disabled Gray', hex: '#dddddd', rgb: 'rgb(221, 221, 221)', hsl: 'hsl(0, 0%, 87%)', usage: 'background', frequency: 15 },
          { id: 'gray-500', name: 'Disabled Text', hex: '#999999', rgb: 'rgb(153, 153, 153)', hsl: 'hsl(0, 0%, 60%)', usage: 'text', frequency: 10 },
          { id: 'gray-900', name: 'Text Primary', hex: '#1f2937', rgb: 'rgb(31, 41, 55)', hsl: 'hsl(220, 26%, 17%)', usage: 'text', frequency: 60 },
          { id: 'gray-200', name: 'Border Light', hex: '#e5e7eb', rgb: 'rgb(229, 231, 235)', hsl: 'hsl(220, 13%, 91%)', usage: 'border', frequency: 50 }
        ],
        typography: [
          { id: 'product-title', name: 'Product Title', fontFamily: 'Inter, sans-serif', fontSize: 18, fontWeight: 600, lineHeight: 24, letterSpacing: -0.25, textAlign: 'center', color: '#1f2937' },
          { id: 'btn-sm-text', name: 'Small Button Text', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 500, lineHeight: 16, letterSpacing: 0, textAlign: 'center', color: '#ffffff' },
          { id: 'btn-outline-text', name: 'Outline Button Text', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, lineHeight: 16, letterSpacing: 0, textAlign: 'center', color: '#3981f6' },
          { id: 'btn-disabled-text', name: 'Disabled Text', fontFamily: 'Inter, sans-serif', fontSize: 12, fontWeight: 400, lineHeight: 16, letterSpacing: 0, textAlign: 'center', color: '#999999' }
        ],
        spacing: [
          { id: 'space-2', name: 'Space 8', value: 8, unit: 'px', type: 'padding' },
          { id: 'space-4', name: 'Space 16', value: 16, unit: 'px', type: 'padding' },
          { id: 'space-5', name: 'Space 20', value: 20, unit: 'px', type: 'padding' },
          { id: 'space-8', name: 'Space 32', value: 32, unit: 'px', type: 'padding' }
        ],
        borders: [
          { id: 'border-sm', name: 'Small Radius', width: 1, style: 'solid', color: '#e5e7eb', radius: 6 },
          { id: 'border-default', name: 'Default Radius', width: 1, style: 'solid', color: '#e5e7eb', radius: 8 },
          { id: 'border-lg', name: 'Large Radius', width: 1, style: 'solid', color: '#e5e7eb', radius: 12 },
          { id: 'border-accent', name: 'Accent Border', width: 2, style: 'solid', color: '#3981f6', radius: 6 }
        ],
        shadows: [
          { id: 'shadow-sm', name: 'Small Shadow', offsetX: 0, offsetY: 2, blurRadius: 4, spreadRadius: 0, color: 'rgba(0, 0, 0, 0.05)', type: 'box-shadow' },
          { id: 'shadow-md', name: 'Medium Shadow', offsetX: 0, offsetY: 4, blurRadius: 6, spreadRadius: 0, color: 'rgba(0, 0, 0, 0.1)', type: 'box-shadow' },
          { id: 'shadow-lg', name: 'Large Shadow', offsetX: 0, offsetY: 8, blurRadius: 25, spreadRadius: 0, color: 'rgba(0, 0, 0, 0.15)', type: 'box-shadow' }
        ]
      },
      metadata: {
        extractedAt: new Date(),
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTAwIiBoZWlnaHQ9IjcwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4uLi48L3N2Zz4=',
        imageDimensions: { width: 900, height: 700 },
        viewport: 'desktop' as const,
        tolerances: { color: 8, spacing: 4, typography: 2, borderRadius: 2 }
      }
    } as ExtractedStyles
  },
  
  buttons: {
    name: 'Button Components',
    description: 'Various button states and variants',
    viewport: 'desktop' as const,
    mockExtractedStyles: {
      id: 'test-buttons',
      sourceImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjlmYWZiIi8+PHJlY3QgeD0iNTAiIHk9IjUwIiB3aWR0aD0iMTAwIiBoZWlnaHQ9IjQwIiBmaWxsPSIjMzk4MWY2IiByeD0iNiIvPjxyZWN0IHg9IjIwMCIgeT0iNTAiIHdpZHRoPSIxMDAiIGhlaWdodD0iNDAiIGZpbGw9IiNlZjQ0NDQiIHJ4PSI2Ii8+PHJlY3QgeD0iNTAiIHk9IjEyMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0MCIgZmlsbD0iIzEwYjk4MSIgcng9IjYiLz48cmVjdCB4PSIyMDAiIHk9IjEyMCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSI0MCIgZmlsbD0iI2Y1OTUwOCIgcng9IjYiLz48dGV4dCB4PSIxMDAiIHk9Ijc0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiNmZmYiPlByaW1hcnk8L3RleHQ+PHRleHQgeD0iMjUwIiB5PSI3NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjZmZmIj5EYW5nZXI8L3RleHQ+PHRleHQgeD0iMTAwIiB5PSIxNDQiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iI2ZmZiI+U3VjY2VzczwvdGV4dD48dGV4dCB4PSIyNTAiIHk9IjE0NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiBmaWxsPSIjZmZmIj5Xb3JuaW5nPC90ZXh0Pjwvc3ZnPg==',
      components: [
        {
          id: 'btn-primary',
          type: 'button',
          name: 'Primary Button',
          boundingBox: { x: 50, y: 50, width: 100, height: 40 },
          states: ['default', 'hover', 'active'],
          styles: {
            colors: [{ id: 'primary-bg', name: 'Primary Background', hex: '#3981f6', rgb: 'rgb(57, 129, 246)', hsl: 'hsl(217, 91%, 60%)', usage: 'background', frequency: 1 }],
            typography: [{ id: 'btn-text', name: 'Button Text', fontFamily: 'Arial', fontSize: 14, fontWeight: 400, lineHeight: 18, letterSpacing: 0, textAlign: 'center', color: '#ffffff' }],
            spacing: [],
            borders: [],
            shadows: []
          },
          measurements: { width: 100, height: 40, padding: { top: 10, right: 16, bottom: 10, left: 16 }, margin: { top: 0, right: 0, bottom: 0, left: 0 } }
        }
      ] as ComponentSpec[],
      tokens: {
        colors: [
          { id: 'primary', name: 'Primary', hex: '#3981f6', rgb: 'rgb(57, 129, 246)', hsl: 'hsl(217, 91%, 60%)', usage: 'background', frequency: 1 },
          { id: 'danger', name: 'Danger', hex: '#ef4444', rgb: 'rgb(239, 68, 68)', hsl: 'hsl(0, 84%, 60%)', usage: 'background', frequency: 1 },
          { id: 'success', name: 'Success', hex: '#10b981', rgb: 'rgb(16, 185, 129)', hsl: 'hsl(158, 84%, 39%)', usage: 'background', frequency: 1 },
          { id: 'warning', name: 'Warning', hex: '#f59508', rgb: 'rgb(245, 149, 8)', hsl: 'hsl(35, 91%, 50%)', usage: 'background', frequency: 1 }
        ],
        typography: [
          { id: 'btn-text', name: 'Button Text', fontFamily: 'Arial, sans-serif', fontSize: 14, fontWeight: 500, lineHeight: 18, letterSpacing: 0, textAlign: 'center', color: '#ffffff' }
        ],
        spacing: [
          { id: 'btn-padding-y', name: 'Button Padding Y', value: 10, unit: 'px', type: 'padding' },
          { id: 'btn-padding-x', name: 'Button Padding X', value: 16, unit: 'px', type: 'padding' }
        ],
        borders: [
          { id: 'btn-border', name: 'Button Border', width: 0, style: 'none', color: 'transparent', radius: 6 }
        ],
        shadows: []
      },
      metadata: {
        extractedAt: new Date(),
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4uLi48L3N2Zz4=',
        imageDimensions: { width: 400, height: 300 },
        viewport: 'desktop' as const,
        tolerances: { color: 10, spacing: 5, typography: 2, borderRadius: 3 }
      }
    } as ExtractedStyles
  },

  mobile: {
    name: 'Mobile Card Layout',
    description: 'Mobile viewport with card components',
    viewport: 'mobile' as const,
    mockExtractedStyles: {
      id: 'test-mobile',
      sourceImage: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzc1IiBoZWlnaHQ9IjY2NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHJlY3QgeD0iMjAiIHk9IjQwIiB3aWR0aD0iMzM1IiBoZWlnaHQ9IjIwMCIgZmlsbD0iI2ZmZiIgcng9IjEyIi8+PHJlY3QgeD0iMjAiIHk9IjI2MCIgd2lkdGg9IjMzNSIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNmZmYiIHJ4PSIxMiIvPjxyZWN0IHg9IjIwIiB5PSI0ODAiIHdpZHRoPSIzMzUiIGhlaWdodD0iMjAwIiBmaWxsPSIjZmZmIiByeD0iMTIiLz48Y2lyY2xlIGN4PSIxODcuNSIgY3k9IjEwMCIgcj0iMjAiIGZpbGw9IiNkMWQ1ZGIiLz48Y2lyY2xlIGN4PSIxODcuNSIgY3k9IjMyMCIgcj0iMjAiIGZpbGw9IiNkMWQ1ZGIiLz48Y2lyY2xlIGN4PSIxODcuNSIgY3k9IjU0MCIgcj0iMjAiIGZpbGw9IiNkMWQ1ZGIiLz48L3N2Zz4=',
      components: [
        {
          id: 'card-1',
          type: 'card',
          name: 'Mobile Card 1',
          boundingBox: { x: 20, y: 40, width: 335, height: 200 },
          styles: {
            colors: [{ id: 'card-bg', name: 'Card Background', hex: '#ffffff', rgb: 'rgb(255, 255, 255)', hsl: 'hsl(0, 0%, 100%)', usage: 'background', frequency: 3 }],
            typography: [],
            spacing: [],
            borders: [{ id: 'card-border', name: 'Card Border', width: 1, style: 'solid', color: '#e5e7eb', radius: 12 }],
            shadows: [{ id: 'card-shadow', name: 'Card Shadow', offsetX: 0, offsetY: 4, blurRadius: 6, spreadRadius: -1, color: 'rgba(0, 0, 0, 0.1)', type: 'box-shadow' }]
          },
          measurements: { width: 335, height: 200, padding: { top: 20, right: 20, bottom: 20, left: 20 }, margin: { top: 0, right: 0, bottom: 20, left: 0 } }
        }
      ] as ComponentSpec[],
      tokens: {
        colors: [
          { id: 'white', name: 'White', hex: '#ffffff', rgb: 'rgb(255, 255, 255)', hsl: 'hsl(0, 0%, 100%)', usage: 'background', frequency: 3 },
          { id: 'gray-50', name: 'Gray 50', hex: '#f3f4f6', rgb: 'rgb(243, 244, 246)', hsl: 'hsl(220, 14%, 96%)', usage: 'background', frequency: 1 },
          { id: 'gray-300', name: 'Gray 300', hex: '#d1d5db', rgb: 'rgb(209, 213, 219)', hsl: 'hsl(220, 13%, 84%)', usage: 'other', frequency: 3 }
        ],
        typography: [],
        spacing: [
          { id: 'card-padding', name: 'Card Padding', value: 20, unit: 'px', type: 'padding' },
          { id: 'card-gap', name: 'Card Gap', value: 20, unit: 'px', type: 'margin' }
        ],
        borders: [
          { id: 'card-radius', name: 'Card Radius', width: 1, style: 'solid', color: '#e5e7eb', radius: 12 }
        ],
        shadows: [
          { id: 'card-shadow', name: 'Card Shadow', offsetX: 0, offsetY: 4, blurRadius: 6, spreadRadius: -1, color: 'rgba(0, 0, 0, 0.1)', type: 'box-shadow' }
        ]
      },
      metadata: {
        extractedAt: new Date(),
        imageUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzc1IiBoZWlnaHQ9IjY2NyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4uLi48L3N2Zz4=',
        imageDimensions: { width: 375, height: 667 },
        viewport: 'mobile' as const,
        tolerances: { color: 8, spacing: 4, typography: 1, borderRadius: 2 }
      }
    } as ExtractedStyles
  }
};

export const getTestCase = (name: keyof typeof testCases) => testCases[name];
