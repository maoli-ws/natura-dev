import { DataStore } from "aws-amplify";
import { Products } from "../src/models";

export default function Item(props) {
  async function saveSale() {
    const newQuantity = document.getElementById(
      `newQuantity-${props.flavor}`
    ).value;
    const original = await DataStore.query(Products, (p) =>
      p.flavor("eq", props.flavor)
    );
    await DataStore.save(
      Products.copyOf(original[0], (updated) => {
        updated.quantity = original[0].quantity - newQuantity;
      })
    );
  }
  async function savePurchase() {
    const newQuantity = document.getElementById(
      `newQuantity-${props.flavor}`
    ).value;
    const original = await DataStore.query(Products, (p) =>
      p.flavor("eq", props.flavor)
    );
    await DataStore.save(
      Products.copyOf(original[0], (updated) => {
        updated.quantity = +original[0].quantity + +newQuantity;
      })
    );
  }

  return (
    <>
    </>
  );
}
