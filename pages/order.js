import Layout from "../components/Layout";
import Item from "../components/Item";
import { withAuthenticator } from '@aws-amplify/ui-react';
import { DataStore, Predicates, SortDirection } from "aws-amplify";
import { useState, useEffect } from "react";
import { Products } from "../src/models";

function Order() {
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
        <Item order value={item.quantity} flavor={item.flavor}></Item>
    );
  });
  return (
    <Layout>
      <h1>Ventas</h1>
      {list}
    </Layout>
  );
}

export default withAuthenticator(Order);