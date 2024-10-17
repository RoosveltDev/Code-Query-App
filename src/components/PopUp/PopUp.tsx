import { PopUpType } from "../../types/popup/popup.type"
import Form from "../Form/Form"
import x from "../../assets/x.svg"
import "./popup.css"
import { handleClosePopUp } from "./handlers/handleClosePopUp.handler"
const PopUp = ({inputs, submit,setIsCreatedChat,text}: PopUpType) => {
   
  return (
    <div className="popUp-overlay-main">
        <div className="popUp-overlay-main__popup popUp-container">
            <div className="popUp-container__actions actions-popUp">
                <h1 className="actions-popUp__header">{text}</h1>
                <div onClick={()=>{handleClosePopUp(setIsCreatedChat)}} className="close-popUp-actions"> <img className="close-popUp-actions__x" src={x} alt="cross logo" /></div>
            </div>
            <Form submit={submit} inputs={inputs} buttonText={text} >
                <></>
            </Form>

        </div>
    </div>
  )
}

export default PopUp
