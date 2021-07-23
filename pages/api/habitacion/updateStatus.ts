import prisma from "../../../lib/prisma";

import { NextApiRequest, NextApiResponse } from "next";
// POST /api/post
// Required fields in body: name
// Optional fields in body: tag
export default async function handle(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { estado, id } = req.body;

    const result = await prisma.habitacion.update({
        data: {
            estado: estado
        },
        where: {
            id: id,
        },
    });
    res.json(result);
}
