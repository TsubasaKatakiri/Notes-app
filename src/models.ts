export interface INote{
    id: string, 
    header?: string,
    text: string,
    tags?: string[],
    datetime: number; 
}

export type NotesContextType = {
    notes: INote[],
    loadNotes: () => void;
    addNote: (note: INote) => void;
    editNote: (note: INote) => void;
    deleteNote: (id: string) => void;
}