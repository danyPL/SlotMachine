import React, { useContext, useEffect } from "react";
import { GameContext } from "../App";
import { motion, useAnimationControls } from "framer-motion";

const SYMBOL_HEIGHT = 80;

const SlotMachine = () => {
  const {
    grid,
    spin,
    spinning,
    rows,
    activeReel,
    setActiveReel,
    commitReel,
    animationLength,
    reelDuration
  } = useContext(GameContext);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative p-6 rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-900 shadow-[0_0_40px_rgba(255,215,0,0.15)] border border-yellow-500/20">
        <div className="flex gap-3 bg-black/60 p-4 rounded-xl backdrop-blur">
          {grid.map((col, i) => (
            <Reel
              key={i}
              col={col}
              index={i}
              rows={rows}
              activeReel={activeReel}
              setActiveReel={setActiveReel}
              commitReel={commitReel}
              animationLength={animationLength}
              reelDuration={reelDuration}
            />
          ))}
        </div>

        <div className="absolute inset-0 rounded-2xl pointer-events-none ring-1 ring-yellow-500/30" />
      </div>

      <button
        onClick={spin}
        disabled={spinning}
        className={`
          px-10 py-4 text-xl font-black tracking-wider rounded-xl
          bg-gradient-to-r from-red-600 via-red-500 to-red-700
          shadow-[0_0_25px_rgba(255,0,0,0.4)]
          hover:scale-105 hover:shadow-[0_0_35px_rgba(255,0,0,0.6)] hover:cursor-pointer
          active:scale-95
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-all
        `}
      >
        🎰 ZAKRĘĆ 🎰
      </button>
    </div>
  );
};

const Reel = ({
  col,
  index,
  activeReel,
  setActiveReel,
  commitReel,
  animationLength,
  reelDuration
}) => {
  const controls = useAnimationControls();

  useEffect(() => {
    if (activeReel !== index) return;

    controls.set({ y: 0 });
    controls
      .start({
        y: -animationLength * SYMBOL_HEIGHT,
        transition: {
          duration: reelDuration / 1000,
          ease: "circInOut"
        }
      })
      .then(() => {
        controls.set({ y: 0 });
        commitReel(index);
        setActiveReel(i => i + 1);
      });
  }, [activeReel]);

  return (
    <div className="relative w-20 h-[240px] overflow-hidden rounded-lg bg-gradient-to-b from-zinc-700 to-zinc-900 shadow-inner">
      <motion.div animate={controls} className="absolute top-0 w-full">
        {col.map((s, i) => (
          <div
            key={i}
            className="
              w-20 h-20 flex items-center justify-center
              text-5xl font-bold
              bg-gradient-to-b from-zinc-800 to-zinc-900
              border-b border-yellow-500/10
              drop-shadow-[0_0_6px_rgba(255,215,0,0.4)]
            "
          >
            {s.img}
          </div>
        ))}
      </motion.div>

      <div className="absolute inset-0 pointer-events-none ring-1 ring-black/50 rounded-lg" />
    </div>
  );
};

export default SlotMachine;
