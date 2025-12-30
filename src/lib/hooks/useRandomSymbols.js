import { useState, useCallback, useEffect } from "react";

export function useRandomSymbols(symbols, cols = 3, rows = 3) {
    
 const getRandomSymbol = () => {
  const totalWeight = symbols.reduce((sum, s) => sum + (s.weight || 1), 0);
  let random = Math.random() * totalWeight;
  for (let s of symbols) {
    random -= s.weight || 1;
    if (random <= 0) return s;
  }
};

    const createResult = () =>
        Array.from({ length: cols }, () =>
            Array.from({ length: rows }, getRandomSymbol)
        );

    const [resultGrid, setResultGrid] = useState(createResult);
    const [animatedGrid, setAnimatedGrid] = useState([]);
    const [spinning, setSpinning] = useState(false);

    const spin = useCallback(() => {
        if (spinning) return;

        setSpinning(true);

        const result = createResult();

        const ANIMATION_LENGTH = 15; 

        const reels = result.map(col => {
    const fakeSymbols = Array.from({ length: ANIMATION_LENGTH }, getRandomSymbol);
    return [...fakeSymbols, ...col]; 
  });

        setAnimatedGrid(reels);

        setTimeout(() => {
            setResultGrid(result);
            setAnimatedGrid([]);

            setSpinning(false);
        }, 2000); 
    }, [spinning]);

    return {
        grid: animatedGrid.length ? animatedGrid : resultGrid,
        spin,
        spinning,
        cols,
        rows,
        isAnimating: animatedGrid.length > 0
    };
}
