


export const upgrades = [
    {
      id: 'removeWorst',
      name: 'Usuń najgorszy symbol',
      description: 'Najniższy symbol nie pojawia się już w grze',
      level: 0,
      maxLevel: 1,
      type: 'oneTime',
      cost: 100
    },
    {
      id: 'betterSymbols',
      name: 'Zwiększenie szans na lepsze symbole',
      description: 'Lepsze symbole wypadają częściej',
      level: 0,
      maxLevel: 10,
      type: 'repeatable',
      cost: 50
    },
    {
      id: 'passiveIncome',
      name: 'Pasywny przyrost',
      description: '+1$ co sekundę',
      level: 0,
      maxLevel: 20,
      type: 'repeatable',
      cost: 100
    },
    {
      id: 'autoSpin',
      name: 'Automatyczne losowanie',
      description: 'Slot sam losuje co 10 sekund',
      level: 0,
      maxLevel: 1,
      type: 'oneTime',
      cost: 200
    }
  ]