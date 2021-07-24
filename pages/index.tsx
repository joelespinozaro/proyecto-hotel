import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";

const navigation = [
  { name: "Clientes", href: "/client", current: false },
  { name: "Recepcionista", href: "/recepcionista", current: false },
  { name: "Habitacion", href: "/habitacion", current: false },
];

export default function Home(props) {
  const [dataR, setDataR] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const dataR = localStorage.getItem("recepcionista")
      ? JSON.parse(localStorage.getItem("recepcionista"))
      : router.push("/user/login");
    setDataR(dataR);
  }, []);

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
