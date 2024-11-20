import React, { useState, KeyboardEvent } from "react";
import "./TagInput.css";

interface TagInputProps {
  tags: string[];
  onTagsChange: (newTags: string[]) => void;
}

const TagInput = ({ tags, onTagsChange }: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    const trimmedInput = inputValue.trim();
    if (trimmedInput && !tags.includes(trimmedInput)) {
      onTagsChange([...tags, trimmedInput]);
      setInputValue("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className='tag-input-container'>
      <div className='tag-list'>
        {tags.map((tag) => (
          <span key={tag} className='tag'>
            {tag}
            <button
              type='button'
              onClick={() => removeTag(tag)}
              className='remove-tag'
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        placeholder='Agregar etiqueta (presiona Enter o coma para agregar)'
        className='tag-input'
      />
    </div>
  );
};

export default TagInput;
