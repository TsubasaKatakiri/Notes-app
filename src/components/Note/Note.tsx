import React, {useContext} from 'react';
import { INote } from '../../models';
import { datetimeConversion } from '../../util/datetime-conversion';
import classes from './Note.module.scss';
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import { NotesContext } from '../../context/Notes/NotesContext';

interface NoteProps{
    note: INote;
}

const Note = ({ note } : NoteProps) => {
    const {deleteNote} = useContext(NotesContext);

    const handleDelete = () => {
        deleteNote(note.id);
    }

    return (
        <div className={classes.card}>
            <h2 className={classes.card__header}>{note?.header}</h2>
            <p className={classes.card__text}>{note.text}</p>
            {note.tags && 
                <div className={classes.card__tags}>
                    {note.tags.map((tag, index) => {
                        return (<span className={classes.tag} key={index}>{tag}</span>)
                    })}
                </div>
            }
            <span className={classes.card__datetime}>{datetimeConversion(note.datetime)}</span>
            <div className={classes.card__controls}>
                <FaPencilAlt className={classes.card__icon}/>
                <FaTrash className={classes.card__icon} onClick={handleDelete}/>
            </div>
        </div>
    );
};

export default Note;