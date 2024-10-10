import { BrowserRouter,Route,Routes } from "react-router-dom"
import Session from "../pages/Session/Session"
import Recover from "../pages/Recover/Recover"
import Confirm from "../pages/Confirm/Confirm"
import Chat from "../pages/Chat/Chat"
function Router(){
    
    return(
        <BrowserRouter>
        

          <Routes>
          
           

          <Route path="/login" element={<Session/>}></Route>
          <Route path="/register" element={<Session/>}></Route>
          <Route path="/recover" element={<Recover/>}></Route>
          <Route path="/confirm" element={<Confirm/>}></Route>
          <Route path="/chat" element={<Chat/>}></Route>
          </Routes>
      
        </BrowserRouter>
    )
}
export default Router