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
    <div className="card">
      <div className="card-image">
        <figure className="image is-4by3">
          <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"/>
        </figure>
      </div>
      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"/>
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">John Smith</p>
            <p className="subtitle is-6">@johnsmith</p>
          </div>
        </div>

        <div className="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Phasellus nec iaculis mauris. <a>@bulmaio</a>.
          <a href="#">#css</a> <a href="#">#responsive</a>
          <br/>
          <time dateTime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
      </div>
    </div>
  );
}
