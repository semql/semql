import { Collection } from "./collection";

export interface GeoLocation {
  long: number;
  lat: number;
}

export interface Range<T> {
  rangeStart: T;
  rangeEnd: T;
}

export interface Reference<T> {
  load(): Promise<T>;
}

export interface TreeNode<T> {
  treePath: string;
  treeDepth: number;
  descendants: TreeNode<T>;
  children: Collection<T>;
  parent: T;
  ancestors: Collection<T>;
}


// Exempel användning:

interface Task extends TreeNode<Task> {
  id: string;
  name: string;
}
