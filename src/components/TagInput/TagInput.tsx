import React, { useState, useEffect, useRef } from "react";
import "./TagInput.css";

interface TagInputProps {
  tags: string[];
  onTagsChange: (newTags: string[]) => void;
  availableTags: string[];
}

const TagInput = ({ tags, onTagsChange, availableTags }: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setIsOpen(true);
    setFilteredTags(
      availableTags.filter(
        (tag) =>
          tag.toLowerCase().includes(value.toLowerCase()) && !tags.includes(tag)
      )
    );
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
    } else if (e.key === "ArrowDown" && isOpen) {
      e.preventDefault();
      const firstItem = dropdownRef.current?.querySelector("li");
      if (firstItem) {
        (firstItem as HTMLElement).focus();
      }
    }
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (
      trimmedTag &&
      !tags.includes(trimmedTag) &&
      availableTags.includes(trimmedTag)
    ) {
      onTagsChange([...tags, trimmedTag]);
      setInputValue("");
      setFilteredTags([]);
      setIsOpen(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleTagClick = (tag: string) => {
    addTag(tag);
    inputRef.current?.focus();
  };

  const handleTagKeyDown = (
    e: React.KeyboardEvent<HTMLLIElement>,
    tag: string
  ) => {
    if (e.key === "Enter") {
      addTag(tag);
      inputRef.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextSibling = e.currentTarget.nextElementSibling as HTMLElement;
      if (nextSibling) {
        nextSibling.focus();
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevSibling = e.currentTarget.previousElementSibling as HTMLElement;
      if (prevSibling) {
        prevSibling.focus();
      } else {
        inputRef.current?.focus();
      }
    }
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
              aria-label={`Eliminar etiqueta ${tag}`}
            >
              &times;
            </button>
          </span>
        ))}
      </div>
      <div className='tag-input-wrapper'>
        <input
          ref={inputRef}
          type='text'
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder='Agregar o buscar etiquetas'
          className='tag-input'
          aria-label='Agregar o buscar etiquetas'
          aria-autocomplete='list'
          aria-controls='tag-dropdown'
          aria-expanded={isOpen}
        />
        {isOpen && filteredTags.length > 0 && (
          <ul
            id='tag-dropdown'
            ref={dropdownRef}
            className='tag-dropdown'
            role='listbox'
          >
            {filteredTags.map((tag) => (
              <li
                key={tag}
                onClick={() => handleTagClick(tag)}
                onKeyDown={(e) => handleTagKeyDown(e, tag)}
                tabIndex={0}
                role='option'
                aria-selected={false}
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TagInput;
