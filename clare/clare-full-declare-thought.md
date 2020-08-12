
```tsx

export class Course {
  name: string
  // Ren subtree relation:
  get courseBlocks() { return this.db.courseBlocks.where(cb => cb.courseId === this.id) }
  // Typisk graf:
  get similarCourses() { return this.db._edges
    .where(({from, label, to}) => from === this.id && label === 'similarCourses')
    .flatSwitchMap(edge => this.db.courses.where(c => c.id === edge.to))
  }
}

export function accessControl (db) {
  return acls => ({
    courses: db.courses.where(c => c.acl.anyOf(acls))
  });
}

// Eller mindre verbost interface

export interface Course {
  type: "course"
  name: MaxLengthString<1000>
  text: FullText
  courseBlocks: Children<CourseBlock>
  similarCourses: Graph<Course, {similarity: number}>
}

export interface CourseBlock {
  type: "course-block"
  course: Parent<Course>
}

// Tänka traditionellt...

interface Order {
  customer: Reference<Customer>
  product: Reference<Product>
  quantity: number
  comments: string
}

interface Product {
  orders: ReverseReference<Order, "product">
}

export interface Database {
  courses: MutableCollection<Course>
  courseBlocks: MutableCollection<CourseBlock>
})

db.courses.find(searchString)
db.courses.where(c => c._fullTextWords.some(word => word.anyOf(searchWords)))

```
