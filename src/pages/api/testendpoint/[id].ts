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
console.log(req.query.id)

    switch (rm) {
   
  case 'PUT':
    const dbUpdateResponse = await sql`
    UPDATE profiles
    SET
      markercoords = ${body.markerCoords},
      location = ${body.location},
      team = ${body.team},
      name = ${body.name},
      checkbox = ${body.checkbox}
    WHERE id = ${id}
    returning *`;  
  break;
 
  case 'DELETE':
      const dbDeleteResponse = await sql`
      DELETE FROM profiles WHERE id = ${id}
      returning *`;
     
      res.status(200).json( dbDeleteResponse );
      console.log("deletelog message")
  break;




  default:
    console.log("something went wrong.")
  }



  // if (req.method === 'POST') {
  //   // Process a POST request
  // } else if (req.method ==='PATCH') {
    
  // } else if (reQ)
  

 

}
