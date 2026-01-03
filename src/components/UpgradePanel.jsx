const UpgradePanel = ({ upgrades, budzet, buyUpgrade }) => (
  <div className="w-80 rounded-2xl bg-gradient-to-b from-zinc-800 to-zinc-900 p-5 border border-yellow-500/20 shadow-[0_0_30px_rgba(255,215,0,0.15)]">
    <h2 className="text-2xl font-black mb-4 text-yellow-400 tracking-wide">
      🔧 ULEPSZENIA
    </h2>

    <div className="space-y-3">
      {upgrades.map(upg => {
        const nextCost = Math.floor(upg.cost * Math.pow(1.5, upg.level));
        const maxed = upg.maxLevel && upg.level >= upg.maxLevel;

        return (
          <div
            key={upg.id}
            className="p-3 rounded-xl bg-black/40 border border-zinc-700 hover:border-yellow-500/30 transition"
          >
            <div className="flex justify-between items-start gap-3">
              <div>
                <div className="font-bold text-white">
                  {upg.name}
                  <span className="ml-2 text-sm text-zinc-400">
                    lvl {upg.level}
                  </span>
                </div>
                <div className="text-sm text-zinc-400 leading-snug">
                  {upg.description}
                </div>
              </div>

              <button
                disabled={budzet < nextCost || maxed}
                onClick={() => buyUpgrade(upg.id)}
                className={`
                  px-3 py-2 rounded-lg font-bold text-sm hover:cursor-pointer
                  ${
                    maxed
                      ? "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                      : budzet >= nextCost
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105"
                      : "bg-zinc-600 text-zinc-400 cursor-not-allowed"
                  }
                  transition
                `}
              >
                {maxed ? "MAX" : `${nextCost}zł`}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default UpgradePanel;
