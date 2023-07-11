import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { id, ...others } = req.body;
    console.log("my body ===>", req.body);

    const todos = await prisma.todo.update({
      where: { id },
      data: { ...others },
    });
    res
      .status(200)
      .json({ success: true, message: "Todo has been updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update todo" });
  }
}
