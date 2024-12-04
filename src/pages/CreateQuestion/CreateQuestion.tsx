import { useEffect, useRef, useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import Button from "../../atoms/button/Button";
import Input from "../../atoms/input/Input";
import RichTextEditor from "../../atoms/richTextEditor/RichTextEditor";
import TagInput from "../../components/TagInput/TagInput";
import "./CreateQuestion.css";
import { useNavigate, useParams } from "react-router-dom";
import { handleSubmit } from "./handlers/handleCreateQuestion.handler";

const CreateQuestion = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigator = useNavigate()
  const [image, setImage] = useState<File | undefined>(undefined);
  const [tags, setTags] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const availableTags = [
    "HTML",
    "CSS",
    "JS",
    "REACT",
    "POSTGRES",
    "NODEJS",
    "CODING",
    "PYTHON",
    "TYPESCRIPT",
    "MONGODB",
  ];
  const { id } = useParams();
  const classroom_id = id as string;

  const controllerRef = useRef<AbortController | null>(null);

  const handleImageUpload = async (file: File): Promise<string> => {
    setImage(file);
    return URL.createObjectURL(file);
  };
  useEffect(() => {
    controllerRef.current = new AbortController();
    return () => {
      controllerRef.current?.abort();
    };
  }, []);

  return (
    <div className='create-question'>
      <h1 className='create-question-title'>
        <FaQuestionCircle className='question-icon' />
        Ask a question
      </h1>
      {error && <div className='error-message'>{error}</div>}
      <form
        onSubmit={(e) =>
          handleSubmit(
            e,
            setIsSubmitting,
            setError,
            {
              classroom_id: classroom_id.toString(),
              title,
              body: content,
              tags: tags.map(tag => availableTags.findIndex(availableTag => availableTag === tag) + 1),
              image,
            },
            controllerRef,
            navigator
          )
        }
        className='question-form'
      >
        <div className='form-group'>
          <label htmlFor='question-title'>Title of the question</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='What is your question?'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='question-content'>Details of the question</label>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder='Please provide more details about your question...'
            onImageUpload={handleImageUpload}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='question-tags'>Tags</label>
          <TagInput
            tags={tags}
            onTagsChange={setTags}
            availableTags={availableTags}
          />
        </div>
        <Button
          type='submit'
          variant='primary'
          size='large'
          disabled={isSubmitting}
        >
          {isSubmitting ? "Publishing..." : "Publish a question"}
        </Button>
      </form>
    </div>
  );
};

export default CreateQuestion;
