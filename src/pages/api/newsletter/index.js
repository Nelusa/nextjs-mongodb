import { connectDatabase, insertDocument } from "@/helpers/db-util";

/* export const buildNewsletterPath = () => {
  return path.join(process.cwd(), "src", "data", "newsletter.json");
};

export const extractNewsletter = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}; */

export default async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address" });
      return;
    }

    const registeredEmail = {
      id: new Date().toISOString(),
      email: userEmail,
    };

    let client;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return; //aby se zde funkce zastavila
    }

    try {
      await insertDocument(client, "newsletter", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    console.log(registeredEmail);
    res.status(201).json({ message: "Success registration!" }); //added data successfully
  }
}
