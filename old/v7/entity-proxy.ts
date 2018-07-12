import { CustomOperators } from "./custom-operators";
import { SemqlOperators } from "./symbols";
import { StringOperators } from "./string-operators";
import { StandardOperators } from "./standard-operators";
import { BooleanOperators } from "./boolean-operators";
import { DateOperators } from "./date-operators";
import { PrimitiveType } from "./primitive-type";
import { SequenceOperators } from "./sequence-operators";
import { SetOperators } from "./set-operators";
import { CollectionOperators } from "./collection-operators";

export type EntityProxy<T, TEntity=T> =
  T extends string ? StringOperators<TEntity> :
  T extends number ? StandardOperators<T, TEntity> :
  T extends boolean ? BooleanOperators<TEntity> :
  T extends Date ? DateOperators<TEntity> :
  T extends ArrayBufferLike ? SequenceOperators<T, TEntity> :
  T extends ArrayBufferView ? SequenceOperators<T, TEntity> :
  T extends ReadonlyArray<number | null | undefined> ? SequenceOperators<T, TEntity> & SetOperators<T[number], TEntity> :
  T extends ReadonlyArray<string | ArrayBuffer | ArrayBufferView | undefined | null> ?
    StandardOperators<T, TEntity> & SetOperators<T[number], TEntity> :
  T extends Set<PrimitiveType> ? T extends Set<infer U> ? SetOperators<U, TEntity> : never :
  T extends ReadonlyArray<any> ? CollectionOperators<T[number], TEntity> :
  T extends {[SemqlOperators]?: any} ?
    CustomOperators<ReturnType<T[typeof SemqlOperators]>, T, TEntity> & {[P in keyof T]: EntityProxy<T[P], TEntity>} :
  {[P in keyof T]: EntityProxy<T[P], TEntity>};

// TODO: Fundera på:
// class Friend { tags: string[], cars: Car[] }
// friend.tags.includes("apa") OK!
// friend.cars.includes(new Car("Volvo", "v70"))? Inte OK?

// Också: Lägg till Collection i EntityProxy checkarna
// Också: Lägg till Reference i EntityProxy checkarna

// Sedan: Skapa proxy för orderBy

