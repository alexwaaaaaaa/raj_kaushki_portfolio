'use client';

import React from 'react';

// react-grid-layout injects custom handles via classNames, but we can customize the style
// This component provides the CSS for the custom handles.

export function ResizeHandles(): React.ReactElement {
  return (
    <style dangerouslySetInnerHTML={{ __html: `
      .react-resizable-handle {
        position: absolute;
        width: 12px;
        height: 12px;
        background: var(--bg-primary);
        border: 2px solid var(--color-primary);
        border-radius: 50%;
        z-index: 100;
        opacity: 0;
        transition: opacity 0.2s, transform 0.2s;
      }
      
      .react-grid-item:hover .react-resizable-handle,
      .react-grid-item.react-resizable-active .react-resizable-handle {
        opacity: 1;
      }

      .react-resizable-handle:hover {
        transform: scale(1.5);
        background: var(--color-primary);
      }

      .react-resizable-handle-se {
        bottom: -4px;
        right: -4px;
        cursor: se-resize;
      }
      .react-resizable-handle-sw {
        bottom: -4px;
        left: -4px;
        cursor: sw-resize;
      }
      .react-resizable-handle-nw {
        top: -4px;
        left: -4px;
        cursor: nw-resize;
      }
      .react-resizable-handle-ne {
        top: -4px;
        right: -4px;
        cursor: ne-resize;
      }
      .react-resizable-handle-e {
        top: 50%;
        margin-top: -6px;
        right: -4px;
        cursor: e-resize;
        border-radius: 4px;
        height: 20px;
      }
      .react-resizable-handle-s {
        bottom: -4px;
        left: 50%;
        margin-left: -6px;
        cursor: s-resize;
        border-radius: 4px;
        width: 20px;
      }
      
      /* Active state */
      .react-grid-item.react-grid-placeholder {
        background: rgba(201,168,76,0.2) !important;
        border: 2px dashed var(--color-primary) !important;
        opacity: 0.8 !important;
        border-radius: 8px;
      }
    `}} />
  );
}

export default ResizeHandles;
