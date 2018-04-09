import { Collection } from "./collection";
import { Range, TreeNode, Reference } from "./datatypes";

export type DataType<T> = 
  T extends string ? "string" :
  T extends number ? "number" :
  T extends boolean ? "boolean" :
  T extends Date ? "date" :
  T extends ArrayBufferLike ? "binary" :
  T extends DataView ? "binary" :
  T extends ArrayBufferView ? "binary" :
  T extends ArrayLike<any> ? "array" :
  T extends Collection<any> ? "collection" :
  T extends Range<any> ? "range" :
  T extends TreeNode<any> ? "treenode" :
  T extends Reference<any> ? "reference" :
  "any";


  interface OperatorsByType {
    string: "equals" | "startsWith" | "endsWith" | "equalsIgnoreCase",
    number: "above" | "below"
  }

  