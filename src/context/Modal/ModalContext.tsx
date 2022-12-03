import { createContext, ReactNode, useState } from 'react';
import { ModalContextType } from '../../models';

export const ModalsContext = createContext<ModalContextType>(
    {
        modalCreate: false,
        openCreate: () => {},
        closeCreate: () => {},
        modalEdit: false,
        openEdit: () => {},
        closeEdit: () => {},
        modalDelete: false,
        openDelete: () => {},
        closeDelete: () => {},
    }
);

export const ModalsState = ({children} : {children: ReactNode}) => {
    const [modalCreate, setModalCreate] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);

    const openCreate = () => setModalCreate(true);
    const closeCreate = () => setModalCreate(false);

    const openEdit = () => setModalEdit(true);
    const closeEdit = () => setModalEdit(false);

    const openDelete = () => setModalDelete(true);
    const closeDelete = () => setModalDelete(false);

    return (
        <ModalsContext.Provider value={{modalCreate, openCreate, closeCreate, modalEdit, openEdit, closeEdit, modalDelete, openDelete, closeDelete}} >
            {children}
        </ModalsContext.Provider>
    )
}