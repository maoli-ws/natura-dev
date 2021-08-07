import { useState } from "react";
import { DataStore } from "aws-amplify";
import { Products } from "../src/models";

export default function AddItem() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function addNewItem() {
    const quantity = document.getElementById('formGroupQuantity').value;
    await DataStore.save(
      new Products({
        flavor: document.getElementById('formGroupFlavor').value,
        quantity: +quantity
      })
    );
  }

  return (
    <>
      
    </>
  );
}
