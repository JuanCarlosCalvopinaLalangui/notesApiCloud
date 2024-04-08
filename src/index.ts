import express, { Request, Response } from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3030;
const prisma = new PrismaClient();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(cors());

// Define your routes here
app.get("/api/notes", async (req: Request, res: Response) => {
  // Logic to fetch all notes from the database
  // and send the response back as a json object
  console.log("Fetching all notes from the database");
  const notes = await prisma.note.findMany();
  res.status(200).json(notes);
});

app.post("/api/notes", async (req: Request, res: Response) => {
  // Logic to create a new note in the database
  // based on the request body and send the response
  console.log("Creating a new note in the database");
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }
  try {
    const note = await prisma.note.create({ data: { title, content } });
    res.status(201).json(note);
  } catch (e) {
    res.status(500).json({ error: "Oops ! Something went wrong." });
  }
});

app.put("/api/notes/:id", async (req: Request, res: Response) => {
  // Logic to update a note in the database
  // based on the request body and send the response
  const { title, content } = req.body;
  const id = parseInt(req.params.id);

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content is required" });
  }

  if (!id || isNaN(id)) {
    return res
      .status(400)
      .json({ error: "Note id is required and must be valid number" });
  }
  try {
    const updateNote = await prisma.note.update({
      where: { id },
      data: { title, content },
    });
    res.status(200).json(updateNote);
  } catch (e) {
    res.status(500).json({ error: "Oops ! Something went wrong." });
  }
});

app.delete("/api/notes/:id", async (req: Request, res: Response) => {
  // Logic to delete a note from the database
  // based on the request parameters and send the response
  const id = parseInt(req.params.id);
  if (!id || isNaN(id)) {
    return res
      .status(400)
      .json({ error: "Note id is required and must be valid number" });
  }
  try {
    await prisma.note.delete({ where: { id } });
    res.status(204).end();
  } catch (e) {
    res.status(500).json({ error: "Oops ! Something went wrong." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
