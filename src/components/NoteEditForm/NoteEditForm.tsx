import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { INote } from '../../models';
import classes from './NoteEditForm.module.scss';
import parse from 'html-react-parser';
import ContentEditable from 'react-contenteditable'
import { extractTags, inlineTags } from '../../util/textFunctions';

interface NoteEditProps{
    note : INote;
    onSaveEdit: (note: INote) => void;
}

const NoteEditForm = ({note, onSaveEdit} : NoteEditProps) => {
    const [title, setTitle] = useState<string | undefined>(note?.header);
    const [text, setText] = useState<string>(note.text);
    const [tags, setTags] = useState<string>(note.tags ? inlineTags(note.tags) : '');

    const [textError, setTextError] = useState<string>('');

    const textInputHandler = (e: ChangeEvent<HTMLInputElement> | any) : void => {
        const textString = e.target.value;
        setTags(extractTags(textString));
        setText(textString);
    }

    const submitHandler = (e : FormEvent) : void => {
        e.preventDefault();
        setTextError('');
        if(text.trim().length === 0){
            setTextError('Please enter some text');
            return;
        }
        note.header = title;
        note.text = text;
        note.tags = tags.split(' ');
        onSaveEdit(note);
    }


    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <input type='text' className={classes.form__input} placeholder={'Note Title'} value={title} onChange={e => setTitle(e.target.value)}/>
            <textarea value={text} className={classes.form__textarea} onChange={textInputHandler} placeholder='Note Text'></textarea>
            {textError && <span className={classes.form__error}>{textError}</span>}
            <input type='text' className={classes.form__input} placeholder={'Note Tags'} value={tags} onChange={e => setTags(e.target.value)}/>
            <button className={classes.form__button}>Save Note</button>
        </form>
    );
};

export default NoteEditForm;