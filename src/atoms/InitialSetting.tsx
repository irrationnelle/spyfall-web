import { atom } from 'recoil';

export const DEFAULT_TIME_MINUTE = 5;
export const DEFAULT_COUNT_PLAYER = 4;

export enum CategoryList {
  ALL = 'all',
  BASIC = 'basic',
  COUNTRY = 'country',
  STRANGE = 'strange'
}

export const DEFAULT_SETTING = {
  shouldStartGame: false,
  countPlayer: DEFAULT_COUNT_PLAYER,
  category: CategoryList.BASIC,
  spyNumber: 0,
  place: '허공',
  time: DEFAULT_TIME_MINUTE,
};

const InitialSettingState = atom({
  key: 'initialSetting',
  default: DEFAULT_SETTING,
});

export default InitialSettingState;
