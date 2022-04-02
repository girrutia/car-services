import React, { useState } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import BurgerMenu from "./shared/components/BurgerMenu";

const App: React.FC = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <main>
      <BrowserRouter>
        <BurgerMenu
          open={navbarOpen}
          handleToggle={() => setNavbarOpen((prevState) => !prevState)}
        />
        <ToastContainer
          transition={Zoom}
          position="top-right"
          autoClose={2500}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover
          closeButton={false}
          bodyClassName={"toaster-container"}
        />
        <Router />
      </BrowserRouter>
    </main>
  );
};

export default App;
