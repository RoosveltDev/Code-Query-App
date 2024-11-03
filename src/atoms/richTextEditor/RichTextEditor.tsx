import { useState, useEffect, useRef } from "react";
import {
  FaBold,
  FaItalic,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaListUl,
  FaListOl,
  FaLink,
  FaEye,
} from "react-icons/fa";
import Button from "../button/Button";
import { handleFormat } from "./handlers/handleEditor.handler";
import "./RichTextEditor.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  className = "",
}: RichTextEditorProps) {
  const [isPreview, setIsPreview] = useState(false);
  const [editorContent, setEditorContent] = useState(value);
  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setEditorContent(value);
  }, [value]);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = editorContent;
    }
  }, [editorContent]);

  const handleChange = (content: string) => {
    setEditorContent(content);
    onChange(content);
  };

  return (
    <div className={`rich-text-editor ${className}`}>
      <div className='editor-toolbar'>
        <Button
          variant='ghost'
          size='small'
          onClick={() => handleFormat("bold", handleChange)}
        >
          <FaBold />
        </Button>
        <Button
          variant='ghost'
          size='small'
          onClick={() => handleFormat("italic", handleChange)}
        >
          <FaItalic />
        </Button>
        <Button
          variant='ghost'
          size='small'
          onClick={() => handleFormat("justifyLeft", handleChange)}
        >
          <FaAlignLeft />
        </Button>
        <Button
          variant='ghost'
          size='small'
          onClick={() => handleFormat("justifyCenter", handleChange)}
        >
          <FaAlignCenter />
        </Button>
        <Button
          variant='ghost'
          size='small'
          onClick={() => handleFormat("justifyRight", handleChange)}
        >
          <FaAlignRight />
        </Button>
        <Button
          variant='ghost'
          size='small'
          onClick={() => handleFormat("insertUnorderedList", handleChange)}
        >
          <FaListUl />
        </Button>
        <Button
          variant='ghost'
          size='small'
          onClick={() => handleFormat("insertOrderedList", handleChange)}
        >
          <FaListOl />
        </Button>
        <Button
          variant='ghost'
          size='small'
          onClick={() => handleFormat("createLink", handleChange)}
        >
          <FaLink />
        </Button>
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
          dangerouslySetInnerHTML={{ __html: editorContent }}
        />
      ) : (
        <div
          ref={editorRef}
          className='editor-content'
          contentEditable
          onInput={(e) => handleChange(e.currentTarget.innerHTML)}
          data-placeholder={placeholder}
        />
      )}
    </div>
  );
}
