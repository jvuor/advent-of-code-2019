import { Orbiter } from './Orbiter';

function getOrbitalMap(map: string): Orbiter[] {
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

  return orbiterList;
}

function getParentList(orbiter: Orbiter): Orbiter[] {
  const parents = [];
  let foundAll = false;
  let pointer = orbiter;
  while (!foundAll) {
    const nextParent = pointer.parent as Orbiter;
    parents.push(nextParent);
    pointer = nextParent;
    if (nextParent && nextParent.name === 'COM') {
      foundAll = true;
    }
  }
  return parents;
}

export function parseMap(map: string): number {
  return getOrbitalMap(map)
    .reduce((acc: number, cur: Orbiter) => acc + cur.orbits, 0);
}

export function solveDistance(map: string, orbiter1Name: string, orbiter2Name: string): number {
  const orbitalMap = getOrbitalMap(map);
  const orbiter1 = orbitalMap.find(o => o.name === orbiter1Name);
  const orbiter2 = orbitalMap.find(o => o.name === orbiter2Name);
  if (!orbiter1 || !orbiter2) {
    throw new Error('Cannot find orbiter');
  }

  const orbiter1Parents = getParentList(orbiter1);
  const orbiter2Parents = getParentList(orbiter2);
  let nearestParent: Orbiter | null = null;
  for (let i = 0; i < orbiter1Parents.length; i++) {
    const testParent = orbiter1Parents[i];
    const isCommon = orbiter2Parents.find(o => o === testParent);
    if (isCommon) {
      nearestParent = testParent;
      break;
    }
  }
  if (nearestParent === null) {
    throw new Error('Can\'t find a common parent');
  }

  return (orbiter1.orbits - nearestParent.orbits - 1) + (orbiter2.orbits - nearestParent.orbits - 1);
}
