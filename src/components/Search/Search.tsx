import { Suspense } from 'react';
import { Loader } from '@components/Loader/Loader';
import { FormInput } from '@components/FormInput/FormInput';
import { SortDirectButton } from '@components/SortDirectButton/SortDirectButton';
import { SearchButton } from '@components/SearchButton/SearchButton';
import { searchAction } from '@tools/actions';
import styles from './Search.module.scss';

export const Search = () => {
   return (
      <form id="search" name="search" action={searchAction} className={styles.search}>
         <SortDirectButton className={styles.search_button} />

         <Suspense fallback={<Loader />}>
            <FormInput name="keyword" className={styles.search_input_field} />
         </Suspense>

         <SearchButton className={styles.search_button} />
      </form>
   );
};
