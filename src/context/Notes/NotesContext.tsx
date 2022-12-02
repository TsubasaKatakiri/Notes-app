import React, { useState, createContext, ReactNode } from 'react';
import { INote, NotesContextType } from '../../models';

export const NotesContext = createContext<NotesContextType>(    {
    notes: [],
    loadNotes: () => {},
    addNote: () => {},
    editNote: () => {},
    deleteNote: () => {},
});

const NotesProvider = ({children} : {children: ReactNode}) => {
    const [notes, setNotes] = useState<INote[]>([]);

    const loadNotes = () => {
        const noteData = localStorage.getItem('user-notes');
        if(!noteData) localStorage.setItem('user-notes', JSON.stringify([]));
        else setNotes(JSON.parse(noteData));
    }

    const addNote = (note : INote) => {
        setNotes(prev => [...prev, note]);
    }

    const editNote = (note : INote) => {
        setNotes(prev => prev.map((item : INote) => {
            if(item.id === note.id) return note;
            else return item;
        }));
    }

    const deleteNote = (id : string) => {
        const noteData = JSON.parse(localStorage.getItem('user-notes') || '');
        const newNoteData = noteData.filter((item : INote) => item.id !== id);
        localStorage.setItem('user-notes', JSON.stringify(newNoteData));
        setNotes(prev => prev.filter((note : INote) => note.id !== id));
    }

    return (
        <NotesContext.Provider value={{notes, loadNotes, addNote, editNote, deleteNote}}>
            {children}
        </NotesContext.Provider>
    )
}

export default NotesProvider;