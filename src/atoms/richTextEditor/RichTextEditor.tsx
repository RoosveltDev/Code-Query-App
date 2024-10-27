import { useState } from "react";
import "./RichTextEditor.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const handleBold = () => {
    setIsBold(!isBold);
    onChange(`<strong>${value}</strong>`);
  };

  const handleItalic = () => {
    setIsItalic(!isItalic);
    onChange(`<em>${value}</em>`);
  };

  return (
    <div className='rich-text-editor'>
      <div className='toolbar'>
        <button onClick={handleBold} className={isBold ? "active" : ""}>
          <img src='/assets/bold.svg' alt='Bold' />
        </button>
        <button onClick={handleItalic} className={isItalic ? "active" : ""}>
          <img src='/assets/italic.svg' alt='Italic' />
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className='editor-content'
        placeholder='Escribe tu respuesta aquí...'
      />
    </div>
  );
};

export default RichTextEditor;
