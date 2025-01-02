import classNames from 'classnames';
import { SPRITE_PATH } from '@tools/costants';
import type { FC } from 'react';
import type { SearchButtonProps } from './types';
import styles from './SearchButton.module.scss';

export const SearchButton: FC<SearchButtonProps> = ({ className }) => {
   const searchIconID = 'search';
   const buttonsIconSize = 20;

   return (
      <button
         id="submiter"
         name="submiter"
         type="submit"
         form="search"
         aria-label="Поиск"
         className={classNames([styles.search_button_submit, { [className]: !!className }])}
      >
         <svg width={buttonsIconSize} height={buttonsIconSize}>
            <use xlinkHref={`${SPRITE_PATH}#${searchIconID}`} />
         </svg>
      </button>
   );
};
