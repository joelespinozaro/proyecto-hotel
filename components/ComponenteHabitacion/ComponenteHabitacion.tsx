import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import prisma from "../../lib/prisma";

type TipoHabitacion = "SIMPLE" | "DOBLE" | "MATRIMONIAL";

const ComponenteHabitacion = ({ hadleSuccess, habitacion = null }) => {

  const [numeroHabitacion, setNumeroHabitacion] = useState(habitacion?.numHabitacion || "null");
  const [tipoHabitacion, setTipoHabitacion] =
    useState<TipoHabitacion>(habitacion?.tipoHabitacion || "SIMPLE");
  const [precio, setPrecio] = useState(habitacion?.precio || 0);

  const agregarHabitacion = async () => {
    // creating a new record
    try {
      const body = { numeroHabitacion, tipoHabitacion, precio, id: habitacion?.id || null };
      const result = await fetch(`/api/habitacion/${habitacion? "update" : "new"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      hadleSuccess(result)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="textHeader">{habitacion ? "Editar" : "agregar nueva"} habitación</h1>
      <Form className="mt-5">
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Numero de habitación</Form.Label>
              <Form.Control
                type="number"
                placeholder="Agregar numero de habitacion"
                value={numeroHabitacion}
                onChange={(e: any) => {
                  setNumeroHabitacion(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Label>Tipo de habitación</Form.Label>
            <br></br>

            <select
              aria-label="Default select example"
              value={tipoHabitacion}
              onChange={(e: any) => {
                setTipoHabitacion(e.target.value);
              }}
            >
              <option value="SIMPLE">SIMPLE</option>
              <option value="DOBLE">DOBLE</option>
              <option value="MATRIMONIAL">MATRIMONIAL</option>
            </select>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                value={precio}
                type="number"
                placeholder="Agregar precio"
                onChange={(e: any) => {
                  setPrecio(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="ml-1">
          <Button onClick={agregarHabitacion}>{habitacion ? "Editar" : "Agregar"} Habitación</Button>
        </Row>
      </Form>
    </div>
  );
};

export default ComponenteHabitacion;
