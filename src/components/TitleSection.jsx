const TitleSection = ({ budzet }) => (
  <div className="mb-10 text-center">
    <h1 className="text-5xl font-black tracking-wide text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.6)]">
      🎰 AUTOMAT SLOTOWY
    </h1>

    <p className="mt-2 text-zinc-400">
      Zakręć bębnami i pozwól statystyce zrobić swoje
    </p>

    <div className="mt-5 inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-black/60 border border-yellow-500/30 shadow-inner">
      <span className="text-zinc-400">Budżet</span>
      <span className="text-2xl font-black text-green-400">
        {budzet} zł
      </span>
    </div>
  </div>
);

export default TitleSection;
