import Router from "next/router";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { Habitacion } from "../../features/types";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import ItemContainer from "../../features/common/ItemContainer";
import CardItem from "../../features/common/CardItem";
import { TrashIcon } from "@heroicons/react/outline";
import LinkEditItem from "../../features/common/LinkEditItem";
import ClientAPI from "../../features/api/client";
import Breadcrumbs from "../../components/BBreadCrumbs";
import Link from "next/link";

type HabitacionProps = {
  habitacion: Habitacion[];
};

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Habitacion", href: "/habitacion", current: true },
];

export default function Habitaciones({ habitacion }: HabitacionProps) {
  const handleTrashClick = async (id: string) => {
    if (window.confirm("Do you want to delete this record?")) {
      try {
        const body = { id };
        const result = await fetch(`/api/habitacion/delete`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        Router.push(`/habitacion`);
      } catch (error) {
        console.error(error);
      }
    }
  };

  console.log(habitacion);
  return (
    <>
      <Row>
        <Col className="mt-4">
          <Breadcrumbs navigation={navigation} />
          <div className="my-4 d-flex justify-content-between align-items-center">
            <h4>Lista de Habitaciones</h4>
            <Link href="/habitacion/new" passHref>
              <Button>Nuevo</Button>
            </Link>
          </div>
        </Col>
      </Row>
      <ListGroup>
        {habitacion.map((c) => (
          <ItemContainer key={c.id}>
            <Col md={3}>
              <CardItem title="Nro de Habitacion" value={c.numHabitacion} />
            </Col>
            <Col md={3}>
              <CardItem title="Precio" value={c.precio} />
            </Col>
            <Col md={3}>
              <CardItem title="Tipo" value={c.tipoHabitacion} />
            </Col>
            <Col md={3} className="d-flex flex-row justify-content-end">
              <div className="mx-2">
                <LinkEditItem url={`/habitacion/${c.id}`} />
              </div>
              <div className="mx-2">
                <TrashIcon
                  height={20}
                  color="red"
                  onClick={() => handleTrashClick(c.id)}
                  cursor="pointer"
                />
              </div>
            </Col>
          </ItemContainer>
        ))}
      </ListGroup>
    </>
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
