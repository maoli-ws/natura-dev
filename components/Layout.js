import Head from "next/head";
import Menu from "./Menu";
import styles from "../styles/Home.module.css";

export default function Layout(props) {
  return (
    <>
      <Head>
        <title>{process.env.NEXT_PUBLIC_PROJECT_NAME} </title>
        <meta name="description" content="Natura en Santa Fe, Xochitepec, Morelos" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container is-fluid">
        <Menu home={props.home}/>
        <>{props.children}</>
      </div>
        <footer className={styles.footer}>
          <a
            href="https://maoli.ws"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hecho con ❤️ {" "}
            {" "} por maoli.ws
          </a>
        </footer>
    </>
  );
}