import { useState } from "react";
import dragonBallLogo from "./assets/Dragon-Ball-Logo.png";
import backgroundVideo from "./assets/background.mp4";
import Card from "./components/Card/Card";
import "./App.css";
import PlayGround from "./components/PlayGround/PlayGround";
import DifficultySelector from "./components/DifficultySelector/DifficultySelector";

function App() {
  const [difficulty, setDifficulty] = useState("");

  return (
    <div className="app">
      <header className="headerContainer">
        <img src={dragonBallLogo} alt="" className="logo" />
        <div className="score">
          <div className="currentScore">Score: 0</div>
          <div className="bestScore">Score: 50</div>
        </div>
      </header>
      {difficulty ? (
        <PlayGround ids={[1, 2, 4, 8]} difficulty={difficulty} />
      ) : (
        <DifficultySelector
          className="difficultySelector"
          onEasyClick={() => setDifficulty("easy")}
          onMediumClick={() => setDifficulty("medium")}
          onHardClick={() => setDifficulty("hard")}
        />
      )}
      <footer className="settings">
        <div className="left">
          <button className="muteSoundButton">Mute sound</button>
          <button className="muteMusicButton">Mute music</button>
        </div>
        <div className="right">
          <button className="infoButton">info</button>
          <button className="settingsButton">settings</button>
        </div>
      </footer>
      <div className="videoContainer">
        <video autoPlay loop muted playsInline className="videoBackground">
          <source src={backgroundVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

export default App;
