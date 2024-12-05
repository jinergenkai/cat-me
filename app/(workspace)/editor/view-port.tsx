import React, { useEffect } from "react";

const useViewportHeight = () => {
  useEffect(() => {
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    // Set initial value
    setViewportHeight();

    // Update on resize
    window.addEventListener("resize", setViewportHeight);

    // Cleanup on unmount
    return () => window.removeEventListener("resize", setViewportHeight);
  }, []);
};

export default useViewportHeight;
