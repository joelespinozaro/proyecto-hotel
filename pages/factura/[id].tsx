import React, { useState } from "react";
import { jsPDF } from "jspdf";
import { Row } from "react-bootstrap";
import LoadingScreen from "../../components/LoadingScreen";
import { GetServerSideProps } from "next";
import prisma from "../../lib/prisma";
import { Reserva } from "../../features/types";
import Router from "next/router";

interface Factura {
  dias?: string;
  descripcion?: string;
  precio?: string;
}

type ReservaProps = {
  reserva: Reserva;
};

const FacturaComponent = ({ reserva }: ReservaProps) => {
  console.log(reserva, "alva");
  const [arrayFactura, setArrayFactura] = useState<Factura[]>([
    {
      dias: "1",
      descripcion:
        reserva.habitacion.numHabitacion +
        " HABITACIÓN " +
        reserva.habitacion.tipoHabitacion.toString(),
      precio: reserva.habitacion.precio.toString() + ".00",
    },
  ]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);
  const [factura, setFactura] = useState<Factura>();

  const emitirFactura = (e: any) => {
    e.preventDefault();
    let xTable = 25;
    let yTable = 127;
    setLoading(true);
    const doc = new jsPDF();
    doc.setFontSize(25);
    doc.setTextColor(220, 100, 0);
    doc.text("FACTURA", 87, 18);

    doc.setTextColor(10);
    doc.setFontSize(20);
    doc.addImage(
      "https://static.vecteezy.com/system/resources/thumbnails/000/612/192/small/Untitled-1_logo10-03-01.jpg",
      "JPEG",
      20,
      8,
      35,
      35
    );

    doc.setLineWidth(0.5);
    doc.line(20, 35, 60, 35);

    doc.setFontSize(10);
    doc.text(20, 40, "Direccion");
    doc.setFontSize(10);
    doc.text(20, 45, "Lima, Lima 1426");
    doc.setFontSize(10);
    doc.text(20, 50, "Teléfono:(+51) 973 111 434");
    doc.setFontSize(10);
    doc.text(
      20,
      55,
      `Número factura: ${
        Math.floor(Math.random() * (99999999 - 10000000)) + 10000000
      }`
    );
    doc.setFontSize(10);
    doc.text(20, 60, "atencionvip@hotelcabezas.com");

    doc.setLineWidth(0.5);
    doc.line(20, 62, 60, 62);

    doc.setLineWidth(0.5);
    doc.line(140, 35, 140, 62);

    doc.setFontSize(10);
    doc.text(145, 40, `Fecha: 24/07/2021`);
    doc.setFontSize(10);
    doc.text(145, 45, "Factura :# 00001");
    doc.setFontSize(10);
    doc.text(145, 50, `Código reserva: ${reserva.id.substring(1, 8)}`);
    doc.setLineWidth(0.7);
    doc.line(200, 35, 200, 62);

    doc.setLineWidth(1.5);
    doc.line(20, 68, 200, 68);

    doc.setDrawColor(0);
    doc.setLineWidth(0.9);
    doc.setFillColor(255, 204, 153);
    doc.roundedRect(20, 75, 180, 10, 3, 3, "FD");

    doc.setTextColor(0);
    doc.setLineWidth(0.5);
    doc.text(
      25,
      81,
      `Factura para: ${reserva.cliente.nombres} ${reserva.cliente.apellidos}`
    );

    doc.setDrawColor(0);
    doc.setFillColor(245, 231, 253);
    doc.rect(20, 88, 180, 30, "FD");
    doc.setLineWidth(0.5);
    doc.setTextColor(0);
    doc.text(
      25,
      95,
      `Contacto de la empresa: ${reserva.cliente.nombres} ${reserva.cliente.apellidos}`
    );
    doc.text(25, 100, "Nombre de la empresa: -");
    doc.text(25, 105, "Dirección: -");
    doc.text(25, 110, `Correo Electrónico: ${reserva.cliente.email}`);
    doc.text(25, 115, `Número: ${reserva.cliente.numDoc} `);

    doc.setDrawColor(0);
    doc.setFillColor(255, 204, 153);
    doc.rect(20, 119, 180, 10, "FD");
    doc.text(25, 125, "Cantidad");
    doc.text(100, 125, "Descripción");
    doc.text(179, 125, "Importe");

    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.rect(20, 129, 180, 100, "FD");

    // doc.text(xTable, yTable, `Pagos: ${arrayFactura.length}`)

    arrayFactura.forEach((x) => {
      yTable = yTable + 10;
      doc.text(x.dias, xTable, yTable);
      xTable = xTable + 75;
      doc.text(x.descripcion, xTable, yTable);
      xTable = xTable + 80;
      doc.text(x.precio, xTable, yTable);
      xTable = 25;
    });
    doc.setDrawColor(0);
    doc.setFillColor(245, 231, 253);
    doc.rect(20, 229, 90, 30, "FD");
    doc.setLineWidth(0.5);
    doc.setTextColor(0);
    doc.text(25, 236, "OBERVACIONES:");

    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.rect(165, 229, 35, 10, "FD");
    doc.setLineWidth(0.5);
    doc.setTextColor(0);
    xTable = 145;
    yTable = 235;
    doc.text(xTable, yTable, `Subtotal:`);
    xTable = 175;
    doc.text(
      xTable,
      yTable,
      `${Math.round(reserva.habitacion.precio * 0.82 * 100) / 100}`
    );
    doc.setFillColor(255, 255, 255);
    doc.rect(165, 239, 35, 10, "FD");
    xTable = 145;
    yTable = 245;
    doc.text(xTable, yTable, `18% IGV:`);
    xTable = 175;
    doc.text(
      xTable,
      yTable,
      `${Math.round(reserva.habitacion.precio * 0.18 * 100) / 100}`
    );

    doc.setDrawColor(0);
    doc.setFillColor(255, 204, 153);
    doc.rect(165, 249, 35, 20, "FD");
    doc.setLineWidth(0.5);
    doc.setTextColor(0);

    xTable = 145;
    yTable = 260;
    doc.text(xTable, yTable, `TOTAL: `);

    xTable = 175;
    yTable = 260;
    doc.text(xTable, yTable, `${reserva.habitacion.precio}.00`);

    doc.setLineWidth(1.5);
    doc.line(20, 269, 200, 269);

    doc.save("factura.pdf");
    setLoading(false);
    Router.push(`/reservas`);
  };

  return (
    <Row className="mt-4 d-flex justify-content-center">
      {loading && <LoadingScreen></LoadingScreen>}
      <form className="">
        <button
          className="btn btn-outline-primary"
          onClick={(e) => emitirFactura(e)}
        >
          Emitir factura
        </button>
      </form>
    </Row>
  );
};

export default FacturaComponent;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const reserva = await prisma.reserva.findUnique({
    select: {
      id: true,
      cliente: true,
      recepcionista: true,
      habitacion: true,
      fechaInicio: true,
      fechaFin: true,
      estado: true,
    },
    where: {
      id: String(query?.id),
    },
  });
  await prisma.reserva.update({
    data: {
      estado: true,
    },
    where: {
      id: String(query?.id),
    },
  });
  await prisma.habitacion.update({
    data: {
      estado: true,
    },
    where: {
      id: reserva.habitacion.id,
    },
  });
  return {
    props: {
      reserva,
    },
  };
};
