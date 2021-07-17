import prisma from "../../../lib/prisma";

import { NextApiRequest, NextApiResponse } from "next";
// POST /api/post
// Required fields in body: name
// Optional fields in body: tag
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { numeroHabitacion, tipoHabitacion, precio } = req.body;

  const result = await prisma.habitacion.create({
    data: {
      numHabitacion: numeroHabitacion,
      tipoHabitacion: tipoHabitacion,
      precio: parseFloat(precio),
    },
  });
  res.json(result);
}
