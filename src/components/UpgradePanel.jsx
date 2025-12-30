import React from 'react';

const UpgradePanel = ({ upgrades, budzet, buyUpgrade }) => {
  return (
    <div className="bg-zinc-800 p-4 rounded-lg text-white w-80 h-fit">
      <h2 className="text-xl font-bold mb-4">Ulepszenia</h2>
      {upgrades.map(upg => {
        const nextCost = Math.floor(upg.cost * Math.pow(1.5, upg.level));
        const maxed = upg.maxLevel && upg.level >= upg.maxLevel;

        return (
          <div key={upg.id} className="mb-3 border-b border-zinc-700 pb-2">
            <div className="flex justify-between items-center">
              <div>
                <div className="font-bold">{upg.name} (lvl {upg.level})</div>
                <div className="text-sm">{upg.description}</div>
              </div>
              <button
                className={`px-2 py-1 rounded ${
                  budzet >= nextCost && !maxed ? 'bg-green-600' : 'bg-zinc-600 cursor-not-allowed'
                }`}
                disabled={budzet < nextCost || maxed}
                onClick={() => buyUpgrade(upg.id)}
              >
                {maxed ? 'MAX' : `${nextCost}$`}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UpgradePanel;
