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
    
  );
}

export default Menu;
