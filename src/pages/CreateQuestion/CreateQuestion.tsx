import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import Button from "../../atoms/button/Button";
import Input from "../../atoms/input/Input";
import RichTextEditor from "../../atoms/richTextEditor/RichTextEditor";
import TagInput from "../../components/TagInput/TagInput";
import "./CreateQuestion.css";

const CreateQuestion = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      //Logica de la api
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al crear la pregunta"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    setImage(file);
    return URL.createObjectURL(file);
  };

  return (
    <div className='create-question'>
      <h1 className='create-question-title'>
        <FaQuestionCircle className='question-icon' />
        Hacer una pregunta
      </h1>
      {error && <div className='error-message'>{error}</div>}
      <form onSubmit={handleSubmit} className='question-form'>
        <div className='form-group'>
          <label htmlFor='question-title'>Título de la pregunta</label>
          <Input
            id='question-title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='¿Cuál es tu pregunta?'
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='question-content'>Detalles de la pregunta</label>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder='Proporciona más detalles sobre tu pregunta...'
            onImageUpload={handleImageUpload}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='question-tags'>Etiquetas</label>
          <TagInput tags={tags} onTagsChange={setTags} />
        </div>
        <Button
          type='submit'
          variant='primary'
          size='large'
          disabled={isSubmitting}
        >
          {isSubmitting ? "Publicando..." : "Publicar pregunta"}
        </Button>
      </form>
    </div>
  );
};

export default CreateQuestion;
