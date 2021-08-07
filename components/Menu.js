import { useEffect, useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import Image from "next/image";
import { AmplifySignOut } from "@aws-amplify/ui-react";
import { Auth } from "aws-amplify";

function Menu(props) {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    async function userInfo() {
      try {
        const { attributes } = await Auth.currentAuthenticatedUser();
        setIsLogged(attributes ? true : false);
        console.log("logged: ", attributes);
        if (isLogged) {
          console.log("username: ", username);
          setUsername(attributes.preferred_username);
        }
      } catch (error) {
        console.log("The user is not authenticated");
      }
    }
    userInfo();
  }, [isLogged, username]);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Image
            alt=""
            src="/logo-min.jpeg"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          {process.env.NEXT_PUBLIC_PROJECT_NAME}
        </Navbar.Brand>
        {!props.home && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="stock">Inventario</Nav.Link>
                <Nav.Link href="order">Ventas</Nav.Link>
                <Nav.Link href="purchase">Compras</Nav.Link>
                {isLogged && (
                  <AmplifySignOut
                    buttonText={`Cerrar sesión de ${username}`}
                  ></AmplifySignOut>
                )}
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default Menu;
