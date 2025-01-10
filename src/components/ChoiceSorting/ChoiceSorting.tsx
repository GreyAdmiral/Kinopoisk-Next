import { Suspense } from 'react';
import { Loader } from '@components/Loader/Loader';
import { CustomSelect } from '@components/CustomSelect/CustomSelect';
import { DEFAULT_SORT_POINT_NUMBER, SORT_LIST } from '@tools/costants';

export const ChoiceSorting = () => {
   return (
      <>
         <Suspense fallback={<Loader />}>
            <CustomSelect list={SORT_LIST} defaultPointNumber={DEFAULT_SORT_POINT_NUMBER} />
         </Suspense>
      </>
   );
};
