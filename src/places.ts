import { CategoryList } from './atoms/InitialSetting';
import { randomIntFromInterval } from './helper';

const basic = ['학교', '병원', '공항', '카페'];
const country = ['일본', '노르웨이', '러시아', '프랑스'];
const strange = ['합주실', '핵폐기물 저장소', '바이올린 공방', '심해'];

const places = {
  basic,
  country,
  strange,
};

const getPlace = (category: CategoryList): string => {
  const selectedPlaces = getPlaces(category);
  return getRandomPlace(selectedPlaces);
};

const getPlaces = (category: CategoryList): string[] => {
  const selectedPlaces = category === CategoryList.ALL
    ? [...basic, ...country, ...strange]
    : places[category];
  return selectedPlaces;
};

// eslint-disable-next-line max-len
const getRandomPlace = (targetPlaces: string[]) => targetPlaces[randomIntFromInterval(0, targetPlaces.length - 1)];

export {
  places,
  getPlace,
  getPlaces,
};
