import React, { useEffect, useState, useRef } from "react";
import styles from "./Card.module.css";
import { fetchCharacter } from "../../services/dbManager.js";

export default function Card({ id }) {
  const [character, setCharacter] = useState(null);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (centerY - y) / 8;
    const rotateY = (x - centerX) / 8;

    const deltaX = x - centerX;
    const deltaY = y - centerY;
    const angle = Math.atan2(deltaY, deltaX);
    const rotateZ = (angle * (180 / Math.PI)) / 20;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    card.style.transform = "rotateX(0deg) rotateY(0deg) rotateZ(0deg)";
  };

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        const data = await fetchCharacter(id);
        setCharacter(data);
      } catch (error) {
        console.error("Failed to load character:", error);
      }
    };
    loadCharacter();
  }, [id]);

  if (!character) return <p>Loading...</p>;

  return (
    <div
      ref={cardRef}
      className={styles.card}
      key={character.id}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <img
        src={character.image}
        alt={character.name}
        className={styles.cardImg}
      />
      <h2 className={styles.cardName}>{character.name}</h2>
    </div>
  );
}
