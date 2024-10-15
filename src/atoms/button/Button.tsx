import "./button.css"

const Button = ({buttonText,classText}:{buttonText:string,classText?:string}) => {
  return (
    <button className={!classText?"btn-submit":`btn-submit ${classText}`}>{buttonText}</button>
  )
}

export default Button
