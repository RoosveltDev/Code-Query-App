"use client";
import React, { useState } from "react";
import "./hamburger.css";
import Hamburger from "hamburger-react";
import { Link } from "react-router-dom";
import { FaChalkboard, FaComments } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { SiGoogleclassroom } from "react-icons/si";

const HamburgerComponent: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div>
      <Hamburger size={24} toggled={open} toggle={setOpen} />
      {open && (
        <div className="OpenMenu">
          <header className="OpenMenu__header"></header>
          <main className="OpenMenu__header__main">
            <nav>
              <ul>
                <li>
                  <Link to={"dashboard"}>
                    {" "}
                    <FaChalkboard />  dashboard 
                  </Link>
                </li>
                <li>
                  <Link to={"chat"}>
                    <FaComments />  chat
                  </Link>
                </li>
                <li>
                  <Link to={"classrooms/${id}/comments"}>
                    <SiGoogleclassroom />  classroom
                  </Link>
                </li>
                <li>
                  <Link to={"loguot"}>
                    <LuLogOut />  loguot
                  </Link>
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
