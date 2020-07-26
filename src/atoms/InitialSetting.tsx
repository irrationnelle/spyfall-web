import { atom } from 'recoil';

const DEFAULT_TIME_MINUTE = 5;
const DEFAULT_COUNT_PLAYER = 4;
enum CategoryList {
  ALL = 'all',
  BASIC = 'basic',
  COUNTRY = 'country',
  STRANGE = 'strange'
}

const InitialSettingState = atom({
  key: 'initialSetting',
  default: {
    shouldStartGame: false,
    countPlayer: DEFAULT_COUNT_PLAYER,
    category: CategoryList.BASIC,
    spyNumber: 0,
    place: '허공',
    time: DEFAULT_TIME_MINUTE,
  },
});

export default InitialSettingState;
