import { CustomSelect } from '@components/CustomSelect/CustomSelect';
import { DEFAULT_SORT_POINT_NUMBER, SORT_LIST } from '@tools/costants';

export const ChoiceSorting = () => {
   return <CustomSelect list={SORT_LIST} defaultPointNumber={DEFAULT_SORT_POINT_NUMBER} />;
};
