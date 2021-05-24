import React, { useEffect } from "react";
import ReactDOM from "react-dom";

const portalRoot = document.getElementById("loaderPortal");

function Portal(props) {
  const el = document.createElement("div");
  //portalRoot.appendChild(el);
    // const PortalLoader = () => {
    //     portalRoot.appendChild(el);
    // };
    useEffect(() => {
      portalRoot.appendChild(el);
        return () => {
            portalRoot.removeChild(el);
        };
    }, [el]);

    return ReactDOM.createPortal(props.children, el);
}

export default Portal;
