import { BrowserRouter, Route, Routes } from "react-router-dom";
import Session from "../pages/Session/Session";
import Recover from "../pages/Recover/Recover";
import Confirm from "../pages/Confirm/Confirm";
import Chat from "../pages/Chat/Chat";
import Layout from "../layout/Layout";
import Dashboard from "../pages/Dashboard/Dashboard";
import ClassRoomStudents from "../pages/ClassRoomStudents/ClassRoomStudents";
import ConfirmStudent from "../pages/ConfirmStudent/ConfirmStudent";
import Private from "../guard/Private";
import Public from "../guard/Public";
import Auth from "../pages/Auth/Auth";
import LiveCoding from "../pages/LiveCoding/LiveCoding";
import Pricing from "../pages/Pricing/Pricing";
import CustomerPortal from "../pages/CustomerPortal/CustomerPortal";
import CreateQuestion from "../pages/CreateQuestion/CreateQuestion";
import QuestionDetail from "../pages/QuestionDetail/QuestionDetail";
import ClassroomsAdmin from "../pages/ClassroomAdmin/ClassroomsAdmin";
import ClassRoom from "../pages/ClassRoom/Classroom";
import NotFound from "../pages/NotFound/NotFound";
import Error from "../pages/Error/Error";
import Success from "../pages/Success/Success";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Private></Private>}>
          <Route element={<Layout></Layout>}>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/classrooms' element={<ClassroomsAdmin />}></Route>
            <Route path='/chat' element={<Chat />}></Route>
            <Route
              path='/confirmClassroom'
              element={<ConfirmStudent />}
            ></Route>
            <Route path="/question/:questionId/answer/:answerId/live" element={<LiveCoding/>}></Route>
            <Route
              path='/classroom/:id/student'
              element={<ClassRoomStudents />}
            ></Route>
            <Route path='/pricing' element={<Pricing />}></Route>
            <Route path='/customerPortal' element={<CustomerPortal />}></Route>
            <Route
              path='/classroom/:id/question/:questionId/answers'
              element={<QuestionDetail />}
            ></Route>
            <Route
              path='/classroom/:id/question/create'
              element={<CreateQuestion />}
            ></Route>
            <Route path='/classroom/:id' element={<ClassRoom />}></Route>
          </Route>
        </Route>
        <Route element={<Public></Public>}>
          <Route path='/login' element={<Session />}></Route>
          <Route path='/register' element={<Session />}></Route>
          <Route path='/recover' element={<Recover />}></Route>
          <Route path='/confirm' element={<Confirm />}></Route>
          <Route path='/auth/success' element={<Auth />}></Route>
          <Route path='/' element={<Session />}></Route>
        </Route>
        <Route path='/error' element={<Error />}></Route>
        <Route path='/success' element={<Success />}></Route>
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default Router;
