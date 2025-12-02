import { useState, useCallback } from 'react';

interface Tag {
  id: string;
  text: string;
}

export function useTags(initialTags: Tag[] = []) {
  const [tags, setTags] = useState<Tag[]>(initialTags);

  const addTag = useCallback((text: string) => {
    const newTag: Tag = {
      id: Math.random().toString(36).substr(2, 9),
      text: text.trim(),
    };
    
    if (newTag.text && !tags.some(tag => tag.text === newTag.text)) {
      setTags(prev => [...prev, newTag]);
    }
  }, [tags]);

  const removeTag = useCallback((id: string) => {
    setTags(prev => prev.filter(tag => tag.id !== id));
  }, []);

  const clearTags = useCallback(() => {
    setTags([]);
  }, []);

  return {
    tags,
    addTag,
    removeTag,
    clearTags,
  };
}