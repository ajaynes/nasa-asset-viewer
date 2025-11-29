"use client";

import { useState, ChangeEvent, FormEvent } from 'react';

type SearchBarProps = {
  onSearch: (term: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed) {
      onSearch(trimmed);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search"
        className="bg-slate-200 text-black"
        value={inputValue}
        onChange={handleChange}
      />
      <button type="submit" className="bg-blue-400 text-black p-1">
        Search
      </button>
    </form>
  );
}
