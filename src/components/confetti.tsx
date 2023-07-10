import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

type ConfettiProps = {
  isDisplayed: boolean;
};

const Confetti = ({ isDisplayed }: ConfettiProps) => {
  const [windowDimension, setWindowDimension] = useState({
    width: 0,
    height: 0,
  });

  const detectSize = () => {
    if (typeof window !== "undefined") {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", detectSize);
      return () => {
        window.removeEventListener("resize", detectSize);
      };
    }
  }, [windowDimension]);

  return (
    <>
      {isDisplayed && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          tweenDuration={1000}
        />
      )}
    </>
  );
};

export default Confetti;
