import Router from "next/router";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { Cliente, Recepcionista } from "../../features/types";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import ItemContainer from "../../features/common/ItemContainer";
import CardItem from "../../features/common/CardItem";
import { TrashIcon } from "@heroicons/react/outline";
import LinkEditItem from "../../features/common/LinkEditItem";
import Breadcrumbs from "../../components/BBreadCrumbs";
import Link from "next/link";
import RecepcionistaAPI from "../../features/api/recepcionista";

type RecepcionistaProps = {
  recepcionista: Recepcionista[];
};

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Recepcionista", href: "/recepcionista", current: true },
];

export default function Recepcionistas({ recepcionista }: RecepcionistaProps) {
  const handleTrashClick = async (id: string) => {
    if (window.confirm("Do you want to delete this record?")) {
      const { status } = await RecepcionistaAPI.delete(id);

      if (status !== 200) {
        console.error(status.toString);
      } else {
        Router.push(`/recepcionista`);
      }
    }
  };

  return (
    <>
      <Row>
        <Col className="mt-4">
          <Breadcrumbs navigation={navigation} />
          <div className="my-4 d-flex justify-content-between align-items-center">
            <h4>Lista de Recepcionistas</h4>
            <Link href="/recepcionista/new" passHref>
              <Button>Nuevo</Button>
            </Link>
          </div>
        </Col>
      </Row>
      <ListGroup>
        {recepcionista.map((c) => (
          <ItemContainer key={c.id}>
            <Col md={3}>
              <CardItem title="Nombres" value={c.nombres} />
            </Col>
            <Col md={3}>
              <CardItem title="Apellidos" value={c.apellidos} />
            </Col>
            <Col md={3}>
              <CardItem title="Nro. Doc" value={c.numDoc} />
            </Col>
            <Col md={3} className="d-flex flex-row justify-content-end">
              <div className="mx-2">
                <LinkEditItem url={`/recepcionista/${c.id}`} />
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
  const recepcionista = await prisma.recepcionista.findMany();

  return {
    props: {
      recepcionista,
    },
  };
};
