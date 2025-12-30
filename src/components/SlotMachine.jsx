import React, { useContext, useEffect } from "react";
import { GameContext } from "../App";
import { motion, useAnimationControls } from "framer-motion";

const SYMBOL_HEIGHT = 80;

const SlotMachine = () => {
  const { grid, spin, spinning, rows } = useContext(GameContext);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex gap-4 bg-zinc-900 p-6 rounded-xl overflow-hidden">
        {grid.map((col, colIndex) => (
          <Reel
            key={colIndex}
            col={col}
            rows={rows}
            spinning={spinning}
          />
        ))}
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className="px-6 py-3 rounded-lg bg-red-600 text-white font-bold"
      >
        SPIN
      </button>
    </div>
  );
};

const Reel = ({ col, rows, spinning }) => {
  const controls = useAnimationControls();
  const animatedCol = React.useMemo(() => [...col], [col]);

  useEffect(() => {
    if (!spinning) return;

    controls.set({ y: 0 });
    const offset = Math.min(animatedCol.length - rows, 15);
    console.log(`rows ${rows}`)
    console.log(`animatedCol.length ${animatedCol.length}`)
    console.log(-offset * SYMBOL_HEIGHT);

    
    controls.start({
      y: spinning ? -offset * SYMBOL_HEIGHT : 0,
      transition: { duration: 2, ease: "easeOut" }
    }).then(() => {
      controls.set({ y: 0 });
    }).finally(() => {
        controls.stop();
    })
  }, [spinning, animatedCol, rows, controls]);

  return (
    <div className="relative w-20 h-[240px] overflow-hidden bg-black rounded-lg">
      <motion.div animate={controls} className="absolute top-0 w-full">
        {animatedCol.map((symbol, i) => (
          <div
            key={`${symbol.name}-${i}`}
            className="w-20 h-20 flex items-center justify-center
                       bg-zinc-800 text-white font-bold
                       border-b border-zinc-700 text-5xl"
          >
            {symbol.img}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default SlotMachine;
