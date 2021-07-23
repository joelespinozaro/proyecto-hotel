import Link from "next/link";
import { Nav } from "react-bootstrap";

const navigation = [
  { name: "Clientes", href: "/client", current: false },
  { name: "Recepcionista", href: "/recepcionista", current: false },
  { name: "Habitacion", href: "/habitacion", current: false },
];

export default function Home() {
  return (
    <div className="mt-3">
      <ul>
        {navigation.map((item) => (
          <li key={item.name}>
            <Link href={item.href} as={item.href} passHref>
              <Nav.Link href="#">{item.name}</Nav.Link>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
