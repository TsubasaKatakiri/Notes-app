export interface INote{
    id: string, 
    header?: string,
    text: string,
    tags?: string[],
    datetime: number; 
}

export type NotesContextType = {
    notes: INote[];
    currentNote: any;
    setNote: (note: INote | null) => void;
    loadNotes: () => void;
    filterNotes: (tag: string) => void;
    addNote: (note: INote) => void;
    editNote: (note: INote) => void;
    deleteNote: (id: string) => void;
}

export type ModalContextType = {
    modalCreate: boolean,
    openCreate: () => void,
    closeCreate: () => void,
    modalEdit: boolean,
    openEdit: () => void,
    closeEdit: () => void,
    modalDelete: boolean,
    openDelete: () => void,
    closeDelete: () => void,
}