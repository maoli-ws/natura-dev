import { useState, useEffect } from "react";
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { Row, Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Item from "../components/Item";
import Layout from "../components/Layout";
import styles from "../styles/Home.module.css";
import { Products } from "../src/models";

export default function Home() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
    async function fetchItems() {
      const itemData = await DataStore.query(Products, Predicates.ALL, {
        sort: (s) => s.flavor(SortDirection.ASCENDING),
      });
      setItems(itemData);
    }
    const subscription = DataStore.observe(Products).subscribe(() =>
      fetchItems()
    );
    return () => subscription.unsubscribe();
  }, [setItems]);

  const list = items.map((item) => {
    return (
      item.quantity > 0 && 
      <Col>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>{item.flavor}</Card.Title>
            <Card.Text>
              {item.description}
              Cantidad disponible: {item.quantity}
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
    );
  });

  return (
    <Layout home>
      <h1 className={styles.title}>{process.env.NEXT_PUBLIC_PROJECT_NAME}</h1>
      <div className={styles.container}>
        <Row xs={1} md={2} className="g-4">
          {list}
        </Row>  
      </div>
    </Layout>
  );
}
