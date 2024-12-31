import classNames from 'classnames';
import { FormInput } from '@components/FormInput/FormInput';
import { SortDirectButton } from '@components/SortDirectButton/SortDirectButton';
import { searchAction } from '@tools/actions';
import { SPRITE_PATH } from '@tools/costants';
import styles from './Search.module.scss';

export const Search = () => {
   const searchIconID = 'search';
   const buttonsIconSize = 20;

   return (
      <form id="search" name="search" action={searchAction} className={styles.search}>
         <SortDirectButton className={styles.search_button} />
         <FormInput name="keyword" className={styles.search_input_field} />

         <button
            id="submiter"
            name="submiter"
            type="submit"
            form="search"
            aria-label="Поиск"
            className={classNames([styles.search_button, styles.search_button_submit])}
         >
            <svg width={buttonsIconSize} height={buttonsIconSize}>
               <use xlinkHref={`${SPRITE_PATH}#${searchIconID}`} />
            </svg>
         </button>
      </form>
   );
};
