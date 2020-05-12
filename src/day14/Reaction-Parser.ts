import { MaterialDraftList, MaterialList, Reactant, Reaction, Material, MaterialShoppingList } from './interfaces';

export class ReactionParser {
  private reactions: Reaction[];
  private materials: MaterialList[] = [];

  public constructor(input: string) {
    this.reactions = this.parseInput(input);
  }

  public solveForOre(): number {
    const fuel = this.materials.find(mat => mat.name === 'FUEL');
    const ore = this.materials.find(mat => mat.name === 'ORE');
    if (!fuel || !ore) {
      throw new Error('Cannot find FUEL or ORE');
    }

    let shoppingList: MaterialShoppingList[] = [{ material: fuel, amount: 1 }];

    while (shoppingList.some(reactant => reactant.material !== ore )) {
      const maxDistance = shoppingList
        .reduce((max, current) => current.material.distance > max
          ? current.material.distance
          : max
        , 0);

      const wantedMaterial = shoppingList
        .filter(reactant => reactant.material !== ore)
        .filter(reactant => reactant.material.distance === maxDistance)
        .pop();

      // .pop() doesn't actually remove the item from the array, wtf?
      shoppingList = shoppingList.filter(item => item !== wantedMaterial);

      if (!wantedMaterial) {
        throw new Error('This is really only for typescript guard purposes');
      }

      const addToShoppingList = (material: MaterialList, amount: number) => {
        const existsInShoppingList = shoppingList.find(reactant => reactant.material === material);
        if (existsInShoppingList) {
          existsInShoppingList.amount += amount;
        } else {
          shoppingList.push({ material, amount });
        }
      };

      const reactionToUse = this.reactions.find(reaction => reaction.produces.name === wantedMaterial.material.name);
      if (!reactionToUse) {
        throw new Error();
      }

      const reactionMultiplier = Math.ceil(wantedMaterial.amount / reactionToUse.produces.amount);
      reactionToUse.requires.forEach(reactant => {
        const materialList = this.materials.find(mat => mat.name === reactant.name);
        if (!materialList) {
          throw new Error();
        }

        addToShoppingList(materialList, reactant.amount * reactionMultiplier);
      });
    }

    if (shoppingList.length > 1 || shoppingList[0].material.name !== 'ORE') {
      throw new Error('Shopping failed');
    }

    return shoppingList[0].amount;
  }

  private parseInput(input: string): Reaction[] {
    const reactions: Reaction[] = [];
    const materialDraftList: MaterialDraftList[] = [];

    materialDraftList.push({ name: 'ORE', parents: [], children: [] });

    // Parsing the reactions into the reaction table
    input
      .trim()
      .split('\n')
      .map(row => row.trim())
      .forEach(row => {
        const [ reactantsString, productString ] = row.split('=>').map(part => part.trim());
        const reactants: Reactant[] = reactantsString
          .split(',')
          .map(reactant => reactant.trim())
          .map(reactant => {
            const [ amount, name ] = reactant.split(' ');
            return { amount: +amount, name };
          });
        const [ productAmount, productName ] = productString.split(' ');
        const product: Reactant = {
          amount: +productAmount,
          name: productName,
        };

        materialDraftList.push({
          name: product.name,
          parents: reactants.map(reactant => reactant.name),
          children : [],
        });
        reactions.push({ requires: reactants, produces: product });
      });

    // Parsing the materials found during parsing the reactions into a doubly linked list.
    // Part 1: find children for each material in an unlinked list
    materialDraftList.forEach(material => {
      material.children = materialDraftList
        .filter(mat => mat.parents.some(parent => parent === material.name))
        .map(mat => mat.name);
    });

    // Part 2: Create a doubly linked list with all the nodes that we need but no links yet
    this.materials = materialDraftList.map((material): MaterialList => ({
      name: material.name,
      parents: [],
      children: [],
      distance: 0,
    }));

    // Part 3: Fill all the links to the list
    this.materials.forEach(material => {
      const self = materialDraftList.find(mat => mat.name === material.name);
      if (!self) {
        throw new Error('Cannot find self');
      }
      material.children = self.children.map(child => {
        const childList = this.materials.find(mat => mat.name === child);
        if (childList === undefined) {
          console.error(self);
          throw new Error('Unable to find child');
        }

        return childList;
      });
      material.parents = self.parents.map(parent => {
        const parentList = this.materials.find(mat => mat.name === parent);
        if (parentList === undefined) {
          console.error(self);
          throw new Error('Unable to find parent');
        }

        return parentList;
      });
    });

    // Part 4: Calculate distance for each material in the linked list.
    // Start from ORE with distance = 0, for every other material the distance
    // is max(parents' distance) + 1
    const ore = this.materials.find(mat => mat.name === 'ORE');
    if (!ore) {
      throw new Error('Cannot find ORE');
    }

    const addDistance = (material: MaterialList, distance: number) => {
      material.distance = distance;
      material.children.forEach(child => addDistance(child, distance + 1 ));
    };

    addDistance(ore, 0);

    return reactions;
  }
}
