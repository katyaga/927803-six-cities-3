import {OFFERS_TITLES, RealtyType} from "../const";

export const offers = [
  {
    id: 1,
    isPremium: true,
    image: `img/apartment-01.jpg`,
    price: 80,
    title: OFFERS_TITLES[0],
    type: RealtyType.APARTMENT,
    rating: 4,
  },
  {
    id: 2,
    isPremium: false,
    image: `img/apartment-02.jpg`,
    price: 100,
    title: OFFERS_TITLES[1],
    type: RealtyType.HOTEL,
    rating: 3,
  },
  {
    id: 3,
    isPremium: true,
    image: `img/apartment-03.jpg`,
    price: 50,
    title: OFFERS_TITLES[2],
    type: RealtyType.HOUSE,
    rating: 2,
  },
  {
    id: 4,
    isPremium: false,
    image: `img/apartment-01.jpg`,
    price: 70,
    title: OFFERS_TITLES[3],
    type: RealtyType.ROOM,
    rating: 5,
  }
];
