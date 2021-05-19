import { DefaultValue, selector } from 'recoil';
import InitialSetting, {
  CategoryList, DEFAULT_COUNT_PLAYER, DEFAULT_TIME_MINUTE,
} from '../atoms/InitialSetting';

const shouldStartGameSelector = selector<boolean>({
  key: 'shouldStartGame',
  get: ({ get }) => {
    const initialSetting = get(InitialSetting);
    return initialSetting.shouldStartGame;
  },
  set: ({ set }, shouldStartGame) => set(InitialSetting, (initialSetting) => ({
    ...initialSetting,
    shouldStartGame: shouldStartGame instanceof DefaultValue ? false : shouldStartGame,
  })),
});

const spyNumberSelector = selector<number>({
  key: 'spyNumber',
  get: ({ get }) => {
    const initialSetting = get(InitialSetting);
    return initialSetting.spyNumber;
  },
  set: ({ set }, spyNumber) => set(InitialSetting, (initialSetting) => ({
    ...initialSetting,
    spyNumber: spyNumber instanceof DefaultValue ? 0 : spyNumber,
  })),
});

const placeSelector = selector<string>({
  key: 'place',
  get: ({ get }) => {
    const initialSetting = get(InitialSetting);
    return initialSetting.place;
  },
  set: ({ set }, place) => set(InitialSetting, (initialSetting) => ({
    ...initialSetting,
    place: place instanceof DefaultValue ? '허공' : place,
  })),
});

const categorySelector = selector<CategoryList>({
  key: 'category',
  get: ({ get }) => {
    const initialSetting = get(InitialSetting);
    return initialSetting.category;
  },
  set: ({ set }, category) => set(InitialSetting, (initialSetting) => ({
    ...initialSetting,
    category: category instanceof DefaultValue ? CategoryList.BASIC : category,
  })),
});

const countPlayerSelector = selector<number>({
  key: 'countPlayer',
  get: ({ get }) => {
    const initialSetting = get(InitialSetting);
    return initialSetting.countPlayer;
  },
  set: ({ set }, countPlayer) => set(InitialSetting, (initialSetting) => ({
    ...initialSetting,
    countPlayer: countPlayer instanceof DefaultValue ? DEFAULT_COUNT_PLAYER : countPlayer,
  })),
});

const timeSelector = selector<number>({
  key: 'time',
  get: ({ get }) => {
    const initialSetting = get(InitialSetting);
    return initialSetting.time;
  },
  set: ({ set }, time) => set(InitialSetting, (initialSetting) => ({
    ...initialSetting,
    time: time instanceof DefaultValue ? DEFAULT_TIME_MINUTE : time,
  })),
});

export {
  shouldStartGameSelector,
  spyNumberSelector,
  placeSelector,
  categorySelector,
  countPlayerSelector,
  timeSelector,
};
