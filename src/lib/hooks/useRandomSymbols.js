import { useState, useCallback } from "react";

export function useRandomSymbols(symbols, cols = 5, rows = 5) {
  const getRandomSymbol = () => {
    const total = symbols.reduce((s, x) => s + (x.weight || 1), 0);
    let r = Math.random() * total;
    for (const s of symbols) {
      r -= s.weight || 1;
      if (r <= 0) return s;
    }
  };

  const createResult = () =>
    Array.from({ length: cols }, () =>
      Array.from({ length: rows }, getRandomSymbol)
    );

  const [resultGrid, setResultGrid] = useState(createResult);
  const [animatedGrid, setAnimatedGrid] = useState([]);
  const [committed, setCommitted] = useState([]);
  const [spinning, setSpinning] = useState(false);
  const [activeReel, setActiveReel] = useState(null);

  const ANIMATION_LENGTH = 15;
  const REEL_DURATION = 1400;

  const spin = useCallback(() => {
    if (spinning) return;

    const result = createResult();

    const reels = result.map(col => [
      ...Array.from({ length: ANIMATION_LENGTH }, getRandomSymbol),
      ...col
    ]);

    setAnimatedGrid(reels);
    setCommitted(Array(cols).fill(false));
    setResultGrid(result);
    setSpinning(true);
    setActiveReel(0);
  }, [spinning, symbols]);

  const commitReel = index => {
    setCommitted(prev => {
      const copy = [...prev];
      copy[index] = true;
      return copy;
    });

    if (index === cols - 1) {
      setTimeout(() => {
        setAnimatedGrid([]);
        setSpinning(false);
        setActiveReel(null);
      }, 50);
    }
  };

  const grid = animatedGrid.length
    ? animatedGrid.map((col, i) =>
        committed[i] ? resultGrid[i] : col
      )
    : resultGrid;

  return {
    grid,
    spin,
    spinning,
    rows,
    cols,
    activeReel,
    setActiveReel,
    commitReel,
    animationLength: ANIMATION_LENGTH,
    reelDuration: REEL_DURATION
  };
}
