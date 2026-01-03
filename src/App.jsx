import React, { createContext, useEffect, useRef, useState } from "react";
import "./App.css";
import { symbols as baseSymbols } from "./lib/symbols";
import { upgrades as baseUpgrades } from "./lib/upgrades";
import { useRandomSymbols } from "./lib/hooks/useRandomSymbols";

import UpgradePanel from "./components/UpgradePanel";
import { ToastContainer, toast } from "react-toastify";
import TitleSection from "./components/TitleSection";
import SlotMachine from "./components/slotMachine";

export const GameContext = createContext(null);

function App() {
  const [budzet, setBudzet] = useState(100000);
  const [symbols, setSymbols] = useState(baseSymbols);
  const [upgrades, setUpgrades] = useState(baseUpgrades);
  const slot = useRandomSymbols(symbols, 3, 3);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!slot.spinning) {
      const center = slot.grid.map(col => col[1]);

      symbols.forEach(s => {
        const count = center.filter(x => x.name === s.name).length;
        if (count >= 2) {
          const win = s.value * (count === 3 ? 5 : 2);
          toast(`Trafiłeś ${count}x ${s.name} (+${win})`);
          setBudzet(b => b + win);
        }
      });
    }
  }, [slot.grid, slot.spinning]);


  useEffect(() => {
    const passive = upgrades.find(u => u.id === 'passiveIncome')?.level || 0;
    if (passive === 0) return;
    const interval = setInterval(() => setBudzet(prev => prev + passive), 1000);
    return () => clearInterval(interval);
  }, [upgrades]);

  useEffect(() => {
    const auto = upgrades.find(u => u.id === 'autoSpin')?.level || 0;
    if (auto === 0) return;
    const interval = setInterval(() => {
      if (!slot.spinning) slot.spin();
    }, 5000);
    return () => clearInterval(interval);
  }, [upgrades, slot.spinning, slot.spin]);
  
  const buyUpgrade = id => {
    const upg = upgrades.find(u => u.id === id);
    if (!upg) return;

    const cost = Math.floor(upg.cost * Math.pow(1.5, upg.level));
    if (budzet < cost) {
      toast.error("Brak środków");
      return;
    }

    setBudzet(b => b - cost);
    setUpgrades(u =>
      u.map(x => (x.id === id ? { ...x, level: x.level + 1 } : x))
    );

    if (id === "removeWorst") {
      setSymbols(s =>
        s.filter(x => x.value > Math.min(...s.map(y => y.value)))
      );
    }

    if (id === "betterSymbols") {
      setSymbols(s =>
        s.map(x => ({ ...x, weight: (x.weight || 1) * 1.2 }))
      );
    }
  };

  return (
    <GameContext.Provider value={{ ...slot, budzet }}>
      <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white">
        <ToastContainer theme="dark" />

        <div className="max-w-7xl mx-auto px-6 py-10">
          <TitleSection budzet={budzet} />

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-start">
            <div className="flex justify-center">
              <SlotMachine />
            </div>

            <div className="flex justify-center">
              <UpgradePanel
                upgrades={upgrades}
                budzet={budzet}
                buyUpgrade={buyUpgrade}
              />
            </div>
          </div>
        </div>
      </div>
    </GameContext.Provider>
  );
}

export default App;
