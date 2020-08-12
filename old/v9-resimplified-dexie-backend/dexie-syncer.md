
## Client
```ts

import Dexie from 'dexie';
import { createSyncer } from 'dexie-syncer';

const syncer = createSyncer('https://fl9ejfmf.dexiesyncer.com', {
  
  async loadAuthToken () {
    const requestedUser = prompt("Who do you wanna be?");
    const res = await fetch(`/api/token?requestedUser=${encodeURIComponent(requestedUser)}`);
    return await res.json();
  }
  
});

const db = new Dexie('todoItems', {addons: [syncer, dexieSyncable]});
db.version(1).stores({
  todoItems: `id,name,descriptions,listId`,
  todoLists: `id,name`
});

const allData = await db.todoLists.with({todoItems: 'todoItems'});
console.log(allData);

```

## Server
```ts
import express from 'express';

const CLIENT_ID = "fo8f8efjfe";
const CLIENT_SECRET = "fds8fyhoinwkl,iejfo8sdhkis,";

express.serve(async (req, res) => {
  if (req.path === '/api/token') {
    const {requestedUser} = req.params;
    const claims = JSON.stringify({
      sub: requestedUser
    });
    const jsonRes = await fetch(`https://dexiesyncer.com/fl9ejfmf/token?claims=${encodeURIComponent(claims)}`, {
      headers: {
        Authorization: `Basic ${base64Encode(`${CLIENT_ID}:${CLIENT_SECRET}`)}`
      }
    });
    const data = await jsonRes.json();
    return data;
  }
});

```