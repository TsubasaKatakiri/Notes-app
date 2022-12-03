import { INote } from '../models';

export const getNotes = () => {
    return JSON.parse(localStorage.getItem('user-notes') || '');
}

export const writeNotes = (noteData: INote[]) : void => {
    localStorage.setItem('user-notes', JSON.stringify(noteData));
}
