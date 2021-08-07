import { useState, useEffect } from "react";
import { DataStore, Predicates, SortDirection } from "aws-amplify";
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
    );
  });

  return (
    <Layout home>
      <h1 className={styles.title}>{process.env.NEXT_PUBLIC_PROJECT_NAME}</h1>
      <div className={styles.container}>
          {list}
      </div>
    </Layout>
  );
}
