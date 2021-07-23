import React, { useState } from 'react'
import { Button, Col, Form, Row, } from 'react-bootstrap'
import prisma from '../../lib/prisma'

const ComponenteCliente = () => {

    const [nombres, setNombres] = useState(null)
    const [apellido, setApellido] = useState(null)
    const [tipoDoc, setTipoDoc] = useState(1)
    const [numDoc, setNumDoc] = useState(null)
    const [sexo, setSexo] = useState("M")
    const [telefono, setTelefono] = useState(null)
    const [email, setEmail] = useState(null)

    const agregarCliente = async () => {
        console.log(nombres)
        console.log(apellido)
        console.log(tipoDoc)
        console.log(numDoc)
        console.log(sexo)
        console.log(telefono)
        console.log(email)
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
                agregar nuevo cliente
            </h1>
            <Form className="mt-5">
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Agregar nombre"
                                onChange={(e: any) => {
                                    setNombres(e.target.value)
                                }} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Apellido</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Agregar apellido"
                                onChange={(e: any) => {
                                    setApellido(e.target.value)
                                }} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Label>Tipo de documento</Form.Label>
                        <br></br>

                        <select
                            onChange={(e: any) => {
                                setTipoDoc(e.target.value)
                            }}
                        >
                            <option value="1">DNI</option>
                            <option value="2">RUC</option>
                            <option value="3">PASAPORTE</option>
                            <option value="4">CARNET EXT</option>
                        </select>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Numero de documento</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Numero de documento"
                                onChange={(e: any) => {
                                    setNumDoc(e.target.value)
                                }} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Label>Sexo</Form.Label>
                        <br></br>

                        <select
                            onChange={(e: any) => {
                                setSexo(e.target.value)
                            }}
                        >
                            <option value="M">Masculino</option>
                            <option value="F">Femenino</option>
                        </select>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Numero de telefono</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Numero de telefono"
                                onChange={(e: any) => {
                                    setTelefono(e.target.value)
                                }} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresar email "
                                onChange={(e: any) => {
                                    setEmail(e.target.value)
                                }} />
                        </Form.Group>
                    </Col>
                </Row>
                <Row className="ml-2">
                    <Button onClick={agregarCliente}>Agregar Cliente</Button>
                </Row>

            </Form>
        </div>
    )
}

export default ComponenteCliente