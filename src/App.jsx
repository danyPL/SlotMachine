import React, { createContext, useEffect, useRef, useState } from 'react';
import './App.css';
import { symbols as baseSymbols } from './lib/symbols';
import { useRandomSymbols } from './lib/hooks/useRandomSymbols';

import UpgradePanel from './components/UpgradePanel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SlotMachine from './components/slotMachine';
import { upgrades as baseUpgrades } from './lib/upgrades';

export const GameContext = createContext(null);

function App() {
  const [budzet, setBudzet] = useState(100);
  const [symbols, setSymbols] = useState(baseSymbols);
  const [upgrades, setUpgrades] = useState(baseUpgrades);

  const { grid, spin, spinning, cols, rows } = useRandomSymbols(symbols, 3, 3);

  const firstRender = useRef(true);

  // Efekt wygranej po spinie
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!spinning && grid.length > 0) {
      const currentResults = grid.map(col => col[1]);
      symbols.forEach(symbol => {
        const symbolCount = currentResults.filter(item => item.name === symbol.name);
        if (symbolCount.length === 2) {
          toast(`Trafiłeś ${symbolCount.length}x ${symbol.name} o wartości ${symbol.value * symbolCount.length}`);
          setBudzet(prev => prev + symbol.value * 2);
        } else if (symbolCount.length === 3) {
          toast(`Trafiłeś ${symbolCount.length}x ${symbol.name} o wartości ${symbol.value * symbolCount.length * 2}`);
          setBudzet(prev => prev + symbol.value * 5);
        }
      });
    }
  }, [grid, spinning, symbols]);

  // [Upgrade #1] Pasywny przyrost
  useEffect(() => {
    const passive = upgrades.find(u => u.id === 'passiveIncome')?.level || 0;
    if (passive === 0) return;
    const interval = setInterval(() => setBudzet(prev => prev + passive), 1000);
    return () => clearInterval(interval);
  }, [upgrades]);

  // [Upgrade #2] Automatyczny mini-slot
  useEffect(() => {
    const auto = upgrades.find(u => u.id === 'autoSpin')?.level || 0;
    if (auto === 0) return;
    const interval = setInterval(() => {
      if (!spinning) spin();
    }, 10000);
    return () => clearInterval(interval);
  }, [upgrades, spinning, spin]);

  const buyUpgrade = (id) => {
    const upg = upgrades.find(u => u.id === id);
    if (!upg) return;
    const cost = Math.floor(upg.cost * Math.pow(1.5, upg.level));

    if (budzet < cost) {
      toast.error("Nie masz wystarczająco środków!");
      return;
    }

    setBudzet(prev => prev - cost);
    setUpgrades(prev => prev.map(u => u.id === id ? { ...u, level: u.level + 1 } : u));

    // Efekty ulepszeń
    if (id === 'removeWorst') {
      const minValue = Math.min(...symbols.map(s => s.value));
      setSymbols(prev => prev.filter(s => s.value > minValue));
    } else if (id === 'betterSymbols') {
      setSymbols(prev => prev.map(s => ({
        ...s,
        weight: (s.weight || 1) * 1.2
      })));
    }
  };

  return (
    <GameContext.Provider value={{ grid, spin, spinning, cols, rows, budzet }}>
      <div className="App w-screen h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-4">
        <ToastContainer />
        <div className="mb-4">
          <p className="text-xl">Budżet: {budzet}zł</p>
        </div>
        <div className="flex gap-6">
          <SlotMachine />
          <UpgradePanel upgrades={upgrades} budzet={budzet} buyUpgrade={buyUpgrade} />
        </div>
      </div>
    </GameContext.Provider>
  );
}

export default App;
