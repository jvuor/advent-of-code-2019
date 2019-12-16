import { Orbiter } from './Orbiter';

export function parseMap(map: string): number {
  let orbiterMap = map
    .split('\n')
    .map(row => row.trim())
    .filter(row => row);

  const orbiterList: Orbiter[] = [];
  orbiterList.push(new Orbiter('COM', null));

  while (orbiterMap.length > 0) {
    const unusedOrbiters: string[] = [];

    orbiterMap.forEach(orbiter => {
      const [ parentName, ownName ] = orbiter.split(')');

      const parent = orbiterList.find(o => o.name === parentName);
      if (parent) {
        orbiterList.push(new Orbiter(ownName, parent));
      } else {
        unusedOrbiters.push(orbiter);
      }
    });

    if (unusedOrbiters.length === orbiterMap.length) {
      throw new Error('Cannot find matches: ' + JSON.stringify(unusedOrbiters));
    }

    orbiterMap = unusedOrbiters;
  }

  const totalOrbits = orbiterList.reduce((acc: number, cur: Orbiter) => acc + cur.orbits, 0);

  return totalOrbits;
}
