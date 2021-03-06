import moment from 'moment';
import orderBy from 'lodash/orderBy';
import uniqBy from 'lodash/uniqBy';

export const formatMonthYear = (date) => {
  return moment(date).format(`MMMM DD, YYYY`);
};

export const formatDate = (date) => {
  return moment(date).format(`YYYY-MM-DD`);
};

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const adapterOffer = (offer) => {
  return (
    {
      id: offer.id,
      city: {
        location: {
          coordinates: [offer.city.location.latitude, offer.city.location.longitude],
          zoom: offer.city.location.zoom,
        },
        name: offer.city.name,
      },
      coordinates: [offer.location.latitude, offer.location.longitude],
      isPremium: offer.is_premium,
      images: offer.images,
      previewImage: offer.preview_image,
      price: offer.price,
      title: offer.title,
      type: offer.type,
      description: offer.description,
      bedroomsCount: offer.bedrooms,
      guestsCount: offer.max_adults,
      facilities: offer.goods,
      rating: offer.rating,
      host: {
        avatar: offer.host.avatar_url,
        name: offer.host.name,
        isSuper: offer.host.is_pro,
      },
      isFavorites: offer.is_favorite,
    }
  );
};

export const adapterOffers = (offers) => {
  return offers.map((offer) => {
    return adapterOffer(offer);
  });
};

export const adapterComments = (comments) => {
  return comments.map((comment) => {
    return (
      {
        id: comment.id,
        authorAvatar: comment.user.avatar_url,
        authorName: comment.user.name,
        rating: comment.rating,
        date: new Date(comment.date),
        text: comment.comment,
      }
    );
  });
};

export const adapterUser = (user) => {
  return (
    {
      id: user.id,
      name: user.name,
      avatarUrl: user.avatar_url,
      isSuper: user.is_pro,
      email: user.email,
    }
  );
};

export const getCityOffersList = (city, offers) => {
  if (offers.length > 0) {
    return offers.filter((offer) => offer.city.name.toLowerCase() === city.toLowerCase());
  }
  return [];
};

export const sortOffers = (sortType, offers) => {
  switch (sortType) {
    case `DEFAULT`:
      return offers;
    case `PRICE_UP`:
      return orderBy(offers, `price`);
    case `PRICE_DOWN`:
      return orderBy(offers, [`price`], [`desc`]);
    case `RATING`:
      return orderBy(offers, [`rating`], [`desc`]);
  }
  return offers;
};

export const getCityList = (offers) => {
  if (offers.length < 1) {
    return [];
  }
  const cities = offers.map((offer) => offer.city);
  const uniqCities = uniqBy(cities, `name`);
  return Array.from(uniqCities).sort();
};

export const replaceOffer = (offer, offers) => {
  const index = offers.findIndex((currentOffer) => currentOffer.id === offer.id);

  if (index === -1) {
    return offers;
  }

  return [].concat(offers.slice(0, index), offer, offers.slice(index + 1));
};

export const getUrlParam = (param) => {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
};

export const getFavoriteOffers = (offers) => {
  if (offers.length < 1) {
    return offers;
  }
  const cities = getCityList(offers);
  return cities.map((city) => {
    const cityOffers = getCityOffersList(city.name, offers);
    return {
      city: city.name,
      offers: cityOffers
    };
  });
};

