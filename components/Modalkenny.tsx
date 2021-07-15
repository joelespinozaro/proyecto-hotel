import React, { useState } from 'react'
import { Modal, Button, Form, Container, Col } from 'react-bootstrap';


function Modalkenny(props: any) {
  const { open, setOpen, employees, setEmployees } = props
  const handleClose = () => setOpen(false);
  const handleShow = () => setOpen(true);
  const [employe, setEmploye] = useState({
    id: 1,
    tag: '',
    description: '',
    customer: '',
    recepcionist: ''
  })

  const save = () => {
    const lastEmploye = employees[employees.length - 1]
    let employeCopy = employe;
    employeCopy.id = lastEmploye.id + 1;
    employeCopy.customer = "Yo"
    employeCopy.recepcionist = "Tu"

    setEmployees([...employees, employeCopy])
    setEmploye({
      id: 1,
      tag: '',
      description: '',
      customer: '',
      recepcionist: ''
    })
    setOpen(false)

  }

  const onChangeInput = (e: any) => {
    setEmploye({
      ...employe,
      [e.target.name]: e.target.value
    })
  }


  return (
    <Modal show={open} onHide={handleClose} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Formulario</Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <form >
          <Container>
            <Form>
              <Form.Group controlId="formTAG">
                <Form.Label>TAG </Form.Label>
                <Form.Control name="tag" type="text" placeholder="  " value={employe.tag} onChange={(e) => onChangeInput(e)} />
              </Form.Group>
              <Form.Group controlId="formDESC">
                <Form.Label>DESCRIPCION</Form.Label>
                <Form.Control name="description" type="text" placeholder="  " value={employe.description} onChange={(e) => onChangeInput(e)} />
              </Form.Group>

            </Form>

          </Container>

        </form>


      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={save}>
          Guardar
        </Button>
      </Modal.Footer>

    </Modal>

  )
}

export default Modalkenny
