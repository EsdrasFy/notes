import React, { useState } from "react";
import "./index.css";
import { HiOutlineArrowLeftOnRectangle} from "react-icons/hi2";
function Header() {
  const backLogin = () => {
    localStorage.clear()
  }
  const [username] = useState(localStorage.getItem("username") || null);
  return (
    <header>
      <div className="containerHeader">
        <h1>HELLO, {username.toUpperCase()}!</h1>
        <h1>JUST LIST</h1>
        <div className="divButtonHeader">
          <button onClick={backLogin}>
            <HiOutlineArrowLeftOnRectangle />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
