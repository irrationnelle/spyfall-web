import { DefaultValue, selector } from 'recoil';
import InitialSetting, {
  CategoryList, DEFAULT_COUNT_PLAYER, DEFAULT_SETTING, DEFAULT_TIME_MINUTE,
} from '../atoms/InitialSetting';

const shouldStartGameSelector = selector<boolean>({
  key: 'shouldStartGame',
  get: ({ get }) => {
    const initialSetting = get(InitialSetting);
    return initialSetting.shouldStartGame;
  },
  set: ({ set }, shouldStartGame) => set(InitialSetting, (initialSetting) => {
    const initShouldStartGame = shouldStartGame instanceof DefaultValue ? false : shouldStartGame;
    if (initialSetting instanceof DefaultValue) {
      return {
        ...DEFAULT_SETTING,
        shouldStartGame: initShouldStartGame,
      };
    }

    return ({
      ...initialSetting,
      shouldStartGame: initShouldStartGame,
    });
  }),
});

const spyNumberSelector = selector<number>({
  key: 'spyNumber',
  get: ({ get }) => {
    const initialSetting = get(InitialSetting);
    return initialSetting.spyNumber;
  },
  set: ({ set }, spyNumber) => set(InitialSetting, (initialSetting) => {
    const currentSpyNumber = spyNumber instanceof DefaultValue ? 0 : spyNumber;
    if (initialSetting instanceof DefaultValue) {
      return {
        ...DEFAULT_SETTING,
        spyNumber: currentSpyNumber,
      };
    }

    return {
      ...initialSetting,
      spyNumber: currentSpyNumber,
    };
  }),
});

const placeSelector = selector<string>({
  key: 'place',
  get: ({ get }) => {
    const initialSetting = get(InitialSetting);
    return initialSetting.place;
  },
  set: ({ set }, place) => set(InitialSetting, (initialSetting) => {
    const currentPlace = place instanceof DefaultValue ? '허공' : place;

    if (initialSetting instanceof DefaultValue) {
      return {
        ...DEFAULT_SETTING,
        place: currentPlace,
      };
    }

    return {
      ...initialSetting,
      place: currentPlace,
    };
  }),
});

const categorySelector = selector<CategoryList>({
  key: 'category',
  get: ({ get }) => {
    const initialSetting = get(InitialSetting);
    return initialSetting.category;
  },
  set: ({ set }, category) => set(InitialSetting, (initialSetting) => {
    const currentCategory = category instanceof DefaultValue ? CategoryList.BASIC : category;
    if (initialSetting instanceof DefaultValue) {
      return {
        ...DEFAULT_SETTING,
        category: currentCategory,
      };
    }

    return {
      ...initialSetting,
      category: currentCategory,
    };
  }),
});

const countPlayerSelector = selector<number>({
  key: 'countPlayer',
  get: ({ get }) => {
    const initialSetting = get(InitialSetting);
    return initialSetting.countPlayer;
  },
  set: ({ set }, countPlayer) => set(InitialSetting, (initialSetting) => {
    const initCategory = countPlayer instanceof DefaultValue ? DEFAULT_COUNT_PLAYER : countPlayer;

    if (initialSetting instanceof DefaultValue) {
      return {
        ...DEFAULT_SETTING,
        countPlayer: initCategory,
      };
    }

    return {
      ...initialSetting,
      countPlayer: initCategory,
    };
  }),
});

const timeSelector = selector<number>({
  key: 'time',
  get: ({ get }) => {
    const initialSetting = get(InitialSetting);
    return initialSetting.time;
  },
  set: ({ set }, time) => set(InitialSetting, (initialSetting) => {
    const currentTime = time instanceof DefaultValue ? DEFAULT_TIME_MINUTE : time;
    if (initialSetting instanceof DefaultValue) {
      return {
        ...DEFAULT_SETTING,
        time: currentTime,
      };
    }

    return {
      ...initialSetting,
      time: currentTime,
    };
  }),
});

export {
  shouldStartGameSelector,
  spyNumberSelector,
  placeSelector,
  categorySelector,
  countPlayerSelector,
  timeSelector,
};
