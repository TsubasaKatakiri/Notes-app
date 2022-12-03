import {useContext} from 'react';
import { INote } from '../../models';
import { datetimeConversion } from '../../util/datetime-conversion';
import classes from './Note.module.scss';
import { FaTrash, FaPencilAlt } from 'react-icons/fa';
import { NotesContext } from '../../context/Notes/NotesContext';
import { formatTags } from '../../util/textFunctions';
import { ModalsContext } from '../../context/Modal/ModalContext';

interface NoteProps{
    note: INote;
}

const Note = ({ note } : NoteProps) => {
    const {openDelete, openEdit} = useContext(ModalsContext);
    const {setNote} = useContext(NotesContext);
    const tags = note.tags ? formatTags(note.tags) : [];

    const editFunc = () : void => {
        setNote(note);
        openEdit();
    }

    const deleteFunc = () : void  => {
        setNote(note);
        openDelete();
    }

    return (
        <div className={classes.card}>
            <h2 className={classes.card__header}>{note?.header}</h2>
            <p className={classes.card__text}>{note.text}</p>
            <div className={classes.card__tags}>
                {tags.map((tag, index) => {
                    return (<span className={classes.tag} key={index}>{tag}</span>)
                })}
            </div>
            <span className={classes.card__datetime}>{datetimeConversion(note.datetime)}</span>
            <div className={classes.card__controls}>
                <FaPencilAlt className={classes.card__icon} onClick={editFunc}/>
                <FaTrash className={classes.card__icon} onClick={deleteFunc}/>
            </div>
        </div>
    );
};

export default Note;