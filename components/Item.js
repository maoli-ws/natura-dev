import { useState } from "react";
import { DataStore } from "aws-amplify";
import { Products } from "../src/models";
import Image from 'next/image';
import Modal from "./Modal";
import useModal from "../hooks/useModal";

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

  const { isShowing, toggle } = useModal();
  
  return (
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <Image
            src={props.image ? props.image : 'https://naturamaoli184309-dev.s3.us-east-2.amazonaws.com/large-images/1280x960.png'}
            alt="Placeholder image"
            layout="fill"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg=="
            placeholder="blur"
            onClick={toggle}
          />
          <Modal isShowing={isShowing} hide={toggle} image={props.image ? props.image : 'https://naturamaoli184309-dev.s3.us-east-2.amazonaws.com/large-images/1280x960.png'} />
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-content">
            <p className="title is-4">{props.title}</p>
            <p className="subtitle is-6">{props.subtitle}</p>
          </div>
        </div>

        <div className="content">
          {props.description}
          <br />
          <p>Piezas disponibles: {props.quantity}</p>
        </div>
      </div>
    </div>
  );
}
