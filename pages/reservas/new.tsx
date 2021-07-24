import Router, { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { Button, Col, Form, Row, Spinner, Card } from "react-bootstrap";
import Breadcrumbs from "../../components/BBreadCrumbs";
import prisma from "../../lib/prisma";
import { Habitacion, Cliente } from "../../features/types";
import { GetServerSideProps } from "next";
import Link from "next/link";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Reservas", href: "/reservas", current: false },
  { name: "New Reserva", href: "", current: true },
];
type ReservaProps = {
  habitacion: Habitacion[];
  clients: Cliente;
};
export default function ReservasPage({ habitacion, clients }) {
  const getDescription = (tipo) => {
    switch (tipo) {
      case "SIMPLE":
        return "Nuestras habitaciones simples son cómodas, equipadas con camas queen size para su entera satisfacción con maravillosa vista panorámica de la bahía. Playa de estacionamiento para 20 vehículos. Incluye desayuno buffet.";
      case "DOBLE":
        return "Nuestras habitaciones Dobles son Cómodas y espaciosas con 2 camas Queen size para su entera con maravillosa vista panorámica de la bahía. Playa de estacionamiento para 20 vehículos. Incluye desayuno buffet.";
      case "MATRIMONIAL":
        return "Nuestras habitaciones matrimoniales son Cómodas y espaciosas con camas Queen size para su entera satisfacción con maravillosa vista panorámica de la bahía.Playa de estacionamiento para 20 vehículos.Incluye desayuno buffet.";
      default:
        break;
    }
  };

  const getImage = (tipo) => {
    switch (tipo) {
      case "SIMPLE":
        return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/6d/6b/1d/casa-andina-premium-san.jpg?w=1400&h=-1&s=1";
      case "DOBLE":
        return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/97/35/59/disfruta-de-una-experiencia.jpg?w=1400&h=-1&s=1";
      case "MATRIMONIAL":
        return "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1b/6d/6b/0c/casa-andina-premium-san.jpg?w=1400&h=-1&s=1";
      default:
        break;
    }
  };

  return (
    <div className="mt-4">
      <Breadcrumbs navigation={navigation} />
      <div className="container">
        <h1 className="textHeader">Generar nueva reserva</h1>
        <div>
          <Row>
            {habitacion.map((item, index) => {
              return (
                <Col
                  key={index}
                  md={4}
                  className={`mt-5 ${!item.estado ? "disabled" : ""}`}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Card style={{ width: "18rem" }}>
                    <Card.Img
                      variant="top"
                      src={getImage(item.tipoHabitacion)}
                    />
                    <Card.Body>
                      <Card.Title>
                        Habitacion Nro {item.numHabitacion}
                      </Card.Title>
                      <Card.Text
                        className="font-weight-bold"
                        style={{ fontSize: 12 }}
                      >
                        Tipo : {item.tipoHabitacion} <br></br>
                        S/ Precio : {item.precio}
                        <br></br>
                        <i className="text-justify font-weight-normal">
                          {getDescription(item.tipoHabitacion)}
                        </i>
                      </Card.Text>
                      <Link
                        as={`/reservas/${item.id}`}
                        href="/reservas/[id]"
                        passHref
                      >
                        <Button variant="primary">Generar Reserva</Button>
                      </Link>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Call an external API endpoint to get habitaciones
  const habitacion = await prisma.habitacion.findMany();

  return {
    props: {
      habitacion,
    },
  };
};
