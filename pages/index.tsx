import { GetServerSideProps, GetStaticProps } from "next";
import prisma from "../lib/prisma";
import { Cliente } from "../types";
import Titulo from "../components/Titulo";
import ComponenteHabitacion from "../components/ComponenteHabitacion/ComponenteHabitacion";
import ComponenteCliente from "../components/ComponenteCliente/ComponenteCliente";
import ComponenteRecepcionista from "../components/ComponenteRecepcionista/ComponenteRecepcionista";

type HomeProps = {
  clientes: Cliente[];
};

export default function Home({ habitaciones }) {
  return (
    <div>
      <ComponenteHabitacion habitaciones={habitaciones} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  // Call an external API endpoint to get habitaciones
  const habitaciones = await prisma.habitacion.findMany({
    where: { estado: true },
  });

  return {
    props: {
      habitaciones,
    },
  };
};
