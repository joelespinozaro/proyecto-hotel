import { Container, Navbar, NavDropdown, Nav } from "react-bootstrap";
import { useRouter } from "next/router";
import Link from "next/link";
import useRouteUrlHistory from "../../lib/hooks/useRouteUrlHistory";
import { signOut, useSession } from "next-auth/client";
import { useEffect, useState } from "react";

const navigation = [
  { name: "Recepcionista", href: "/recepcionista", current: false },
  { name: "Reservas", href: "/reservas", current: false },
  { name: "Nueva Reserva", href: "/reservas/new", current: false },
  { name: "Mantenimiento", href: "/", current: false },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function NavbarComponent(props) {
  const user = true;
  const { previousRoute } = useRouteUrlHistory();
  const router = useRouter();
  const [session, loading] = useSession();

  const [dataR, setDataR] = useState(null);

  useEffect(() => {
    const dataR = localStorage.getItem("recepcionista")
      ? JSON.parse(localStorage.getItem("recepcionista"))
      : null;
    setDataR(dataR);
  }, [props]);

  const handleCerrarSesion = () => {
    setDataR(null);
    localStorage.clear();
  };

  if (loading) return <p>Loading</p>;
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Proyecto Hotel</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav d-flex justify-content-between">
            {dataR && (
              <Nav className="me-auto">
                {navigation.map((item) => (
                  <Link
                    href={item.href}
                    as={item.href}
                    key={item.name}
                    passHref
                  >
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
            )}

            <Nav
              style={{
                position: "absolute",
                right: "10px",
              }}
            >
              {!session ? (
                <>
                  {dataR && (
                    <>
                      <p
                        className="fw-bolder"
                        style={{
                          color: "rgb(233 236 239)",
                          textTransform: "capitalize",
                          margin: "auto",
                          fontWeight: 700,
                        }}
                      >
                        Bienvenido - {`${dataR.nombres} ${dataR.apellidos}`}
                      </p>
                    </>
                  )}
                  {
                    dataR && (
                      <Link href="/user/login" passHref>
                        <Nav.Link href="#" onClick={handleCerrarSesion}>
                          Cerrar Sesion
                        </Nav.Link>
                      </Link>
                    )
                    //: <Link href="/user/login" passHref>
                    //   <Nav.Link href="#">Iniciar Sesion</Nav.Link>
                    // </Link>
                  }
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
