import "dotenv/config";
import sql from './db';

console.log(process.env.POSTGRES_USERNAME);

(async ()=>{
    await sql`
CREATE TABLE IF NOT EXISTS profiles (
    markercoords numeric[][] NOT NULL,
    location text NOT NULL,
    team text DEFAULT NULL,
    name text NOT NULL,
    checkbox boolean NOT NULL,
    id serial NOT NULL PRIMARY KEY);
`;




// await sql insert etc





console.log("immediately invoked async function expression")
console.log("done. bruh")})();