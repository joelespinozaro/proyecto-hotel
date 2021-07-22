import { GetStaticProps } from 'next'
import prisma from '../lib/prisma'
import { Cliente } from '../types';
import Titulo from '../components/Titulo';
import ComponenteKenny from '../components/ComponenteKenny';

type HomeProps = {
  clientes: Cliente[];
}

export default function Home({ clientes }:HomeProps) {
  return (
    <div>
            <ComponenteKenny/>
            
            
    </div>
   
  )

}

export const getStaticProps: GetStaticProps = async () =>{
  // const clientes = await prisma.$queryRaw('SELECT * FROM Cliente;');
   return { props: {} }
}