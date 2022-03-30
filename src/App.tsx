import React, { useState } from "react";
import { ToastContainer, Zoom } from "react-toastify";
import Router from "./Router";
import { BrowserRouter } from "react-router-dom";
import BurgerMenu from "./shared/components/BurgerMenu";

const App: React.FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <main>
      <BrowserRouter>
        <BurgerMenu
          open={open}
          onClose={() => setOpen((prevState) => !prevState)}
        >{<></>}</BurgerMenu>
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
