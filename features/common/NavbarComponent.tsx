import { Container, Navbar, NavDropdown, Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import useRouteUrlHistory from "../../lib/hooks/useRouteUrlHistory";
import { signOut, useSession } from "next-auth/client";

const navigation = [
  { name: "Reservas", href: "/reservas", current: false },
  { name: "Nueva Reserva", href: "/reservas/new", current: false },
  { name: "Mantenimiento", href: "/", current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function NavbarComponent() {
  const user = true;
  const { previousRoute } = useRouteUrlHistory();
  const router = useRouter();
  const [session, loading] = useSession();

  if (loading) return <p>Loading</p>;
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Proyecto Hotel</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav d-flex justify-content-between">
            <Nav className="me-auto">
              {navigation.map((item) => (
                <Link href={item.href} as={item.href} key={item.name} passHref>
                  <Nav.Link
                    href="#"
                    className={classNames(
                      item.href === router.asPath
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "px-3 py-2 rounded-md text-sm font-medium"
                    )}
                  >
                    {item.name}
                  </Nav.Link>
                </Link>
              ))}
            </Nav>
            <Nav>
              {!session ? (
                <>
                  <Link href="/user/login" passHref>
                    <Nav.Link href="#">Sign in</Nav.Link>
                  </Link>
                  {/* <Link href="/user/register" as="/user/register" passHref>
                    <Nav.Link href="#">Sign up</Nav.Link>
                  </Link> */}
                </>
              ) : (
                <p>
                  {session.user.name} ({session.user.email}){" "}
                </p>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
