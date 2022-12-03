import { ChangeEvent, useContext, useState } from 'react';
import { NotesContext } from '../../context/Notes/NotesContext';
import classes from './Search.module.scss';

const Search = () => {
    const {filterNotes} = useContext(NotesContext);
    const [tag, setTag] = useState('');

    const handleSearch = (e : ChangeEvent<HTMLInputElement>) : void => {
        const input = e.target.value;
        setTag(input);
        filterNotes(input);
    }

    return (
        <>
            <input className={classes.searchbox} type='text' value={tag} onChange={handleSearch} placeholder={'Tag...'}/>
        </>
    );
};

export default Search;