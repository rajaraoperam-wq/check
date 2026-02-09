import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [index, setIndex] = useState(0);

  const messages = [
    "You are my closest friend and my greatest love.",
    "Every day with you feels like coming home.",
    "I promise to listen, support your dreams, and stand by you.",
    "Your smile is my favorite sunrise—it brightens everything.",
    "I love the life we are building together, today and always."
  ];

  function nextMessage() {
    setIndex((prev) => (prev + 1) % messages.length);
  }

  const [showFirstPhoto, setShowFirstPhoto] = useState(0);

  const firstPhoto = "/our-photo.jpg.JPG";
  const secondPhoto = "/IMG_0073.jpg";
  const thirdPhoto = "/1st meet.JPG";
  const photos = [
    { src: firstPhoto, label: "Us" },
    { src: secondPhoto, label: "Together" },
    { src: thirdPhoto, label: "Our 1st Meet 💕" }
  ];

  function togglePhoto() {
    setShowFirstPhoto((s) => (s + 1) % photos.length);
    const newClicks = photoClicks + 1;
    setPhotoClicks(newClicks);
    if (newClicks === 5) {
      setShowMagicMessage(true);
      setPhotoClicks(0);
    }
  }

  const currentPhoto = photos[showFirstPhoto].src;
  const photoLabel = photos[showFirstPhoto].label;

  const [noPos, setNoPos] = useState({ top: "10%", left: "60%" });
  const [valentineAccepted, setValentineAccepted] = useState(false);
  const [heartExplosion, setHeartExplosion] = useState([]);

  const [showOverlay, setShowOverlay] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = React.useRef(null);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstall, setShowInstall] = useState(false);

  const [photoClicks, setPhotoClicks] = useState(0);
  const [showMagicMessage, setShowMagicMessage] = useState(false);
  const [holdProgress, setHoldProgress] = useState(0);
  const holdTimerRef = React.useRef(null);

  function toggleMute() {
    setIsMuted((prev) => !prev);
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  }

  function handleMuteMouseDown() {
    let progress = 0;
    setHoldProgress(0);
    holdTimerRef.current = setInterval(() => {
      progress += 16; // ~60fps
      if (progress >= 3000) {
        // 3 seconds
        clearInterval(holdTimerRef.current);
        setShowMagicMessage(true);
        setHoldProgress(0);
      } else {
        setHoldProgress((progress / 3000) * 100);
      }
    }, 16);
  }

  function handleMuteMouseUp() {
    if (holdTimerRef.current) {
      clearInterval(holdTimerRef.current);
      holdTimerRef.current = null;
      setHoldProgress(0);
    }
  }

  function moveNo() {
    const top = Math.floor(Math.random() * 60) + 5; // between 5% and 65%
    const left = Math.floor(Math.random() * 60) + 5; // between 5% and 65%
    setNoPos({ top: `${top}%`, left: `${left}%` });
  }

  function acceptValentine() {
    setValentineAccepted(true);
    // Create heart explosion particles
    const hearts = [];
    const count = 20;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
      const distance = 120 + Math.random() * 140;
      hearts.push({ id: Date.now() + "-" + i, angle, distance });
    }
    setHeartExplosion(hearts);
    // clear after animation
    setTimeout(() => setHeartExplosion([]), 1600);
  }

  function openUI() {
    // Try to enter browser fullscreen (requires user gesture)
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => { });
    }
    setShowOverlay(false);
    // Unmute and play music when user opens the gift
    if (audioRef.current) {
      audioRef.current.play();
      setIsMuted(false);
    }
  }

  useEffect(() => {
    function beforeInstallHandler(e) {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    }

    function appInstalled() {
      setDeferredPrompt(null);
      setShowInstall(false);
    }

    window.addEventListener("beforeinstallprompt", beforeInstallHandler);
    window.addEventListener("appinstalled", appInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", beforeInstallHandler);
      window.removeEventListener("appinstalled", appInstalled);
    };
  }, []);

  async function handleInstall() {
    if (!deferredPrompt) return;
    try {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      setShowInstall(false);
      setDeferredPrompt(null);
    } catch (err) {
      setShowInstall(false);
      setDeferredPrompt(null);
    }
  }

  // Days since first seen (start date fixed so the counter increases every day)
  const firstSeenDate = new Date(2023, 7, 5); // August 5, 2023 (months are 0-based)
  const msPerDay = 24 * 60 * 60 * 1000;
  const daysSince = Math.floor((Date.now() - firstSeenDate.getTime()) / msPerDay);

  return (
    <>
      <div className="hearts-container">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="heart">💖</div>
        ))}
      </div>

      <audio ref={audioRef} src="/dil_kyun_yeh_mera.mp3" loop autoPlay muted={isMuted} />

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

      {showInstall && (
        <div className="install-popup">
          <div className="install-card">
            <h3>Install This App</h3>
            <p>Install the app for a better, full-screen experience.</p>
            <div style={{ marginTop: 12 }}>
              <button className="btn" onClick={handleInstall} style={{ marginRight: 8 }}>
                Install
              </button>
              <button className="btn" onClick={() => setShowInstall(false)}>
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="container">
        <div className="card">

          <div className="photo-container">
            <img src={currentPhoto} alt="Us" className="photo" />
            <div className="photo-label">{photoLabel}</div>
          </div>

          <div className="card-content">

            <h1>HI Manasa</h1>

            <p className="since">{daysSince} days since I first saw you, Manasa. And I’d still choose you every single day.</p>

            <p className="message">{messages[index]}</p>

            <div className="controls">
              <button className="btn" onClick={nextMessage}>
                Show Me Love 💌
              </button>

              <button className="btn" onClick={togglePhoto}>
                Next Photo ➜
              </button>

              <a className="btn" href={currentPhoto} download>
                Download Photo ⬇️
              </a>

              <button
                className="btn"
                onMouseDown={handleMuteMouseDown}
                onMouseUp={handleMuteMouseUp}
                onMouseLeave={handleMuteMouseUp}
                onClick={toggleMute}
                style={{
                  background:
                    holdProgress > 0
                      ? `linear-gradient(90deg, #ff77aa ${holdProgress}%, #999 ${holdProgress}%)`
                      : ""
                }}
              >
                {isMuted ? "🔊 Unmute" : "🔇 Mute"}
              </button>
            </div>

            {!valentineAccepted ? (
              <div className="valentine">
                <p className="val-text">Will you be my Valentine?</p>
                <div className="val-buttons">
                  <button className="btn yes" onClick={acceptValentine}>
                    Yes 💖
                  </button>

                  {heartExplosion.map((heart) => {
                    const x = Math.cos(heart.angle) * heart.distance;
                    const y = Math.sin(heart.angle) * heart.distance;
                    return (
                      <div
                        key={heart.id}
                        className="exploding-heart"
                        style={{
                          "--tx": `${x}px`,
                          "--ty": `${y}px`,
                          "--delay": `${(Math.random() * 0.3).toFixed(2)}s`,
                        }}
                      >
                        💖
                      </div>
                    );
                  })}

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

            {showMagicMessage && (
              <div className="magic-message">
                <p>Hi ra Pandhi baby 🐷</p>
                <button
                  className="btn"
                  onClick={() => setShowMagicMessage(false)}
                  style={{ marginTop: "10px", padding: "8px 12px", fontSize: "0.9rem" }}
                >
                  Close
                </button>
              </div>
            )}

            <p className="footer">Made with endless love for you 💞</p>

          </div>
        </div>
      </div>
    </>
  );
}
