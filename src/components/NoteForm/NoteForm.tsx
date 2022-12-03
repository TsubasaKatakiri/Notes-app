import {FormEvent, ChangeEvent} from 'react';
import { INote } from '../../models';
import classes from './NoteForm.module.scss';
import { useState } from 'react';
import uuid from 'react-uuid';
import { extractTags } from '../../util/textFunctions';

const NoteData : INote = {
    id: '',
    header: '',
    text: '',
    tags: [],
    datetime: Date.now()
}

interface NoteFormProps{
    onCreate?: (note: INote) => void;
}

const NoteForm = ({ onCreate } : NoteFormProps) => {
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [tags, setTags] = useState<string>('');

    const [textError, setTextError] = useState('');

    const submitHandler = (e: FormEvent) : void => {
        e.preventDefault();
        setTextError('');
        if(text.trim().length === 0){
            setTextError('Please enter some text');
            return;
        }
        NoteData.id = uuid();
        NoteData.header = title;
        NoteData.text = text;
        NoteData.tags = tags.split(' ');
        if(onCreate) onCreate(NoteData);
    }

    const textInputHandler = (e: ChangeEvent<HTMLInputElement> | any) => {
        const textString = e.target.value;
        setTags(extractTags(textString));
        setText(textString);
    }

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <input type='text' className={classes.form__input} placeholder={'Note Title'} value={title} onChange={e => setTitle(e.target.value)}/>
            <textarea value={text} className={classes.form__textarea} onChange={textInputHandler} placeholder='Note Text'></textarea>
            {textError && <span className={classes.form__error}>{textError}</span>}
            <input type='text' disabled className={classes.form__input} placeholder={'Note Tags'} value={tags}/>
            <button className={classes.form__button}>Save Note</button>
        </form>
    );
};

export default NoteForm;