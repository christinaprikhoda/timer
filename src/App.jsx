import Timer from "./components/Timer";
import { useState } from "react";

function App() {
  const [startTime, setStartTime] = useState(false);

  const handleCreate = () => {
    setStartTime(true);
  };

  const handleDelete = () => {
    setStartTime(false);
  };

  return (
    <>
      <div className="min-h-screen bg-pink-50 flex items-center justify-center">
        <button
          onClick={handleCreate}
          className="px-6 py-3 bg-pink-500 text-white rounded-lg text-xl font-bold shadow-lg hover:bg-pink-400 transition duration-300"
        >
          Create
        </button>
        {startTime && <Timer onDelete={handleDelete} />}
      </div>
    </>
  );
}

export default App;
