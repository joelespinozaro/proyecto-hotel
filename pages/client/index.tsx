import Router from "next/router";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { Cliente } from "../../features/types";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import ItemContainer from "../../features/common/ItemContainer";
import CardItem from "../../features/common/CardItem";
import { TrashIcon } from "@heroicons/react/outline";
import LinkEditItem from "../../features/common/LinkEditItem";
import ClientAPI from "../../features/api/client";
import Breadcrumbs from "../../features/common/Breadcrumbs";
import Link from "next/link";

type ClientProps = {
  clients: Cliente[];
};

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Client", href: "/client", current: true },
];

export default function Client({ clients }: ClientProps) {
  const handleTrashClick = async (id: string) => {
    if (window.confirm("Do you want to delete this record?")) {
      const { status } = await ClientAPI.delete(id);

      if (status !== 200) {
        console.error(status.toString);
      } else {
        Router.push(`/client`);
      }
    }
  };

  return (
    <>
      <Row>
        <Col className="mt-4">
          <Breadcrumbs navigation={navigation} />
          <div className="my-4 d-flex justify-content-between align-items-center">
            <h4>Lista de clientes</h4>
            <Link href="/client/new" passHref>
              <Button>New Client</Button>
            </Link>
          </div>
        </Col>
      </Row>
      <ListGroup>
        {clients.map((c) => (
          <ItemContainer key={c.id}>
            <Col md={2}>
              <CardItem title="Nombres" value={c.nombres} />
            </Col>
            <Col md={2}>
              <CardItem title="Apellidos" value={c.apellidos} />
            </Col>
            <Col md={2}>
              <CardItem title="Nro. Doc" value={c.numDoc} />
            </Col>
            <Col md={2}>
              <CardItem title="email" value={c.email} />
            </Col>
            <Col md={2}>
              <CardItem title="teléfono" value={c.telefono} />
            </Col>
            <Col md={2} className="d-flex flex-row justify-content-end">
              <div className="mx-2">
                <LinkEditItem url={`/client/${c.id}`} />
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
  const clients = await prisma.cliente.findMany();

  return {
    props: {
      clients,
    },
  };
};
