import { Card } from '../../types';
import { benefits } from './Benefits';

export const cards: Card[] = [
  {
    type: 'local',
    content: {
      publicId: '1',
      name: 'Biedronka',
      type: 'chrumaczak',
      code: '1234',
      image: require('../images/biedronka_homepage.jpg'),
    },
    isAdded: true,
  },

  {
    type: 'virtual',
    content: {
      businessDetails: {
        publicId: '1',
        name: 'Lidl',
        description: 'ąę',
        gpsCoordinates: '0',
        iconImageId: 'test',
        bannerImageId: require('../images/lidl.png'),
      },
      benefits: benefits,
    },
    isAdded: false,
  },

  {
    type: 'virtual',
    content: {
      businessDetails: {
        publicId: '1',
        name: 'Akbar brothers',
        description: 'ąę',
        gpsCoordinates: '0',
        bannerImageId: require('../images/akbar.png'),
        iconImageId: 'test',
      },
      points: 10000,
      benefits: benefits,
      inventory: [],
    },
    isAdded: true,
  },

  {
    type: 'virtual',
    content: {
      businessDetails: {
        publicId: '1',
        name: 'Costadoro Coffee',
        description: 'ąę',
        gpsCoordinates: '0',
        bannerImageId: require('../images/costadoro.png'),
        iconImageId: 'test',
      },
      points: 100,
      benefits: benefits,
      inventory: [],
    },
    isAdded: true,
  },
  {
    type: 'virtual',
    content: {
      businessDetails: {
        publicId: '1',
        name: 'Decathlon',
        description: 'ąę',
        gpsCoordinates: '0',
        bannerImageId: require('../images/decathlon.png'),
        iconImageId: 'test',
      },
      points: 100,
      benefits: benefits,
      inventory: [],
    },
    isAdded: true,
  },
  {
    type: 'virtual',
    content: {
      businessDetails: {
        publicId: '1',
        name: 'Deichmann',
        description: 'ąę',
        gpsCoordinates: '0',
        bannerImageId: require('../images/deichmann.png'),
        iconImageId: 'test',
      },
      points: 100,
      benefits: benefits,
      inventory: [],
    },
    isAdded: true,
  },
  {
    type: 'virtual',
    content: {
      businessDetails: {
        publicId: '1',
        name: 'Espirit',
        description: 'ąę',
        gpsCoordinates: '0',
        bannerImageId: require('../images/espirit.png'),
        iconImageId: 'test',
      },
      points: 100,
      benefits: benefits,
      inventory: [],
    },
    isAdded: true,
  },
  {
    type: 'virtual',
    content: {
      businessDetails: {
        publicId: '1',
        name: 'Kaufland',
        description: 'ąę',
        gpsCoordinates: '0',
        bannerImageId: require('../images/kaufland.png'),
        iconImageId: 'test',
      },
      points: 100,
      benefits: benefits,
      inventory: [],
    },
    isAdded: true,
  },
  {
    type: 'virtual',
    content: {
      businessDetails: {
        publicId: '1',
        name: 'Maggi spices',
        description: 'ąę',
        gpsCoordinates: '0',
        bannerImageId: require('../images/maggi.png'),
        iconImageId: 'test',
      },
      points: 100,
      benefits: benefits,
      inventory: [],
    },
    isAdded: true,
  },
  {
    type: 'virtual',
    content: {
      businessDetails: {
        publicId: '1',
        name: 'Pollo Feliz',
        description: 'ąę',
        gpsCoordinates: '0',
        bannerImageId: require('../images/pollofeliz.png'),
        iconImageId: 'test',
      },
      points: 100,
      benefits: benefits,
      inventory: [],
    },
    isAdded: true,
  },
  {
    type: 'virtual',
    content: {
      businessDetails: {
        publicId: '1',
        name: 'Roblox',
        description: 'ąę',
        gpsCoordinates: '0',
        bannerImageId: require('../images/roblox.png'),
        iconImageId: 'test',
      },
      points: 100,
      benefits: benefits,
      inventory: [],
    },
    isAdded: true,
  },
  {
    type: 'virtual',
    content: {
      businessDetails: {
        publicId: '1',
        name: 'Stock',
        description: 'ąę',
        gpsCoordinates: '0',
        bannerImageId: require('../images/stock.png'),
        iconImageId: 'test',
      },
      points: 100,
      benefits: benefits,
      inventory: [],
    },
    isAdded: true,
  },
];
