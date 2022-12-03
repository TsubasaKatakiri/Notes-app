import React, { useState, createContext, ReactNode } from 'react';
import { INote, NotesContextType } from '../../models';
import { getNotes, writeNotes } from '../../util/notesFunctions';

export const NotesContext = createContext<NotesContextType>({
    notes: [],
    currentNote: null,
    setNote: () => {},
    loadNotes: () => {},
    filterNotes: () => {},
    addNote: () => {},
    editNote: () => {},
    deleteNote: () => {},
});

const NotesProvider = ({children} : {children: ReactNode}) => {
    const [notes, setNotes] = useState<INote[]>([]);
    const [currentNote, setCurrentNote] = useState<INote | null>(null);

    const setNote = (note: INote | null) : void => {
        setCurrentNote(note);
    }

    const loadNotes = () : void => {
        const noteData = localStorage.getItem('user-notes');
        if(!noteData) writeNotes([]);
        else setNotes(JSON.parse(noteData));
    }

    const filterNotes = (tag : string) : void => {
        const noteData = getNotes();
        const filteredNotes = noteData.filter((note : INote) => note.tags?.includes(tag));
        if(tag === '') setNotes(noteData);
        else setNotes(filteredNotes);
    }

    const addNote = (note : INote) : void => {
        const noteData = getNotes();
        const newNoteData = noteData.concat(note);
        writeNotes(newNoteData);
        setNotes(newNoteData);
    }

    const editNote = (note : INote) : void => {
        const noteData = getNotes();
        const newNoteData = noteData.map((item : INote) => {
            if(item.id === note.id) return note;
            else return item;
        });
        writeNotes(newNoteData);
        setNotes(newNoteData);
    }

    const deleteNote = (id : string) : void => {
        const noteData = getNotes();
        const newNoteData = noteData.filter((item : INote) => item.id !== id);
        writeNotes(newNoteData);
        setNotes(prev => prev.filter((note : INote) => note.id !== id));
    }

    return (
        <NotesContext.Provider value={{notes, currentNote, setNote, loadNotes, filterNotes, addNote, editNote, deleteNote}}>
            {children}
        </NotesContext.Provider>
    )
}

export default NotesProvider;