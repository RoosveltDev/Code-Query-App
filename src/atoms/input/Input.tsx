import "./input.css"

const Input = () => {
  return (
    <div className="input-wrapper">
    <div className="form-container__input-container input-container">
        <input id="email"  autoComplete="email" className="input-container__input" required type="email"/>
        <i></i>
            <label id="label-2-error" className="label-email" htmlFor="email">Email</label>
            <span id="span-2-error" className="material-symbols-outlined">
                <svg className="input-container__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24l0 112c0 13.3-10.7 24-24 24s-24-10.7-24-24l0-112c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z"/></svg>
            </span>
     
        </div>
        <h5 className="text-error">Por favor revisa tus datos</h5>
</div>
  )
}

export default Input
