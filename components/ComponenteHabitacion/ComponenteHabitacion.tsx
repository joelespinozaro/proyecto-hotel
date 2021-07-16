import React, { useState } from 'react'
import { Button, Col, Form, Row, } from 'react-bootstrap'
import prisma from '../../lib/prisma'

const ComponenteHabitacion = () => {

    const [numeroHabitacion, setNumeroHabitacion] = useState(null)
    const [tipoHabitacion, setTipoHabitacion] = useState(null)

    const agregarHabitacion = async () => {
        // Creating a new record
        // const resolve = await prisma.user.create({
        //     numHabitacion: numeroHabitacion,
        //     idTipoHabitacion: tipoHabitacion,
        //     tipoHabitacion
        // })

    }

    return (
        <div className="container">
            <h1 className="textHeader">
                agregar nueva habitacion
            </h1>
            <Form className="mt-5">
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Numero de habitacion</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Agregar numero de habitacion"
                                onChange={(e: any) => {
                                    setNumeroHabitacion(e.target.value)
                                }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Label>Tipo de habitacion</Form.Label>
                        <br></br>

                        <select aria-label="Default select example"
                            onChange={(e: any) => {
                                setTipoHabitacion(e.target.value)
                            }}
                        >
                            <option value="1">Matrimonial</option>
                            <option value="2">Presidencial</option>
                            <option value="3">Clasico</option>
                        </select>
                    </Col>
                </Row>
                <Row className="ml-1">
                    <Button onClick={agregarHabitacion}>Agregar Habitacion</Button>
                </Row>

            </Form>
        </div>
    )
}

export default ComponenteHabitacion