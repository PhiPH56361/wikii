
import React from 'react';
import { SearchIcon } from './IconComponents';

interface SearchInputProps {
  query: string;
  setQuery: (query: string) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const SearchInput: React.FC<SearchInputProps> = ({ query, setQuery, onSearch, isLoading }) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <div className="relative flex items-center w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Tìm kiếm chủ đề trên Wikipedia..."
        disabled={isLoading}
        className="w-full pl-4 pr-28 py-4 bg-slate-800 border border-slate-700 rounded-lg text-lg text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow duration-300 disabled:opacity-50"
      />
      <button
        onClick={onSearch}
        disabled={isLoading}
        className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-blue-500 transition-colors duration-300 disabled:bg-blue-800 disabled:cursor-not-allowed"
      >
        <SearchIcon />
        <span>{isLoading ? 'Đang...' : 'Tìm'}</span>
      </button>
    </div>
  );
};

export default SearchInput;
