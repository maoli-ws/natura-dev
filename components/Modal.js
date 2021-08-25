import React from 'react';
import ReactDOM from 'react-dom';
import Image from 'next/image';

const Modal = ({ isShowing, hide, image }) => isShowing ? ReactDOM.createPortal(
  <React.Fragment>
    <div className={`modal ${isShowing ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <p className="image is-4by3">
          <Image src={image} alt="" layout="fill"/>
        </p>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={hide}></button>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;