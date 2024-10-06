import { BrowserRouter,Route,Routes } from "react-router-dom"
import Session from "../pages/Session/Session"
import Recover from "../pages/Recover/Recover"
import Confirm from "../pages/Confirm/Confirm"
function Router(){
    
    return(
        <BrowserRouter>
        

          <Routes>
          
           

          <Route path="/login" element={<Session/>}></Route>
          <Route path="/register" element={<Session/>}></Route>
          <Route path="/recover" element={<Recover/>}></Route>
          <Route path="/confirm" element={<Confirm/>}></Route>
          </Routes>
      
        </BrowserRouter>
    )
}
export default Router