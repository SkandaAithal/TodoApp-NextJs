// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../../lib/connectDb";
import todosCollection from "../../../model/todosModel";

type Data = {
  success: boolean;
  result?: any;
  error?: Error;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  try {
    if (req.method === "POST") {
      const { name, completed } = req.body;
      if (!name) {
        throw new Error("Invalid Input");
      } else {
        const todo = await todosCollection.create({ name, completed });
        res.status(200).json({ success: true, result: todo });
      }
    } else if (req.method === "GET") {
      const allTodos = await todosCollection.find();
      res.status(200).json({ success: true, result: allTodos });
    }
  } catch (error) {
    res.status(400).json({ success: false, error: error as Error });
  }
}
