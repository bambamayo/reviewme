import React from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";
import { CSSTransition } from "react-transition-group";

import Backdrop from "../Backdrop/Backdrop";
import { hideModal } from "../../../redux/actions/modal";

const Modal = (props) => {
  const dispatch = useDispatch();
  const nodeRef = React.useRef(null);
  const content = (
    <>
      {props.show && <Backdrop onClick={() => dispatch(hideModal())} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
        nodeRef={nodeRef}
      >
        <div
          ref={nodeRef}
          className={`modal ${props.className}`}
          style={props.style}
        >
          <header className={`modal__header ${props.headerClass}`}>
            <h2>{props.header}</h2>
          </header>
          <div className={`modal__content ${props.contentClass}`}>
            {props.children}
          </div>
          <footer className={`modal__footer ${props.footerClass}`}>
            {props.footer}
          </footer>
          {props.cancelButton && (
            <button
              className="modal__close-btn"
              onClick={props.modalCloseBtnClick}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          )}
        </div>
      </CSSTransition>
    </>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

export default Modal;
