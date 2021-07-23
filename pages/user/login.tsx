import Head from "next/head";
import Router from "next/router";
import Link from "next/link";
import React from "react";
import prisma from "../../lib/prisma";
// import CustomLink from "../../components/common/CustomLink";
import LoginForm from "../../features/common/LoginForm";

export default function Login({ recepcionista }) {

  const handleLogin = (nombre, dni) => {
    console.log(nombre.toUpperCase())
    const result = recepcionista.find(res => res.nombres.toUpperCase() === nombre.toUpperCase() && res.numDoc === dni)
    localStorage.setItem('recepcionista',JSON.stringify(result))
    result && Router.push(`/reservas`);

  }

  return (
    <>
      <Head>
        <title>LOGIN | NEXT REALWORLD</title>
        <meta
          name="description"
          content="Please login to use fully-featured next-realworld site. (Post articles, comments, and like, follow etc.)"
        />
      </Head>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <Link href="/user/register" as="/user/register">
                  Need an account?
                </Link>
              </p>
              <LoginForm handleLogin={handleLogin} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Call an external API endpoint to get habitaciones
  const recepcionista = await prisma.recepcionista.findMany();

  return {
    props: {
      recepcionista,
    }
  };
};
