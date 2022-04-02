import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { BiCar } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { AiOutlineTool } from "react-icons/ai";

interface MenuProps {
  children?: React.ReactNode;
  open: boolean;
  handleToggle: () => void;
}

const SidebarLink = ({
  title,
  Icon,
  route,
  onClick,
  altTitle,
}: {
  title: string;
  Icon?: JSX.Element;
  route: string;
  onClick?: any;
  altTitle?: string;
}) => (
  <NavLink to={route} onClick={onClick}>
    <li
      title={`${altTitle || ""}`}
      style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      {Icon ? (
        <div
          style={{
            padding: "10px 10px",
            background: "transparent",
            display: "flex",
          }}
        >
          {Icon}
        </div>
      ) : (
        ""
      )}
      <p>{title}</p>
    </li>
  </NavLink>
);

function BurgerMenu(props: MenuProps) {
  const { children, open, handleToggle } = props;

  React.useEffect(() => {
    function fn(event: KeyboardEvent) {
      if (event.keyCode === 27) {
        handleToggle();
      }
    }

    document.addEventListener("keydown", fn);

    return () => document.removeEventListener("keydown", fn);
  }, [handleToggle]);

  return (
    <nav className="navBar">
      <button onClick={handleToggle}>
        {open ? (
          <MdClose style={{ color: "#fff", width: "40px", height: "40px" }} />
        ) : (
          <FiMenu style={{ color: "#7b7b7b", width: "40px", height: "40px" }} />
        )}
      </button>
      {children ? (
        children
      ) : (
        <ul className={`menuNav ${open ? " showMenu" : ""}`}>
          <SidebarLink
            title="Services"
            route="/services"
            onClick={() => handleToggle()}
            Icon={<AiOutlineTool />}
          />
          <SidebarLink
            title="Owners"
            route="/owners"
            onClick={() => handleToggle()}
            Icon={<BsPerson />}
          />
          <SidebarLink
            title="Vehicles"
            route="/vehicles"
            onClick={() => handleToggle()}
            Icon={<BiCar />}
          />
        </ul>
      )}
    </nav>
  );
}

export default BurgerMenu;
