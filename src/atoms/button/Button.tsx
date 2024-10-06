import "./button.css"

const Button = ({buttonText}:{buttonText:string}) => {
  return (
    <button className="btn-submit">{buttonText}</button>
  )
}

export default Button
