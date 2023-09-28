import sql from "@/db";

export default async function handler(req, res) {
  // Get data submitted in request's body.
    const body = req.body;
    const id = req.query.id;


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
   
  case 'PUT':
    const dbUpdateResponse = await sql`
    UPDATE profiles
    SET
      markercoords = ${body.markercoords},
      location = ${body.location},
      team = ${body.team},
      name = ${body.name},
      checkbox = ${body.checkbox}
    WHERE id = ${id}
    returning *`;  
    res.status(200).json( dbUpdateResponse );
  break;
 
  case 'DELETE':
      const dbDeleteResponse = await sql`
      DELETE FROM profiles WHERE id = ${id}
      returning *`;
     
      res.status(200).json( dbDeleteResponse );
      
  break;




  default:
    return res.status(405);
    
  }



  // if (req.method === 'POST') {
  //   // Process a POST request
  // } else if (req.method ==='PATCH') {
    
  // } else if (reQ)
  

 

}
