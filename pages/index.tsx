import Link from "next/link";
import { Nav } from "react-bootstrap";

const navigation = [
  { name: "Home", href: "/", current: false },
  { name: "Company", href: "/client", current: false },
];

export default function Home() {
  return (
    <div>
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
