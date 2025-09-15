import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import circle_icon from "./assets/circle.png";
import cross_icon from "./assets/cross.png";
import "../src/App.css";

function TicTacToe() {
  const location = useLocation();
  let { p1, p2 } = location.state || { p1: "Player 1", p2: "Player 2" };

  // ✅ Capitalize first letter of each name
  p1 = p1.charAt(0).toUpperCase() + p1.slice(1);
  p2 = p2.charAt(0).toUpperCase() + p2.slice(1);

  const [data, setData] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState("cross"); // cross always starts
  const [winner, setWinner] = useState(null);

  const winCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const winCheck = () => {
    for (let condition of winCondition) {
      const [a, b, c] = condition;
      if (data[a] && data[a] === data[b] && data[a] === data[c]) {
        return data[a];
      }
    }
    return null;
  };

  // Watch for winner or draw
  useEffect(() => {
    const result = winCheck();
    if (result) {
      setWinner(result);
      setTimeout(() => {
        const winnerName = result === "cross" ? p1 : p2;
        alert(`${winnerName} won the game!`);
        restartGame();
      }, 100);
    } else if (!data.includes(null)) {
      setTimeout(() => {
        alert("It's a draw!");
        restartGame();
      }, 100);
    }
  }, [data]);

  const toggle = (num) => {
    if (data[num] !== null || winner) return;

    const newData = [...data];
    newData[num] = turn; // store symbol
    setData(newData);

    setTurn(turn === "cross" ? "circle" : "cross");
  };

  const restartGame = () => {
    setData(Array(9).fill(null));
    setTurn("cross");
    setWinner(null);
  };

  return (
    <div className="container w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-yellow-500 to-yellow-700 gap-10">
      <h1 className="text-black font-bold text-2xl">{`${p1} (X) vs ${p2} (O)`}</h1>
      <h2 className="text-lg text-white font-semibold">
        {winner
          ? `Winner: ${winner === "cross" ? p1 : p2}`
          : ` ${turn === "cross" ? p1 : p2}'s Turn `}
      </h2>

      <div className="board grid grid-cols-3 gap-4">
        {data.map((e, i) => (
          <div
            key={i}
            onClick={() => toggle(i)}
            className="box w-24 h-24 bg-white flex justify-center items-center cursor-pointer rounded-md"
          >
            {e === "cross" ? (
              <img
                src={cross_icon}
                alt="cross icon"
                className="w-16 h-16 animate-[popIn_0.2s_ease-out_forwards]"
              />
            ) : e === "circle" ? (
              <img
                src={circle_icon}
                alt="circle icon"
                className="w-16 h-16 animate-[popIn_0.2s_ease-out_forwards]"
              />
            ) : null}
          </div>
        ))}
      </div>

      <button
        onClick={restartGame}
        className="btn px-8 py-3 bg-white text-yellow-700 font-bold text-lg rounded-xl shadow-lg hover:bg-yellow-100 hover:scale-105 transition-all duration-200 ease-in-out cursor-pointer"
      >
        Restart Game
      </button>
    </div>
  );
}

export default TicTacToe;
