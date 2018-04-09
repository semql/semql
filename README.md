# semql

WIP: Creating a generic specification for a javascript based query language, similar to Mango or SQL.

The idea is to create a generic dexie-like query language that could be used by any other ORM, API or database. I will begin with creating some code for interpreting queries and converting them into a canonical javascript object format. From there, these objects can be further translated into mango-, SQL- or dexie-core (part of dexie 4.0) queries.

SemQL is not meant to replace REST or GraphQL, as these protocols targets API:s. SemQL is rather a database query language.

