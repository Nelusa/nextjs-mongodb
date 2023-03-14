import {
  connectDatabase,
  getAllDocuments,
  insertDocument,
} from "@/helpers/db-util";

/* export const buildCommentPath = () => {
  return path.join(process.cwd(), "src", "data", "comments.json");
};

export const extractComment = (filePath) => {
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  return data;
}; */

export default async function handler(req, res) {
  const eventId = req.query.eventId;

  let client;
  try {
    client = await connectDatabase();
  } catch (error) {
    res.status(500).json({ message: "Connecting to the database failed!" });
    return; //aby se zde funkce zastavila (a neukončujeme spojení, protože jsme jej ani nenavázali)
  }

  if (req.method === "POST") {
    const email = req.body.email;
    const name = req.body.name;
    const comment = req.body.text;

    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !comment ||
      comment.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input!" });
      client.close();
      return;
    }

    const newComment = {
      eventId,
      email: email,
      name: name,
      text: comment,
    };

    console.log(newComment);

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId; //máme unikátní ID, které nám MongoDB vrátí automaticky --> můžeme ho nastavit do našeho "newComment.id"

      res.status(201).json({ message: "Added comment", comments: newComment }); //added data successfully
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
    }

    console.log(result);
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(
        client,
        "comments",
        { _id: -1 },
        { eventId: eventId } //filtrování, abychom zajistili, že se fetchují komentáře pouze pro konkrétní event
      );
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed" });
    }
  }

  client.close(); //nepřidáváme return do předchozího catch bloku, abychom se ujistili, že vždycky uzavřeme připojení k databázi
}
