import { atom } from 'recoil';
import { CategoryList } from '../App';

const DEFAULT_TIME_MINUTE = 5;

const InitialSettingState = atom({
  key: 'initialSetting',
  default: {
    shouldStateGame: false,
    category: CategoryList.BASIC,
    spyNumber: 0,
    place: '허공',
    time: DEFAULT_TIME_MINUTE,
  },
});

export default InitialSettingState;
