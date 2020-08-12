

## onReady()

* Synca

## Periodisk sync:

1. Hämta lastSyncTimestamp
2. Kontrollera om någon annan gör sync samtidigt. I så fall, vänta tills den där andra är klar och köa upp en sync. Persistent kontroll! Pollning! Progress: queueing sync operation...
   Eller ska vi göra en service worker?
   Ja, vi gör en service worker!
2. För varje tabell:
  1. Hämta dess _changes.
  2. Skicka upp allting till servern.
  3. Få hela svar från servern och gör bulkPut (raw utan registrering)
  4. dess _changes.clear()
3. Uppdatera lastSyncTimestamp (både klient och server) och släpp den persistenta semaphoren.

## dist folder

1. dexiebase-addon.js
2. dexiebase-sw.js

