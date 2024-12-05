import { useEffect, useState } from "react";

export function useWindowHeight() {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setHeight(window.innerHeight);
      // console.log("Height: ", window.innerHeight);
      
      handleResize(); // Lấy giá trị ban đầu
      window.addEventListener("resize", handleResize);
      
      return () => window.removeEventListener("resize", handleResize);
    }
  });

  return height;
}
