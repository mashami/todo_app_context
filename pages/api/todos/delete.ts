import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!(req.method === "POST")) {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { id } = req.body;
    const todos = await prisma.todo.delete({
      where: {
        id,
      },
    });
    res
      .status(200)
      .json({ success: true, message: "Todo has been delete successfull" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch todos" });
  }
}
