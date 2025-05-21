import { useState } from "react";
import dragonBallLogo from "./assets/Dragon-Ball-Logo.png";
import backgroundVideo from "./assets/background.mp4";
import PlayGround from "./components/PlayGround/PlayGround";
import DifficultySelector from "./components/DifficultySelector/DifficultySelector";
import { MemoryGame } from "./lib/MemoryGame";
import "./App.css";

function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [targetCardIds, setTargetCardIds] = useState([]);
  const [seenCards, setSeenCards] = useState(new Set());
  const [hasLost, setHasLost] = useState(false);
  const [maxScore, setMaxScore] = useState(0);

  const currentScore = seenCards.size;
  const gameOver = hasLost || currentScore === targetCardIds.length;

  function generateRandomCardIds(maxInclusive, count) {
    const ids = Array.from({ length: maxInclusive }, (_, i) => i + 1);

    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    console.log(ids.slice(0, count));
    return ids.slice(0, count);
  }

  function handleSetDifficulty(level) {
    let config;

    switch (level) {
      case "medium":
        config = { name: "medium", cardsToRemember: 7, choicesPerTurn: 6 };
        break;
      case "hard":
        config = { name: "hard", cardsToRemember: 9, choicesPerTurn: 8 };
        break;
      default:
        config = { name: "easy", cardsToRemember: 5, choicesPerTurn: 4 };
    }

    setDifficulty(config);
    setTargetCardIds(generateRandomCardIds(21, config.cardsToRemember));
    setSeenCards(new Set());
    setHasLost(false);
  }

  function pickCard(cardId) {
    if (gameOver || seenCards.has(cardId)) {
      setHasLost(true);
      if (currentScore > maxScore) setMaxScore(currentScore);
      return;
    }

    const newSeen = new Set(seenCards);
    newSeen.add(cardId);
    setSeenCards(newSeen);

    if (newSeen.size === targetCardIds.length && currentScore + 1 > maxScore) {
      setMaxScore(currentScore + 1);
    }
  }

  function getNextChoices() {
    if (!difficulty) return [];

    const fakeCardIds = [];
    const all = [...targetCardIds, ...fakeCardIds];
    const pool = [...new Set(all)];

    const choices = new Set();
    while (choices.size < difficulty.choicesPerTurn && pool.length > 0) {
      const randomId = pool[Math.floor(Math.random() * pool.length)];
      choices.add(randomId);
    }

    return Array.from(choices);
  }

  function DifficultySelectorScreen() {
    return (
      <DifficultySelector
        className="difficultySelector"
        onEasyClick={() => handleSetDifficulty("easy")}
        onMediumClick={() => handleSetDifficulty("medium")}
        onHardClick={() => handleSetDifficulty("hard")}
      />
    );
  }

  function PlayGroundScreen() {
    return (
      <PlayGround
        ids={getNextChoices()}
        difficulty={difficulty.name}
        onCardPick={pickCard}
        children={
          <div className="remainingCards">{`${currentScore} / ${targetCardIds.length}`}</div>
        }
      />
    );
  }

  function GameOverScreen() {
    return (
      <div className="gameOver">
        <h3>Would you like to do another game?</h3>
        <button onClick={resetGame}>Yes</button>
        <button>No</button>
      </div>
    );
  }

  function resetGame() {
    setTargetCardIds(
      MemoryGame.generateRandomCardIds(21, difficulty.cardsToRemember)
    );
    setSeenCards(new Set());
    setHasLost(false);
  }

  return (
    <div className="app">
      <header className="headerContainer">
        <img src={dragonBallLogo} alt="" className="logo" />
        <div className="score">
          <div className="currentScore">Score: {currentScore}</div>
          <div className="bestScore">best: {maxScore}</div>
        </div>
      </header>
      {!difficulty ? (
        <DifficultySelectorScreen />
      ) : hasLost ? (
        <GameOverScreen />
      ) : (
        <PlayGroundScreen />
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
