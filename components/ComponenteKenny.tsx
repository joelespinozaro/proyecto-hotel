import { useState, useEffect } from 'react';
import { Table, Container, Badge, Button } from 'react-bootstrap';
import styles from '../styles/Home.module.css';
import Modalkenny from './Modalkenny';
//https://github.com/Yoshua1304/Hoteleria.git
export default function Tabla() {
  const [open, setOpen] = useState<boolean>(false)
  const [employees, setEmployees] = useState<any[]>([{
    id: 1,
    tag: 'DNI',
    description: 'Documento Nacional de Identidad',
    customer: 'Sebastian',
    recepcionist: 'Kenny'
  }, {
    id: 2,
    tag: 'CEX',
    description: 'Carnet de Extrangeria',
    customer: 'Sebastian',
    recepcionist: 'Kenny'
  }
  ])


  return (
    <body>

      <div className={styles.badge}>
        <h1><Badge variant="secondary">Tabla de usuarios</Badge></h1>
      </div>

      <div className={styles.container}  >
        <br></br><br></br>

        <Container>

          <Table striped bordered hover variant="dark" id='Tabla' >

            <thead>
              <tr>
                <th>#ID</th>
                <th>Tag</th>
                <th>Descripcion</th>
                <th>Cliente</th>
                <th>Recepcionista</th>
              </tr>
            </thead>
            <tbody>
              {
                employees.map(employe => (
                  <tr>
                    <td>{employe.id}</td>
                    <td>{employe.tag}</td>
                    <td>{employe.description}</td>
                    <td>{employe.customer}</td>
                    <td>{employe.recepcionist}</td>
                  </tr>
                ))
              }
            </tbody>

          </Table>
          <>
            <Button variant="secondary" onClick={() => setOpen(true)}>Agregar</Button>{' '}
          </>
          <Modalkenny open={open} setOpen={setOpen} employees={employees} setEmployees={setEmployees} />
        </Container>
      </div>

    </body>
  )


}



