'use client';

import { useSearchParams } from 'next/navigation';
import type { ChangeEvent, FC } from 'react';
import { useEffect, useState } from 'react';

import { usePlaceholder } from '@hooks/usePlaceholder';

import type { SearchInputProps } from './types';

export const SearchInput: FC<SearchInputProps> = ({ name, ...props }) => {
   const placeholderText = 'Поиск';
   const queryParams = useSearchParams();
   const keyword = queryParams.get('keyword');
   const [value, setValue] = useState<string>(keyword || '');
   const [inputRef, placeholder] = usePlaceholder(placeholderText);

   const changeHandler = (e: ChangeEvent) => {
      e.stopPropagation();

      setValue((e.target as HTMLInputElement).value);
   };

   useEffect(() => {
      setValue(keyword ? decodeURIComponent(keyword) : '');
   }, [keyword]);

   return (
      <input
         ref={inputRef}
         type="text"
         name={name}
         value={value}
         placeholder={placeholder}
         aria-labelledby={placeholderText}
         onChange={changeHandler}
         {...props}
      />
   );
};
