import { useEffect, useRef } from 'react';

export function useAutoResizeTextarea(value: string, minHeight?: number, maxHeight?: number) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to auto to get the correct scrollHeight
    textarea.style.height = 'auto';
    
    // Calculate the new height
    let newHeight = textarea.scrollHeight;
    
    // Apply min and max height constraints
    if (minHeight && newHeight < minHeight) {
      newHeight = minHeight;
    }
    if (maxHeight && newHeight > maxHeight) {
      newHeight = maxHeight;
    }
    
    // Set the new height
    textarea.style.height = `${newHeight}px`;
  }, [value, minHeight, maxHeight]);

  return textareaRef;
}