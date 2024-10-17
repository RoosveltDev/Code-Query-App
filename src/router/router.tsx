import { BrowserRouter,Route,Routes } from "react-router-dom"
import Session from "../pages/Session/Session"
import Recover from "../pages/Recover/Recover"
import Confirm from "../pages/Confirm/Confirm"
import Chat from "../pages/Chat/Chat"
import Layout from "../layout/Layout"
import Dashboard from "../pages/Dashboard/Dashboard"
import ClassRoomStudents from "../pages/ClassRoomStudents/ClassRoomStudents"
import ConfirmStudent from "../pages/ConfirmStudent/ConfirmStudent"
function Router(){
    
    return(
        <BrowserRouter>
        
          <Layout>
            <Routes>
              <Route path="/dashboard" element={<Dashboard/>}></Route>
            <Route path="/login" element={<Session/>}></Route>
            <Route path="/register" element={<Session/>}></Route>
            <Route path="/recover" element={<Recover/>}></Route>
            <Route path="/confirm" element={<Confirm/>}></Route>
            <Route path="/chat" element={<Chat/>}></Route>
            <Route path="/" element={<Session/>}></Route>
            <Route path="/confirmClassroom" element={<ConfirmStudent/>}></Route>
            <Route path="/classroom/:id/student" element={<ClassRoomStudents/>}></Route>
            </Routes>
          </Layout>
          
      
        </BrowserRouter>
    )
}
export default Router