"use client";
import { FaWindowClose } from "react-icons/fa";
import { useContext } from "react";
import { SidebarContext } from "../Provider";

const Sidebar = () => {
  const { isOpen, sideBarControl } = useContext(SidebarContext);
  console.log(isOpen);

  return (
    <div className={isOpen ? "sideBarClose" : "sideBarOpen"}>
      <button onClick={sideBarControl}>
        <FaWindowClose />
      </button>
    </div>
  );
};

export default Sidebar;
