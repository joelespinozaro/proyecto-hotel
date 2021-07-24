import prisma from "../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
// POST /api/post
// Required fields in body: shortText
// Optional fields in body: longText
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id, nombres, apellidos, email, telefono, sexo, numDoc, tipoDoc } =
    req.body;

  if (req.method === "GET") {
    const operInstalacions = await prisma.cliente.findMany();
    res.json(operInstalacions);
  } else if (req.method === "POST") {
    const created = await prisma.cliente.create({
      data: {
        nombres,
        apellidos,
        email,
        telefono,
        sexo,
        numDoc,
        tipoDocumento: tipoDoc,
      },
    });
    res.json(created);
  } else if (req.method === "PATCH") {
    const updated = await prisma.cliente.update({
      data: {
        nombres,
        apellidos,
        email,
        telefono,
        sexo,
        numDoc,
        tipoDocumento: tipoDoc,
      },
      where: {
        id: id,
      },
    });
    res.json(updated);
  } else if (req.method === "DELETE") {
    const { id } = req.query;
    const deleted = await prisma.cliente.delete({
      where: {
        id: id.toString(),
      },
    });
    res.json(deleted);
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
