import Head from "next/head";
import Router from "next/router";
import React from "react";
import prisma from "../../lib/prisma";
import LoginForm from "../../features/common/LoginForm";
import { GetServerSideProps } from "next";
import HotelImg from "../../components/HotelImg";

export default function Login({ recepcionista }) {
  const handleLogin = (nombre, dni) => {
    console.log(nombre.toUpperCase());
    const result = recepcionista.find(
      (res) =>
        res.nombres.toUpperCase() === nombre.toUpperCase() && res.numDoc === dni
    );
    localStorage.setItem("recepcionista", JSON.stringify(result));
    result && Router.push(`/reservas`);
  };

  return (
    <>
      <Head>
        <title>Login | Proyecto Hotel</title>
        <meta
          name="description"
          content="Please login to use fully-featured next-realworld site. (Post articles, comments, and like, follow etc.)"
        />
      </Head>
      <div className="auth-page mt-5">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center text-center">Iniciar Sesión</h1>
              <LoginForm handleLogin={handleLogin} />
              <HotelImg />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Call an external API endpoint to get habitaciones
  const recepcionista = await prisma.recepcionista.findMany();

  return {
    props: {
      recepcionista,
    },
  };
};
