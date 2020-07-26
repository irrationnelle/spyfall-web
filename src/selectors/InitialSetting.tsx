import { selector } from 'recoil';
import InitialSetting from '../atoms/InitialSetting';
import { CategoryList } from '../App';

const shouldStartGameSelector = selector({
  key: 'shouldStartGame',
  get: ({ get }) => {
    const initialSetting = get(InitialSetting);
    return initialSetting.shouldStartGame;
  },
  set: ({ set }, shouldStartGame) => set(InitialSetting, (initialSetting) => ({
    ...initialSetting,
    shouldStartGame,
  })),
});

const spyNumberSelector = selector({
  key: 'spyNumber',
  get: ({ get }) => {
    const initialSetting = get(InitialSetting);
    return initialSetting.spyNumber;
  },
  set: ({ set }, spyNumber) => set(InitialSetting, (initialSetting) => ({
    ...initialSetting,
    spyNumber,
  })),
});

const placeSelector = selector({
  key: 'place',
  get: ({ get }) => {
    const initialSetting = get(InitialSetting);
    return initialSetting.place;
  },
  set: ({ set }, place) => set(InitialSetting, (initialSetting) => ({
    ...initialSetting,
    place,
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
    category,
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
    countPlayer,
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
    time,
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
