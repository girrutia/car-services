import React from "react";
import { NavLink } from "react-router-dom";
import "./styles.css";

interface MenuProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

const SidebarLink = ({
  title,
  icon,
  route,
  onClick,
  altTitle,
}: {
  title: string;
  icon?: any;
  route: string;
  onClick?: any;
  altTitle?: string;
}) => (
  <NavLink to={route} onClick={onClick} className="navLink">
    <li title={`${altTitle || ""}`}>
      {/* {icon ? <span/> : ''} */}
      {icon ? <img src={`../../../../img/${icon}.png`} alt="" /> : ""}
      <p>{title}</p>
    </li>
  </NavLink>
);

function BurgerMenu(props: MenuProps) {
  const { children, open, onClose } = props;

  function handleKeypress(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.keyCode === 27) {
      onClose();
    }
  }

  React.useEffect(() => {
    function fn(event: KeyboardEvent) {
      if (event.keyCode === 27) {
        onClose();
      }
    }

    document.addEventListener("keydown", fn);

    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div>
      <div
        onClick={onClose}
        role="presentation"
        onKeyPress={handleKeypress}
        data-open={JSON.stringify(open)}
        className="overlay"
      />
      <nav data-open={JSON.stringify(open)} className="menu">
        {children}
        <hr />
        <SidebarLink title="Owners" route="/owners" />
        <hr />
        <SidebarLink title="Vehicles" route="/vehicles" />
        <hr />
        <SidebarLink title="Services" route="/services" />
        <hr />
      </nav>
    </div>
  );
}

export default BurgerMenu;
