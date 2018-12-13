
# Application Database
Jag förnimmer ett skifte i applikationsutveckling.
Stenålderstänket kommer vara att databasen är separerad från applikationen med API emellan. Det är den idag rådande arkitekturen.

Idag existerar inte begreppet "Application Database" som sådant. Uttrycket kan användas i samband med specifika produkter etc, men inte som databaskategori. Finner inte någonting på wikipedia.

I framtiden tror jag att man kommer man eftersöka produkter som inte är rena databaser utan kategoriserar sig som Application Databases.

Fördelarna är enorma:
1. agilare applikationsutveckling
2. betydligt mindre kod i applikationen och mindre komplexa applikationer ökar möjligheten att utveckla funktioner som annars inte hade hunnits med
3. lägre kompetens krävs för att bygga applikationer


## Övergripande funktionalitet
Några features som Application Databases måste ha:

* Främsta aktören är applikationsutvecklaren och gränssnittet mot databasen skall därför ha funktioner som behövs när man utvecklar en applikation.
* Databasgränssnittet ersätter API:et:
   Traditionel arkitektur:
      KlientApp --> API --> DB
   Applikationsdatabas:
      KlientApp --> DB

## Främsta funktion
* Inbyggd åtkomstkontroll

## Överiga funktioner
* Klienten välintegrerad direkt i GUI ramverken
* Paging stöd
* Nativt object-relational mapping stöd

# Dreambase

Dreambase kommer kategoriseras som en application database.
