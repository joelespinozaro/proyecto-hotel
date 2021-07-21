import Router, { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { Button, Col, Form, Row, Spinner, Card } from "react-bootstrap";
import { GetServerSideProps, GetStaticProps } from "next";
import { Cliente } from "../../features/types";
import ClientAPI from "../../features/api/client";
import Breadcrumbs from "../../features/common/Breadcrumbs";
import prisma from "../../lib/prisma";
import ComponenteHabitacion from "../../components/ComponenteHabitacion/ComponenteHabitacion";

const navigation = [
    { name: "Home", href: "/", current: false },
    { name: "Reservas", href: "/reservas/new", current: false },
    { name: "Completar Reserva", href: "", current: true },
];

export default function GenerarReservaPage({ habitacion, clientes, reserva }) {

    !habitacion && (habitacion = reserva.habitacion)

    const dateTransform = (date = null) => {
        var today = date || new Date();
        return today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    }

    const [idCliente, setIdCliente] = useState(reserva?.cliente?.id || 0);
    const [idRecepcionista, setIdRecepcionista] = useState("9ff245e5-565f-4022-892d-615385fa9747");
    const [fechaInicio, setFechaInicio] = useState(reserva?.fechaInicio || dateTransform());
    const [fechaFin, setFechaFin] = useState(reserva?.fechaFin || dateTransform());

    console.log(reserva)
    const generarReserva = async () => {
        try {
            const body = {
                idCliente: idCliente,
                idHabitacion: habitacion.id,
                idRecepcionista: idRecepcionista,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                id: reserva?.id || null
            };
            const result = await fetch(`/api/reservas/${reserva ? "update" : "new"}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            Router.push(`/reservas`);

        } catch (error) {
            console.error(error);
        }
    };

    const getDescription = (tipo) => {
        switch (tipo) {
            case "SIMPLE":
                return "Nuestras habitaciones simples son cómodas, equipadas con camas queen size para su entera satisfacción con maravillosa vista panorámica de la bahía. Playa de estacionamiento para 20 vehículos. Incluye desayuno buffet."
            case "DOBLE":
                return "Nuestras habitaciones Dobles son Cómodas y espaciosas con 2 camas Queen size para su entera con maravillosa vista panorámica de la bahía. Playa de estacionamiento para 20 vehículos. Incluye desayuno buffet."
            case "MATRIMONIAL":
                return "Nuestras habitaciones matrimoniales son Cómodas y espaciosas con camas Queen size para su entera satisfacción con maravillosa vista panorámica de la bahía.Playa de estacionamiento para 20 vehículos.Incluye desayuno buffet."
            default:
                break;
        }
    }

    const getImage = (tipo) => {
        switch (tipo) {
            case "SIMPLE":
                return "http://losflamencoshotel.com/uploads/images/gallery/2.jpg"
            case "DOBLE":
                return "http://losflamencoshotel.com/uploads/images/gallery/3.jpg"
            case "MATRIMONIAL":
                return "http://losflamencoshotel.com/uploads/images/gallery/6.jpg"
            default:
                break;
        }
    }
    return (
        <div className="mt-4">
            <Breadcrumbs navigation={navigation} />
            <Row>
                <Col md={6} className="mt-5" style={{ display: 'flex', justifyContent: 'center' }}>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={getImage(habitacion?.tipoHabitacion)} />
                        <Card.Body>
                            <Card.Title>Habitacion Nro {habitacion?.numHabitacion}</Card.Title>
                            <Card.Text className="font-weight-bold" style={{ fontSize: 12 }}>
                                Tipo : {habitacion?.tipoHabitacion} <br></br>
                                S/ Precio : {habitacion?.precio}<br></br>
                                <i className="text-justify font-weight-normal">
                                    {getDescription(habitacion?.tipoHabitacion)}
                                </i>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={6} style={{ padding: '0px 40px' }}>
                    <Row className="mt-5">
                        <Col md={4}>
                            <Form.Label>Cliente</Form.Label>
                            <br></br>
                            <select value={idCliente} onChange={(e: any) => setIdCliente(e.target.value)}>
                                <option value={0}>Seleccionar . .</option>
                                {
                                    clientes.map((client, index) => <option key={index} value={client.id}>{`${client.nombres}  ${client.apellidos}`}</option>)
                                }

                            </select>
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md={4}>
                            <Form.Label>Fecha Inicio</Form.Label>
                            <br></br>
                            <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)}></input>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col md={4}>
                            <Form.Label>Fecha Final</Form.Label>
                            <br></br>
                            <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)}></input>
                        </Col>
                    </Row>

                    <Row className="mt-3 ml-0">
                        <Button onClick={generarReserva}>Generar Reserva</Button>
                    </Row>
                </Col>
            </Row>

        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
    const habitacion = await prisma.habitacion.findUnique({
        where: {
            id: String(query?.id),
        },
    });
    let reserva = null
    if (!habitacion) {
        reserva = await prisma.reserva.findUnique({
            where: {
                id: String(query?.id),
            },
            select: {
                id: true,
                cliente: true,
                recepcionista: true,
                habitacion: true,
                fechaFin: true,
                fechaInicio: true
            }
        })
    }
    const clientes = await prisma.cliente.findMany()
    return {
        props: { habitacion, clientes, reserva },
    };
};