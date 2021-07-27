import { ListGroup } from "react-bootstrap";
import Layout from "../components/Layout";
import Item from "../components/Item";
import AddItem from "../components/AddItem";
import { withAuthenticator } from '@aws-amplify/ui-react';
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { useState, useEffect } from "react";
import { Products } from "../src/models";

function Purchase() {
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
      <ListGroup.Item key={item.flavor}>
        <Item buy value={item.quantity} flavor={item.flavor}></Item>
      </ListGroup.Item>
    );
  });
  return (
    <Layout>
      <h1>Compras</h1>
      <ListGroup>{list}</ListGroup>
      <ListGroup variant="flush"><AddItem></AddItem></ListGroup>
    </Layout>
  );
}

export default withAuthenticator(Purchase);