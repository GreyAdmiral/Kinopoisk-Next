'use client';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { usePlaceholder } from '@hooks/usePlaceholder';
import type { ChangeEvent, FC, SyntheticEvent } from 'react';
import type { FormInputProps } from './types';

export const FormInput: FC<FormInputProps> = ({ name, ...props }) => {
   const placeholderText = 'Поиск';
   const hiddenInputID = 'queries';
   const queryParams = useSearchParams();
   const keyword = queryParams.get('keyword');
   const [value, setValue] = useState('');
   const [inputRef, placeholder] = usePlaceholder(placeholderText);

   const changeHandler = (e: ChangeEvent) => {
      e.stopPropagation();

      setValue((e.target as HTMLInputElement).value);
   };

   const keyDownHandler = (e: SyntheticEvent) => {
      e.stopPropagation();

      if ((e.nativeEvent as KeyboardEvent).code === 'Enter' || (e.nativeEvent as KeyboardEvent).code === 'NumpadEnter') {
         e.preventDefault();
         const form = (e.target as HTMLInputElement).form;

         if (form) {
            const submiter = (form as HTMLFormElement).submiter;

            if (submiter) {
               (submiter as HTMLTemplateElement).click();
               // (form as HTMLFormElement).requestSubmit(submiter as HTMLButtonElement);
            }
         }
      }
   };

   useEffect(() => {
      setValue(keyword ? decodeURIComponent(keyword) : '');
   }, [keyword]);

   return (
      <>
         <input type="hidden" name={hiddenInputID} value={queryParams.toString()} id={hiddenInputID} aria-label={placeholderText} />

         <input
            ref={inputRef}
            type="text"
            name={name}
            value={value}
            placeholder={placeholder}
            aria-labelledby={hiddenInputID}
            onChange={changeHandler}
            onKeyDown={keyDownHandler}
            {...props}
         />
      </>
   );
};
