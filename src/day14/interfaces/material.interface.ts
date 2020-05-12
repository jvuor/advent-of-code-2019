export type Material = string;

export interface MaterialDraftList {
  name: Material;
  parents: Material[];
  children: Material[];
}

export interface MaterialList {
  name: string;
  distance: number;
  parents: MaterialList[];
  children: MaterialList[];
}

export interface MaterialShoppingList {
  material: MaterialList;
  amount: number;
}
