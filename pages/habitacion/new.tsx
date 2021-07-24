import Router, { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import { Button, Col, Form, Row, Spinner } from "react-bootstrap";
import { GetServerSideProps, GetStaticProps } from "next";
import { Cliente } from "../../features/types";
import ClientAPI from "../../features/api/client";
import Breadcrumbs from "../../components/BBreadCrumbs";
import prisma from "../../lib/prisma";
import ComponenteHabitacion from "../../components/ComponenteHabitacion/ComponenteHabitacion";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Habitacion", href: "/habitacion", current: false },
  { name: "Nueva Habitacion", href: "", current: true },
];

export default function HabitacionPage() {
  const hadleSuccess = (res) => {
    Router.push(`/habitacion`);
  };

  return (
    <div className="mt-4">
      <Breadcrumbs navigation={navigation} />
      <ComponenteHabitacion hadleSuccess={hadleSuccess} />
    </div>
  );
}
