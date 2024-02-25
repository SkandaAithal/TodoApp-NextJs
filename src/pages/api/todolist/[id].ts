import type { NextApiRequest, NextApiResponse } from "next";
import todosCollection from "../../../model/todosModel";
import dbConnect from "@/lib/connectDb";

type Data = {
  success: boolean;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await dbConnect();
  const { id } = req.query;
  if (req.method === "GET") {
    await todosCollection.findByIdAndDelete({ _id: id });

    res.status(200).json({ success: true });
  } else if (req.method === "PUT") {
    const updateOperation = {
      $set: {
        completed: true,
      },
    };
    await todosCollection.findOneAndUpdate({ _id: id }, updateOperation);
    res.status(200).json({ success: true });
  }
}
