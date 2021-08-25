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
        sort: (s) => s.title(SortDirection.ASCENDING),
      });
      setItems(itemData);
    }
    const subscription = DataStore.observe(Products).subscribe(() =>
      fetchItems()
    );
    return () => subscription.unsubscribe();
  }, [setItems]);
      
      return (
        <Layout home>
          <div className="block">
            <div className="columns is-multiline">
              {items && items.map((item, i) => {
                return (
                  <div key={i} className="column is-one-quarter">
                    <div className="block">
                      <Item
                        flavor={item.title}
                        quantity={item.quantity}
                        description={item.description}
                        image={item.image}
                        subtitle={item.subtitle}
                      ></Item>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Layout>
      );
}
