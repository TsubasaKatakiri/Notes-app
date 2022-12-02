import React, {FormEvent, ChangeEvent} from 'react';
import { INote } from '../../models';
import classes from './NoteForm.module.scss';
import { useState } from 'react';
import uuid from 'react-uuid';

const NoteData : INote = {
    id: '',
    header: '',
    text: '',
    tags: [],
    datetime: Date.now()
}

interface NoteFormProps{
    onCreate?: (note: INote) => void;
    onSaveEdit?: (note: INote) => void;
}

const NoteForm = ({onCreate, onSaveEdit} : NoteFormProps) => {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [tags, setTags] = useState([]);

    const [textError, setTextError] = useState('');

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        setTextError('');
        if(text.trim().length === 0){
            setTextError('Please enter some text');
            return;
        }
        NoteData.id = uuid();
        NoteData.header = title;
        NoteData.text = text;
        NoteData.tags = tags;
        console.log(NoteData);
        const notes = JSON.parse(localStorage.getItem('user-notes') || '');
        notes.push(NoteData);
        localStorage.setItem('user-notes', JSON.stringify(notes));
        if(onCreate) onCreate(NoteData);
    }

    const textInputHandler = (e: ChangeEvent<HTMLInputElement> | any) => {
        const textString = e.target.value;
        const tags = textString.split(' ')
                               .filter((word : string) => word.startsWith('#'))
                               .map((tag : string) => tag.replace(/[^a-zA-Z# ]/g, ""));
        setText(textString);
        setTags(tags);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <input type="text" className={classes.form__input} placeholder={"Note Title"} value={title} onChange={e => setTitle(e.target.value)}/>
            <textarea value={text} className={classes.form__textarea} onChange={textInputHandler} placeholder="Note Text"></textarea>
            {textError && <span className={classes.form__error}>{textError}</span>}
            <input type="text" disabled className={classes.form__input} placeholder={"Note Tags"} value={tags}/>
            <button className={classes.form__button}>Save Note</button>
        </form>
    );
};

export default NoteForm;