import React from "react";
import renderer from "react-test-renderer";
import OfferInfo from "./offer-info.jsx";

const MockOffers = [
  {
    id: 2,
    city: `Amsterdam`,
    coordinates: [52.3, 4.8],
    isPremium: true,
    images: [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`
    ],
    price: 20,
    title: `apartment2`,
    type: `Private Room`,
    rating: 3,
    isFavorites: false,
    nearbyOffers: [1, 3],
  },
  {
    id: 3,
    city: `Cologne`,
    coordinates: [52.3, 4.8],
    isPremium: true,
    images: [
      `img/apartment-01.jpg`,
      `img/apartment-02.jpg`,
      `img/apartment-03.jpg`
    ],
    price: 30,
    title: `apartment3`,
    type: `Hotel`,
    rating: 4,
    isFavorites: false,
    nearbyOffers: [1, 2],
  },
];

const MockOffer = {
  id: 1,
  city: `Brussels`,
  coordinates: [52.3, 4.8],
  isPremium: true,
  images: [
    `img/apartment-01.jpg`,
    `img/apartment-02.jpg`,
    `img/apartment-03.jpg`
  ],
  price: 10,
  title: `apartment1`,
  type: `Apartment`,
  description: `Description`,
  bedroomsCount: 10,
  guestsCount: 3,
  facilities: [
    `Wifi`,
    `Heating`,
    `Kitchen`
  ],
  rating: 1,
  host: {
    avatar: `img/avatar-max.jpg`,
    name: `Max`,
    isSuper: true,
  },
  isFavorites: true,
  comments: [
    {
      id: 1,
      coordinates: [52.3, 4.8],
      authorAvatar: `img/avatar-angelina.jpg`,
      authorName: `Angelina`,
      rating: 5,
      date: new Date(`2019-12-23 12:00:11`),
      text: `text1`,
    },
    {
      id: 2,
      coordinates: [52.3, 4.8],
      authorAvatar: `img/avatar-max.jpg`,
      authorName: `Tom`,
      rating: 5,
      date: new Date(`2020-02-23 12:00:11`),
      text: `text2`,
    },
    {
      id: 3,
      coordinates: [52.3, 4.8],
      authorAvatar: `img/avatar-max.jpg`,
      authorName: `Bob`,
      rating: 4,
      date: new Date(`2020-01-23 12:00:11`),
      text: `text3`,
    },
  ],
  nearbyOffers: [2, 3],
};

it(`Should OfferInfo render correctly`, () => {
  const tree = renderer
    .create(<OfferInfo
      offer={MockOffer}
      onTitleClick={() => {}}
      offers={MockOffers}
    />, {
      createNodeMock: () => {
        return document.createElement(`div`);
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
