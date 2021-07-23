import Router, { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { GetServerSideProps, GetStaticProps } from "next";
import { Cliente, Recepcionista } from "../../features/types";
import ClientAPI from "../../features/api/client";
import Breadcrumbs from "../../features/common/Breadcrumbs";
import prisma from "../../lib/prisma";
import RecepcionistaAPI from "../../features/api/recepcionista";

type RecepcionistaPageProps = {
  recepcionista: Recepcionista;
};

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Recepcionista", href: "/recepcionista", current: false },
  { name: "Update Recepcionista", href: "", current: true },
];

export default function RecepcionistaPage({ recepcionista }: RecepcionistaPageProps) {
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

  if (!recepcionista)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const updateRecepcionista = {
      id: recepcionista.id,
      nombres: nombres || recepcionista.nombres,
      apellidos: apellidos || recepcionista.apellidos,
      numDoc: numDoc || recepcionista.numDoc,
      tipoDoc: tipoDoc || recepcionista.tipodocumento,
    };
    const { data, status } = await RecepcionistaAPI.update(updateRecepcionista);

    if (status !== 200) {
      console.error(data.errors);
    } else {
      Router.push(`/recepcionista`);
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
              defaultValue={recepcionista.nombres}
              onChange={handleNombresChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formClientLastName">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar apellidos"
              defaultValue={recepcionista.apellidos}
              onChange={handleApellidosChange}
            />
          </Form.Group>

         

          <Form.Group as={Col} controlId="ControlSelectTDoc">
            <Form.Label>Tipo de documento</Form.Label>
            <Form.Control
              as="select"
              onChange={handleTipoDocChange}
              defaultValue={recepcionista.tipodocumento}
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
              defaultValue={recepcionista.numDoc}
              onChange={handleNumDocChange}
            />
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
  const recepcionista = await prisma.recepcionista.findUnique({
    where: {
      id: String(query?.id),
    },
  });
  return {
    props: { recepcionista },
  };
};
