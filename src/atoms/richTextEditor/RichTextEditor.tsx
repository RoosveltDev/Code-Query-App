import React, { useState, useEffect, useRef } from "react";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaListUl,
  FaListOl,
  FaLink,
  FaImage,
  FaEye,
} from "react-icons/fa";
import Button from "../button/Button";
import "./RichTextEditor.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onImageUpload: (file: File) => Promise<string>;
}

const RichTextEditor = ({
  value,
  onChange,
  placeholder,
  className = "",
  onImageUpload,
}: RichTextEditorProps) => {
  const [isPreview, setIsPreview] = useState(false);
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeStyles, setActiveStyles] = useState<string[]>([]);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      const selection = window.getSelection();
      const range = selection?.getRangeAt(0);
      const startOffset = range?.startOffset;

      editorRef.current.innerHTML = value;

      if (selection && range && startOffset !== undefined) {
        const newRange = document.createRange();
        newRange.setStart(
          editorRef.current,
          Math.min(startOffset, editorRef.current.childNodes.length)
        );
        newRange.collapse(true);
        selection.removeAllRanges();
        selection.addRange(newRange);
      }
    }
  }, [value]);

  const updateActiveStyles = () => {
    const styles: string[] = [];
    if (document.queryCommandState("bold")) styles.push("bold");
    if (document.queryCommandState("italic")) styles.push("italic");
    if (document.queryCommandState("underline")) styles.push("underline");
    if (document.queryCommandState("insertUnorderedList"))
      styles.push("unorderedList");
    if (document.queryCommandState("insertOrderedList"))
      styles.push("orderedList");
    if (document.queryCommandState("justifyLeft")) styles.push("alignLeft");
    if (document.queryCommandState("justifyCenter")) styles.push("alignCenter");
    if (document.queryCommandState("justifyRight")) styles.push("alignRight");
    if (document.queryCommandState("justifyFull")) styles.push("alignJustify");
    setActiveStyles(styles);
  };

  const handleFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    updateActiveStyles();
    editorRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      document.execCommand("insertParagraph", false);
    }
  };

  const insertLink = () => {
    const url = prompt("Enter the URL:");
    if (url) {
      document.execCommand("createLink", false, url);
      onChange(editorRef.current?.innerHTML || "");
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const text = e.clipboardData.getData("text/plain");
    document.execCommand("insertText", false, text);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const imageUrl = await onImageUpload(file);
        document.execCommand("insertImage", false, imageUrl);
        onChange(editorRef.current?.innerHTML || "");
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Failed to upload image. Please try again.");
      }
    }
  };

  const triggerImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handleInput = () => {
    updateActiveStyles();
    onChange(editorRef.current?.innerHTML || "");
  };

  return (
    <div className={`rich-text-editor ${className}`}>
      <div className='editor-toolbar'>
        <Button
          variant='ghost'
          size='small'
          onClick={() => handleFormat("bold")}
          className={activeStyles.includes("bold") ? "active" : ""}
        >
          <FaBold />
        </Button>
        <Button
          variant='ghost'
          size='small'
          onClick={() => handleFormat("italic")}
          className={activeStyles.includes("italic") ? "active" : ""}
        >
          <FaItalic />
        </Button>
        <Button
          variant='ghost'
          size='small'
          onClick={() => handleFormat("underline")}
          className={activeStyles.includes("underline") ? "active" : ""}
        >
          <FaUnderline />
        </Button>
        <Button
          variant='ghost'
          size='small'
          onClick={() => handleFormat("justifyLeft")}
          className={activeStyles.includes("alignLeft") ? "active" : ""}
        >
          <FaAlignLeft />
        </Button>
        <Button
          variant='ghost'
          size='small'
          onClick={() => handleFormat("justifyCenter")}
          className={activeStyles.includes("alignCenter") ? "active" : ""}
        >
          <FaAlignCenter />
        </Button>
        <Button
          variant='ghost'
          size='small'
          onClick={() => handleFormat("justifyRight")}
          className={activeStyles.includes("alignRight") ? "active" : ""}
        >
          <FaAlignRight />
        </Button>
        <Button
          variant='ghost'
          size='small'
          onClick={() => handleFormat("justifyFull")}
          className={activeStyles.includes("alignJustify") ? "active" : ""}
        >
          <FaAlignJustify />
        </Button>
        <Button
          variant='ghost'
          size='small'
          onClick={() => handleFormat("insertUnorderedList")}
          className={activeStyles.includes("unorderedList") ? "active" : ""}
        >
          <FaListUl />
        </Button>
        <Button
          variant='ghost'
          size='small'
          onClick={() => handleFormat("insertOrderedList")}
          className={activeStyles.includes("orderedList") ? "active" : ""}
        >
          <FaListOl />
        </Button>
        <Button variant='ghost' size='small' onClick={insertLink}>
          <FaLink />
        </Button>
        <Button variant='ghost' size='small' onClick={triggerImageUpload}>
          <FaImage />
        </Button>
        <input
          type='file'
          ref={fileInputRef}
          onChange={handleImageUpload}
          accept='image/*'
          style={{ display: "none" }}
        />
        <Button
          variant='ghost'
          size='small'
          onClick={() => setIsPreview(!isPreview)}
        >
          <FaEye />
        </Button>
      </div>
      {isPreview ? (
        <div
          className='editor-preview'
          dangerouslySetInnerHTML={{ __html: value }}
        />
      ) : (
        <div
          ref={editorRef}
          className='editor-content'
          contentEditable
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onMouseUp={updateActiveStyles}
          onKeyUp={updateActiveStyles}
          data-placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default RichTextEditor;
