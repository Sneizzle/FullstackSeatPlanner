import postgres from 'postgres'
const sql = postgres({
    host                 : process.env.POSTGRES_HOST,            // Postgres ip address[s] or domain name[s]
    port                 : Number(process.env.POSTGRES_PORT),          // Postgres server port[s]
    database             : process.env.POSTGRES_DATABASE,            // Name of database to connect to
    username             : process.env.POSTGRES_USERNAME,            // Username of database user
    password             : process.env.POSTGRES_PASSWORD,            // Password of database user
  }) // will use psql environment variables


export default sql