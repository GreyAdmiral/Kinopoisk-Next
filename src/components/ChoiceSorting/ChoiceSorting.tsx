import { CustomSelect } from '@components/CustomSelect/CustomSelect';
import { SORT_LIST } from '@tools/costants';

export const ChoiceSorting = () => {
   return <CustomSelect list={SORT_LIST} defaultPointNumber={1} />;
};
