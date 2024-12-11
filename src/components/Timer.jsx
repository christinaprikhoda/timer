import { useEffect, useState } from "react";

const Timer = ({ onDelete }) => {
  const getCurrentTime = () => {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    hours = hours > 12 ? hours - 12 : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    return { hours, minutes, seconds };
  };
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        setCurrentTime((prevTime) => {
          let newMinutes = prevTime.minutes;
          let newSeconds = prevTime.seconds - 1;

          if (newSeconds < 0) {
            newSeconds = 59;
            newMinutes = prevTime.minutes - 1;
          }

          if (newMinutes < 0) {
            clearInterval(intervalId);
            setIsActive(false);
          }

          return { minutes: newMinutes, seconds: newSeconds };
        });
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isActive]);

  const handlePause = () => {
    setIsActive(false);
  };

  const handleContinue = () => {
    setIsActive(true);
  };

  return (
    <div className="mt-8 p-6 bg-pink-100 rounded-lg shadow-xl text-center">
      <h1 className="text-4xl font-bold text-pink-800 mb-4">
        {String(currentTime.minutes).padStart(2, "0")}:
        {String(currentTime.seconds).padStart(2, "0")}
      </h1>
      <div className="space-x-4">
        <button
          onClick={handlePause}
          className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-400 transition duration-300"
        >
          Pause
        </button>
        <button
          onClick={handleContinue}
          className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-400 transition duration-300"
        >
          Continue
        </button>
        <button
          onClick={onDelete}
          className="px-6 py-3 bg-pink-500 text-white rounded-lg shadow-lg hover:bg-pink-400 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Timer;
