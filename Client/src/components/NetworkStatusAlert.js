import React, { useState, useEffect } from "react";
import Swal from "sweetalert";

function NetworkStatusAlert() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function handleNetworkChange() {
      setIsOnline(navigator.onLine);
    }

    window.addEventListener("online", handleNetworkChange);
    window.addEventListener("offline", handleNetworkChange);

    return () => {
      window.removeEventListener("online", handleNetworkChange);
      window.removeEventListener("offline", handleNetworkChange);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) {
      Swal({
        icon: "error",
        title: "Oops... No Network",
        text: "Connection Lost. Please check your network connectivity!",
        footer: "Please check your internet connection and try again.",
        backdrop: "static",
      });
    }
  }, [isOnline]);

  return null;
}

export default NetworkStatusAlert;
