
```tsx

function addTag(friend: Friend, ...tags: string[]) {
  friend.update({tags: {$add: tags}});
  // Eller:
  friend.update(friend => friend.tags.add(...tags));
}

function removeTag(friend: Friend, ...tags: string[]) {
  friend.update(friend => friend.tags.remove(...tags));
}

function addCar(friend: Friend, ...cars: Car[]) {
  friend.update(friend => friend.cars.add(...cars));
}

function removeCar(friend: Friend, ...carIds: string[]) {
  friend.update(friend =>
    friend.cars
      .where(car => car.id.anyOf(carIds))
      .remove());
}

```