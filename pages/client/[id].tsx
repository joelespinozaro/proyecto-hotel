import Router, { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { GetServerSideProps, GetStaticProps } from "next";
import { Cliente } from "../../features/types";
import ClientAPI from "../../features/api/client";
import Breadcrumbs from "../../features/common/BreadCrumbs";
import prisma from "../../lib/prisma";

type ClientPageProps = {
  client: Cliente;
};

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Client", href: "/client", current: false },
  { name: "Update Client", href: "", current: true },
];

export default function ClientPage({ client }: ClientPageProps) {
  const [nombres, setNombres] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [sexo, setSexo] = useState("");
  const [numDoc, setNumDoc] = useState("");
  const [tipoDoc, settipoDoc] = useState("");

  const handleEmailChange = useCallback((e) => setEmail(e.target.value), []);
  const handleSexoChange = useCallback((e) => setSexo(e.target.value), []);
  const handleNumDocChange = useCallback((e) => setNumDoc(e.target.value), []);
  const handleNombresChange = useCallback(
    (e) => setNombres(e.target.value),
    []
  );
  const handleApellidosChange = useCallback(
    (e) => setApellidos(e.target.value),
    []
  );
  const handleTelefonoChange = useCallback(
    (e) => setTelefono(e.target.value),
    []
  );
  const handleTipoDocChange = useCallback(
    (e) => settipoDoc(e.target.value),
    []
  );

  if (!client)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const updateClient = {
      id: client.id,
      nombres: nombres || client.nombres,
      apellidos: apellidos || client.apellidos,
      email: email || client.email,
      telefono: parseInt(telefono) || client.telefono,
      sexo: sexo || client.sexo,
      numDoc: numDoc || client.numDoc,
      tipoDoc: tipoDoc || client.tipodocumento,
    };
    const { data, status } = await ClientAPI.update(updateClient);

    if (status !== 200) {
      console.error(data.errors);
    } else {
      Router.push(`/client`);
    }
  };
  return (
    <div className="mt-4">
      <Breadcrumbs navigation={navigation} />
      <Form onSubmit={handleSubmit} className="border rounded p-4">
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formClientName">
            <Form.Label>Nombres</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar nombres"
              defaultValue={client.nombres}
              onChange={handleNombresChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formClientLastName">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar apellidos"
              defaultValue={client.apellidos}
              onChange={handleApellidosChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formClientEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresar email"
              defaultValue={client.email}
              onChange={handleEmailChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="ControlSelectTDoc">
            <Form.Label>Tipo de documento</Form.Label>
            <Form.Control
              as="select"
              onChange={handleTipoDocChange}
              defaultValue={client.tipodocumento}
            >
              <option value="DNI">DNI</option>
              <option value="RUC">RUC</option>
              <option value="CEX">CEX</option>
              <option value="PASAPORTE">PASAPORTE</option>
            </Form.Control>
          </Form.Group>

          <Form.Group as={Col} controlId="formClientNDoc">
            <Form.Label>Núm. Documento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar número de documento"
              defaultValue={client.numDoc}
              onChange={handleNumDocChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formClientPhone">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar teléfono"
              defaultValue={client.telefono}
              onChange={handleTelefonoChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="ControlSelectSexo">
            <Form.Label>Sexo</Form.Label>
            <Form.Control
              as="select"
              onChange={handleSexoChange}
              defaultValue={client.sexo}
            >
              <option>Femenino</option>
              <option>Masculino</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const client = await prisma.cliente.findUnique({
    where: {
      id: String(query?.id),
    },
  });
  return {
    props: { client },
  };
};
