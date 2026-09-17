import { Suspense } from 'react';
import Form from 'next/form';

import { Loader } from '@components/Loader/Loader';
import { ReversedHiddenInput } from '@components/ReversedHiddenInput/ReversedHiddenInput';
import { SearchButton } from '@components/SearchButton/SearchButton';
import { SearchInput } from '@components/SearchInput/SearchInput';
import { SortDirectButton } from '@components/SortDirectButton/SortDirectButton';

import styles from './SearchForm.module.scss';

export const SearchForm = () => {
   const searchKey = 'search-form-submit-button';

   return (
      <Form action="/" id="search" name="search" className={styles.search}>
         <Suspense fallback={null}>
            <ReversedHiddenInput />
         </Suspense>

         <Suspense key={`sort-${styles.search_button}`} fallback={<Loader />}>
            <SortDirectButton className={styles.search_button} />
         </Suspense>

         <Suspense key={`keyword-${styles.search_input_field}`} fallback={<Loader />}>
            <SearchInput name="keyword" className={styles.search_input_field} />
         </Suspense>

         <Suspense key={searchKey} fallback={<Loader />}>
            <SearchButton />
         </Suspense>
      </Form>
   );
};
