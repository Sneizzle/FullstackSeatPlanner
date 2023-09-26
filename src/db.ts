import postgres from 'postgres'

const sql = postgres({
    host                 : 'localhost',            // Postgres ip address[s] or domain name[s]
    port                 : 5432,          // Postgres server port[s]
    database             : 'seatplandb',            // Name of database to connect to
    username             : 'postgres',            // Username of database user
    password             : '_testpassword123',            // Password of database user
  }) // will use psql environment variables
export default sql