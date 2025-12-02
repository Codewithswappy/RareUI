import { useState, useCallback, useRef } from 'react';

interface FileInputOptions {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes
}

export function useFileInput(options: FileInputOptions = {}) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { accept, multiple = false, maxSize } = options;

  const validateFile = useCallback((file: File): boolean => {
    if (maxSize && file.size > maxSize) {
      console.warn(`File ${file.name} exceeds maximum size of ${maxSize} bytes`);
      return false;
    }
    return true;
  }, [maxSize]);

  const addFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const validFiles = fileArray.filter(validateFile);
    
    setFiles(prev => {
      if (multiple) {
        return [...prev, ...validFiles];
      } else {
        return validFiles.slice(0, 1);
      }
    });
  }, [multiple, validateFile]);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, []);

  const openFileDialog = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const { files: inputFiles } = event.target;
    if (inputFiles) {
      addFiles(inputFiles);
    }
  }, [addFiles]);

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    
    const { files: droppedFiles } = event.dataTransfer;
    if (droppedFiles) {
      addFiles(droppedFiles);
    }
  }, [addFiles]);

  return {
    files,
    isDragging,
    inputRef,
    addFiles,
    removeFile,
    clearFiles,
    openFileDialog,
    handleInputChange,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    inputProps: {
      ref: inputRef,
      type: 'file',
      accept,
      multiple,
      onChange: handleInputChange,
      style: { display: 'none' },
    },
  };
}