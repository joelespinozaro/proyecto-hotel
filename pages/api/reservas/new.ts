import prisma from "../../../lib/prisma";

import { NextApiRequest, NextApiResponse } from "next";
// POST /api/post
// Required fields in body: name
// Optional fields in body: tag
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { idCliente, idRecepcionista,idHabitacion, fechaInicio,fechaFin } = req.body;

  const result = await prisma.reserva.create({
    data: {
        idCliente: idCliente,
        idHabitacion: idHabitacion,
        idRecepcionista: idRecepcionista,
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
    },
  });
  res.json(result);
}
