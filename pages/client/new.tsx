import Router, { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import ClientAPI from "../../features/api/client";
import Breadcrumbs from "../../features/common/BreadCrumbs";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Client", href: "/client", current: false },
  { name: "New Client", href: "", current: true },
];

export default function ClientPage() {
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

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const newClient = {
      nombres: nombres,
      apellidos: apellidos,
      email: email,
      telefono: parseInt(telefono),
      sexo: sexo,
      numDoc: numDoc,
      tipoDoc: tipoDoc || "DNI",
    };

    console.log(newClient);
    const { data, status } = await ClientAPI.create(newClient);

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
              onChange={handleNombresChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formClientLastName">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar apellidos"
              onChange={handleApellidosChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formClientEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Ingresar email"
              onChange={handleEmailChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="ControlSelectTDoc">
            <Form.Label>Tipo de documento</Form.Label>
            <Form.Control as="select" onChange={handleTipoDocChange} required>
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
              onChange={handleNumDocChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formClientPhone">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar teléfono"
              onChange={handleTelefonoChange}
              required
            />
          </Form.Group>

          <Form.Group as={Col} controlId="ControlSelectSexo">
            <Form.Label>Sexo</Form.Label>
            <Form.Control as="select" onChange={handleSexoChange} required>
              <option>Femenino</option>
              <option>Masculino</option>
            </Form.Control>
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
    </div>
  );
}
