import { useState } from "react";
import "./App.css";

export default function App() {
  const [index, setIndex] = useState(0);

  const messages = [
    "You are my favorite notification 💕",
    "You debug my bad days",
    "if (girlfriend === you) { happiness = true }",
    "You make my heart compile without errors",
    "I’d choose you in every timeline 🌸",
    "You are my best deploy ever 🚀"
  ];

  function nextMessage() {
    setIndex((prev) => (prev + 1) % messages.length);
  }

  return (
    <div className="container">
      <div className="card">
        <h1>For My Favorite Human ❤️</h1>

        <p className="message">{messages[index]}</p>

        <button onClick={nextMessage}>
          Show Me Love 💌
        </button>

        <p className="footer">
          Built with ❤️ just for you
        </p>
      </div>
    </div>
  );
}
