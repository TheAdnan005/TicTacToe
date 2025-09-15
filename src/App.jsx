import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");

  const handlePlay = () => {
    if (p1.trim() === "" || p2.trim() === "") {
      alert("Please enter names for both players.");
      return;
    }
    navigate("/tictactoe", { state: { p1, p2 } });
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-r from-yellow-500 to-yellow-700 gap-10">
      <div className="text-5xl font-extrabold text-white drop-shadow-lg tracking-wide">
        Tic Tac Toe
      </div>
      <div className="names">
        <input
          type="text"
          placeholder="Player 1 Name"
          value={p1}
          onChange={(e) => setP1(e.target.value)}
          className=" border-2 border-black px-4 py-2 m-2 rounded-lg text-white-700 font-semibold focus:outline-none focus:ring-2 focus:ring-white-300"
        />
        <input
          type="text"
          placeholder="Player 2 Name"
          value={p2}
          onChange={(e) => setP2(e.target.value)}
          className=" border-2 border-black px-4 py-2 m-2 rounded-lg text-white-700 font-semibold focus:outline-none focus:ring-2 focus:ring-white-300"
        />
      </div>

      <button
        className="px-8 py-3 bg-white text-yellow-700 font-bold text-lg rounded-xl shadow-lg hover:bg-yellow-100 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer"
        onClick={handlePlay}
      >
        Play
      </button>
    </div>
  );
}

export default App;
