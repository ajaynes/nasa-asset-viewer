"use client";

import { useState } from 'react';

export default function SearchBar() {
    const [inputValue, setInputValue ] = useState('');

     const handleChange = (event) => {
        setInputValue(event.target.value);
     };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted value:', inputValue);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Search" className="bg-slate-200 text-black" value={inputValue} onChange={handleChange} />
            <button type="submit" className="bg-blue text-white">Search</button>
        </form>
    )
}
