import { GetStaticProps } from 'next'
import prisma from '../lib/prisma'
import { Cliente } from '../types';
import Titulo from '../components/Titulo';
import ComponenteHabitacion from '../components/ComponenteHabitacion/ComponenteHabitacion';
import ComponenteCliente from '../components/ComponenteCliente/ComponenteCliente';
import ComponenteRecepcionista from '../components/ComponenteRecepcionista/ComponenteRecepcionista';

type HomeProps = {
  clientes: Cliente[];
}

export default function Home({ clientes }: HomeProps) {
  return (
    <div>
      <ComponenteRecepcionista />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  // const clientes = await prisma.$queryRaw('SELECT * FROM Cliente;');
  return { props: {} }
}