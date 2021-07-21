import Router from "next/router";
import prisma from "../../lib/prisma";
import { GetServerSideProps } from "next";
import { Reserva } from "../../features/types";
import { Button, Col, ListGroup, Row } from "react-bootstrap";
import ItemContainer from "../../features/common/ItemContainer";
import CardItem from "../../features/common/CardItem";
import { TrashIcon } from "@heroicons/react/outline";
import LinkEditItem from "../../features/common/LinkEditItem";
import ClientAPI from "../../features/api/client";
import Breadcrumbs from "../../features/common/Breadcrumbs";
import Link from "next/link";

type ReservasProps = {
    reservas: Reserva[];
};

const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Reservas", href: "/reservas", current: true },
];

export default function Reservas({ reservas }: ReservasProps) {

    console.log(reservas)
    const handleTrashClick = async (id: string) => {
        if (window.confirm("Do you want to delete this record?")) {
            try {
                const body = { id };
                const result = await fetch(`/api/reservas/delete`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(body),
                });
                Router.push(`/reservas`);

            } catch (error) {
                console.error(error);
            }

        }
    };

    return (
        <>
            <Row>
                <Col className="mt-4">
                    <Breadcrumbs navigation={navigation} />
                    <div className="my-4 d-flex justify-content-between align-items-center">
                        <h4>Lista de Reservas</h4>
                        <Link href="/reservas/new" passHref>
                            <Button>Nuevo</Button>
                        </Link>
                    </div>
                </Col>
            </Row>
            <ListGroup>
                {reservas.map((c) => (
                    <ItemContainer key={c.id}>
                        <Col md={2}>
                            <CardItem title="Cliente" value={`${c.cliente.nombres} ${c.cliente.apellidos}`} />
                        </Col>
                        <Col md={1}>
                            <CardItem title="Habitacion" value={`Nro ${c.habitacion.numHabitacion}`} />
                        </Col>
                        <Col md={2}>
                            <CardItem title="Tipo" value={c.habitacion.tipoHabitacion} />
                        </Col>
                        <Col md={2}>
                            <CardItem title="Recepcionista" value={`${c.recepcionista.nombres} ${c.recepcionista.apellidos}`} />
                        </Col>
                        <Col md={1}>
                            <CardItem title="Precio" value={`S/. ${c.habitacion.precio}`} />
                        </Col>
                        <Col md={1}>
                            <CardItem title="F. Inicio" value={`${c.fechaInicio.slice(0, 10).split("-").reverse().join("/")}`} />
                        </Col>
                        <Col md={1}>
                            <CardItem title="F. Final" value={`${c.fechaFin.slice(0, 10).split("-").reverse().join("/")}`} />
                        </Col>
                        <Col md={2} className="d-flex flex-row justify-content-end">
                            <div className="mx-2">
                                <LinkEditItem url={`reservas/${c.id}`} />
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
    const reservas = await prisma.reserva.findMany({
        select: {
            id: true,
            cliente: true,
            recepcionista: true,
            habitacion: true,
            fechaFin: true,
            fechaInicio: true
        }
    });
    return {
        props: {
            reservas,
        },
    };
};
