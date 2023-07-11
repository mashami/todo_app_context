import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/Prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!(req.method === "POST")) {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { title } = req.body;
    const createdTodo = await prisma.todo.create({
      data: {
        title,
      },
    });

    res.status(201).json(createdTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create todo" });
  }
}
