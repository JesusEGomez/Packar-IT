/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import BottmBar from "../components/bottmBar";
import Sidebar from "../components/sideBar";

function layout({ children }: React.PropsWithChildren) {
  return (
    <div>
      <Sidebar />
      {children}
      <div className="absolute z-50  bottom-0">
        <BottmBar />
      </div>
    </div>
  );
}

export default layout;
