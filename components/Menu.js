import { useEffect, useState } from "react";
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
    <div>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href="https://natura.maoli.ws">
            <img
              src="https://bulma.io/images/bulma-logo.png"
              width="112"
              height="28"
            />
          </a>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="/">Inicio</a>

            <a className="navbar-item" href="stock">Inventario</a>
            <a className="navbar-item" href="order">Ventas</a>
            <a className="navbar-item" href="puchase">Compras</a>

          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {isLogged && (
                  <AmplifySignOut
                    buttonText={`Cerrar sesión de ${username}`}
                  ></AmplifySignOut>
                )}
                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a className="button is-light">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Menu;
