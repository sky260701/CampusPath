// components/AutocompleteInput.tsx

import React, { useState, useEffect } from 'react';

interface AutocompleteInputProps {
  label: string;
  name: string;
  type: 'branches' | 'colleges';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AutocompleteInput: React.FC<AutocompleteInputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await fetch(`/api/getSuggestions?type=${type}`);
        const data = await response.json();
        setSuggestions(data.suggestions || []);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchSuggestions();
  }, [type]);

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        list={`${name}-list`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={`Enter ${label.toLowerCase()}`}
        className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple focus:border-purple sm:text-sm"
      />
      <datalist id={`${name}-list`}>
        {suggestions.map((suggestion, index) => (
          <option key={index} value={suggestion} />
        ))}
      </datalist>
    </div>
  );
};

export default AutocompleteInput;
