import { InputGroup, Button, FormControl } from "react-bootstrap";
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
      <InputGroup className="mb-3">
        <InputGroup.Text className="mb-6">{props.flavor}</InputGroup.Text>
        <InputGroup.Text className="mb-6">{props.quantity}</InputGroup.Text>
        {!props.list && <FormControl
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
          value={props.value}
          readOnly={true}
        />}
      </InputGroup>
      {(!props.stock && !props.list) && (
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Cantidad"
            aria-label="Cantidad"
            aria-describedby="basic-addon2"
            id={`newQuantity-${props.flavor}`}
          />
          {(props.order && props.value > 0) && (
            <Button
              variant="outline-secondary"
              id={`button-sale-${props.flavor}`}
              onClick={saveSale}
            >
              {"Vender"}
            </Button>
          )}
          {props.buy && (
            <Button
              variant="outline-secondary"
              id={`button-buy-${props.flavor}`}
              onClick={savePurchase}
            >
              {"Comprar"}
            </Button>
          )}
        </InputGroup>
      )}
    </>
  );
}
