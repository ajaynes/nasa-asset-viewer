'use client';

import { useState, ChangeEvent, FormEvent } from 'react';

type SearchBarProps = {
  onSearch: (term: string) => void;
};

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

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
    <form onSubmit={handleSubmit} className='flex w-full flex-1 items-center gap-3'>
      <div className='relative flex-1'>
        <input
          type='text'
          placeholder={isFocused || inputValue.length > 0 ? '' : 'Search NASA media…'}
          className='w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 pr-10 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40'
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label="Search NASA media"
        />
      </div>
      <button
        type='submit'
        className='cursor-pointer inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-60'>
        Search
      </button>
    </form>
  );
}
