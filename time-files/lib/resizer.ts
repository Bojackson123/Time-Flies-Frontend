import { useEffect, useState } from "react";

export default function WindowWidthTracker() {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial window width on component mount
    setWindowWidth(window.innerWidth);

    // Add event listener to update window width on resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return Number(windowWidth);
}
