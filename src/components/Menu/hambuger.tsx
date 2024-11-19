"use client";
import React, { useState } from "react";
import "./hamburger.css";
import Hamburger from "hamburger-react";
import { Link, useNavigate } from "react-router-dom";
import { FaChalkboardTeacher, FaChalkboard, FaComments } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import useUser from "../../hook/useUser";
import { handleLogout } from "./handlers/handleLogout.handler";
import { AiOutlineCreditCard } from "react-icons/ai";

const HamburgerComponent: React.FC = () => {
  const {removeUser} = useUser()
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate()
  return (
    <div className="hamburger-main-container">
      <Hamburger  size={20} toggled={open} toggle={setOpen} />
      {open && (
        <div className="OpenMenu">
          <header className="OpenMenu__header"></header>
          <main className="OpenMenu__header__main">
            <nav>
              <ul>
                <li>
                  <Link to={"dashboard"}>
                    {" "}
                    <FaChalkboard /> dashboard
                  </Link>
                </li>
                <li>
                  <Link to={"classrooms"}>
                    <FaChalkboardTeacher /> Classrooms
                  </Link>
                </li>
                <li>
                  <Link to={"chat"}>
                    <FaComments /> chat
                  </Link>
                </li>
                <li>
                  <Link to={"customerPortal"}>
                    <AiOutlineCreditCard /> billing
                  </Link>
                </li>
                <li>
                  <div onClick={()=>handleLogout(navigate,removeUser)} className="hamburger-list__logout">
                    <LuLogOut /> loguot
                  </div>
                </li>
              </ul>
            </nav>
          </main>
        </div>
      )}
    </div>
  );
};

export default HamburgerComponent;
