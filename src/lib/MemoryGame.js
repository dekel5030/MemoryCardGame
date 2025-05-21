export class MemoryGame {
  constructor() {
    this.difficulty = null;
    this.targetCardIds = [];
    this.choicesPerTurn = 0;
    this.seenCards = new Set();
    this.hasLost = false;
    this.maxScore = 0;
  }

  static generateRandomCardIds(maxExclusive, count) {
    const ids = Array.from({ length: maxExclusive }, (_, i) => i);
    for (let i = ids.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [ids[i], ids[j]] = [ids[j], ids[i]];
    }
    return ids.slice(0, count);
  }

  pick(cardId) {
    if (!this.difficulty || this.isGameOver()) return;

    if (this.hasSeen(cardId)) {
      this.hasLost = true;
      this._updateMaxScore();
    } else {
      this.seenCards.add(cardId);
      if (this.isWinner()) {
        this._updateMaxScore();
      }
    }
  }

  hasSeen(cardId) {
    return this.seenCards.has(cardId);
  }

  isWinner() {
    return this.seenCards.size === this.targetCardIds.length;
  }

  isLoser() {
    return this.hasLost;
  }

  isGameOver() {
    return this.isWinner() || this.isLoser();
  }

  getScore() {
    return this.seenCards.size;
  }

  getMaxScore() {
    return this.maxScore;
  }

  remainingCount() {
    return this.targetCardIds.length - this.seenCards.size;
  }

  getUnseenCards() {
    return this.targetCardIds.filter((id) => !this.seenCards.has(id));
  }

  getNextChoices() {
    if (!this.difficulty) return [];

    const all = [...this.targetCardIds, ...this._generateFakeCardIds()];
    const pool = [...new Set(all)];

    const choices = new Set();
    while (choices.size < this.choicesPerTurn && pool.length > 0) {
      const randomId = pool[Math.floor(Math.random() * pool.length)];
      choices.add(randomId);
    }

    return Array.from(choices);
  }

  reset() {
    if (!this.difficulty) return;

    this.targetCardIds = MemoryGame.generateRandomCardIds(
      21,
      this.difficulty.cardsToRemember
    );
    this.seenCards.clear();
    this.hasLost = false;
  }

  setDifficulty(newDifficultyConfig) {
    this.difficulty = newDifficultyConfig;
    this.choicesPerTurn = newDifficultyConfig.choicesPerTurn;
    this.reset();
  }

  _updateMaxScore() {
    const currentScore = this.getScore();
    if (currentScore > this.maxScore) {
      this.maxScore = currentScore;
    }
  }

  _generateFakeCardIds() {
    return [];
  }
}
