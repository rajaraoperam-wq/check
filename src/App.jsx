import { useState } from "react";
import "./App.css";

export default function App() {
  const [index, setIndex] = useState(0);

  const messages = [
    "You are my closest friend and my greatest love.",
    "Every day with you feels like coming home.",
    "Your kindness inspires me to be a better person.",
    "I promise to listen, support your dreams, and stand by you.",
    "Your smile is my favorite sunrise—it brightens everything.",
    "I love the life we are building together, today and always."
  ];

  function nextMessage() {
    setIndex((prev) => (prev + 1) % messages.length);
  }

  const [showFirstPhoto, setShowFirstPhoto] = useState(true);

  const firstPhoto = "/our-photo.jpg.JPG";
  const secondPhoto = "/IMG_0073.jpg";

  function togglePhoto() {
    setShowFirstPhoto((s) => !s);
  }

  const currentPhoto = showFirstPhoto ? firstPhoto : secondPhoto;

  const [noPos, setNoPos] = useState({ top: "10%", left: "60%" });
  const [valentineAccepted, setValentineAccepted] = useState(false);

  const [showOverlay, setShowOverlay] = useState(true);

  function moveNo() {
    const top = Math.floor(Math.random() * 60) + 5; // between 5% and 65%
    const left = Math.floor(Math.random() * 60) + 5; // between 5% and 65%
    setNoPos({ top: `${top}%`, left: `${left}%` });
  }

  function acceptValentine() {
    setValentineAccepted(true);
  }

  function openUI() {
    // Try to enter browser fullscreen (requires user gesture)
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => { });
    }
    setShowOverlay(false);
  }

  return (
    <>
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-card">
            <h2>Open Your Gift</h2>
            <p className="overlay-sub">Tap the button to open the gift and enter fullscreen.</p>
            <div style={{ marginTop: 18 }}>
              <button className="btn open-btn" onClick={openUI}>
                Open Gift ✨
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <div className="card">

          <img src={currentPhoto} alt="Us" className="photo" />

          <div className="card-content">

            <h1>HI Manasa</h1>

            <p className="message">{messages[index]}</p>

            <div className="controls">
              <button className="btn" onClick={nextMessage}>
                Show Me Love 💌
              </button>

              <button className="btn" onClick={togglePhoto}>
                {showFirstPhoto ? "Show Second Photo" : "Show First Photo"}
              </button>

              <a className="btn" href={currentPhoto} download>
                Download Photo ⬇️
              </a>
            </div>

            {!valentineAccepted ? (
              <div className="valentine">
                <p className="val-text">Will you be my Valentine?</p>
                <div className="val-buttons">
                  <button className="btn yes" onClick={acceptValentine}>
                    Yes 💖
                  </button>

                  <button
                    className="btn no"
                    onMouseEnter={moveNo}
                    onClick={moveNo}
                    style={{ position: "absolute", top: noPos.top, left: noPos.left }}
                  >
                    No 😅
                  </button>
                </div>
              </div>
            ) : (
              <p className="celebrate">She said <strong>Yes</strong>! 💖</p>
            )}

            <p className="footer">Made with endless love for you 💞</p>

          </div>
        </div>
      </div>
    </>
  );
}
