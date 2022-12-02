import React, { ReactNode } from 'react';
import classes from './Modal.module.scss';

interface ModalProps{
    children: ReactNode,
    title: string,
    onClose: () => void
}

const Modal = ({children, title, onClose} : ModalProps) => {
    return (
        <>
          <div className={classes.underlay} onClick={onClose}/>  
          <div className={classes.modal}>
            <h2 className={classes.modal__title}>{title}</h2>
            {children}
          </div>
        </>
    );
};

export default Modal;