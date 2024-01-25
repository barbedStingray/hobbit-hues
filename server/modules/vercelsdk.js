
import { sql } from '@vercel/postgres';


function populateDB() {
    console.log(`exporting your database`);

    // user table
    sql`CREATE TABLE "user" (
        "id" SERIAL PRIMARY KEY,
        "username" VARCHAR (80) UNIQUE NOT NULL,
        "password" VARCHAR (1000) NOT NULL
    );`;

    // paints
    sql`CREATE TABLE "paints" (
        "id" SERIAL PRIMARY KEY,
        "paint" VARCHAR (40),
        "hexcode" VARCHAR (20)
    );`;

    // techniques
    sql`CREATE TABLE "techniques" (
        "id" SERIAL PRIMARY KEY,
        "technique" VARCHAR (40)
    );`;

    // projects
    sql`CREATE TABLE "projects" (
        "id" SERIAL PRIMARY KEY,
        "user_id" integer REFERENCES "user",
        "model" VARCHAR (80),
        "primary" VARCHAR (25),
        "description" VARCHAR (600),
        "picture" VARCHAR (300),
        "public" boolean default false
    );`;

    // projecrts-paints
    sql`CREATE TABLE "projects_paints" (
        "id" SERIAL PRIMARY KEY,
        "project_id" integer REFERENCES "projects",
        "paint_id" integer REFERENCES "paints",
        "technique_id" integer REFERENCES "techniques",
        "photo" VARCHAR (300),
        "notes" VARCHAR (50)
    );`;
    
    console.log(`end of db list vercel sdk`);
 }

async function readFromUsers() {
    console.log('reading users');

    const { rows, fields } = await sql`SELECT * FROM "user";`;

    console.log(`read the users`, { rows, fields });
    // return { rows, fields };


 }

//  import { sql } from '@vercel/postgres';
 
async function handler(
  request,
  response
) {
  try {
    const result = 
      await sql`CREATE TABLE "user" (
        "id" SERIAL PRIMARY KEY,
        "username" VARCHAR (80) UNIQUE NOT NULL,
        "password" VARCHAR (1000) NOT NULL
    );`;

    return response.status(200).json({ result });
  } catch (error) {
    return response.status(500).json({ error });
  }
}

// module.exports = handler;

 

 
