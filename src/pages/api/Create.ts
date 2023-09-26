import sql from "@/db";








export default async function handler(req, res) {
  // Get data submitted in request's body.
  const body = req.body;

  // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log("body: ", body);

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.first) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: "First or last name not found" });
  }

  const xs = await sql`
  insert into Profiles (name)
  values (${body.first})

  returning *
`;

res.status(200).json({ data: `${xs.name}` });
}
