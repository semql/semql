import {Collection} from './semql';

interface Friend {
  name: string;
  age: number;
  parent: Friend;
}

var x = null as any as Collection<Friend>;
//x.where(f => f.name)
x.where(f => f.name.startsWith("apa"));
x.where(f => f.name.startsWith("Apa")).where(f => f.name.startsWith("Ulla"));
x.where(f => f.parent.age.above(50).and(f => f.parent.name.endsWith("Ola")));
//x.where(f => f.age.between(1, 2).or(f => f.name.startsWith("")))
//x.where(f => f.age.)
// name.startsWith("A") AND age < 7.
// name startsWith("A") OR age < 7
// (name.startsWith("A") or age < 7) and (name.endsWith("Z"))
x.where(f => (
    f.name.startsWith("A").or(
      f => f.age.below(7))
  ).and(
    f => f.name.endsWith("Z")
  )
).toArray();

/*let a, b, c;
a b c;*/
