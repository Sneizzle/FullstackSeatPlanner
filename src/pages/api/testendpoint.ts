import sql from "@/db";

export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body;



  // Optional logging to see the responses
  // in the command line where next.js app is running.


  // Guard clause checks for first and last name,
  // and returns early if they are not found
  // if (!body.first) {
  //   // Sends a HTTP bad request error code
  //   return res.status(400).json({ data: "First or last name not found" });
  // }

const rm = req.method;

    switch (rm) {
    case 'POST':
        const dbPostResponse = await sql`
        INSERT INTO profiles (markerCoords, location, team, name, checkbox)
        values (${body.markerCoords},${body.location},${body.team},${body.name},${body.checkbox})
        returning *
      `;
      
      return res.status(200).json( dbPostResponse );
 
  case 'GET':
      const dbGetResponse = await sql`
      SELECT * FROM profiles`;
    
    res.status(200).json( dbGetResponse );
    
  break;
  



  default:
    console.log("something went wrong.")
  }



  // if (req.method === 'POST') {
  //   // Process a POST request
  // } else if (req.method ==='PATCH') {
    
  // } else if (reQ)
  

 

}
