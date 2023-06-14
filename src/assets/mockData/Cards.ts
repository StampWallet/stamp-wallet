import { LocalCard, VirtualCard } from '../../types';
import { benefits } from './Benefits';

export const cards = [
  {
    publicId: '1',
    name: 'Biedronka',
    type: 'chrumaczak',
    code: '1234',
    imageUrl: require('../images/biedronka_homepage.jpg'), //brak w api na razie
    isAdded: true,
  },
  {
    businessDetails: {
      publicId: '1',
      name: 'Lidl',
      description: 'ąę',
      gpsCoordinates: '0',
      iconimageId: 'test',
      bannerimageId: require('../images/lidl.png'),
    },
    points: 1000,
    inventory: [],
    isAdded: true,
    //benefits: benefits,
  },

  {
    businessDetails: {
      publicId: '1',
      name: 'Akbar brothers',
      description: 'ąę',
      gpsCoordinates: '0',
      bannerimageId: require('../images/akbar.png'),
      iconimageId: 'test',
    },
    points: 10000,
    inventory: [],
    isAdded: true,
  },

  {
    businessDetails: {
      publicId: '1',
      name: 'Costadoro Coffee',
      description: 'ąę',
      gpsCoordinates: '0',
      bannerimageId: require('../images/costadoro.png'),
      iconimageId: 'test',
    },
    points: 100,
    inventory: [],
    isAdded: true,
  },
  {
    businessDetails: {
      publicId: '1',
      name: 'Decathlon',
      description: 'ąę',
      gpsCoordinates: '0',
      bannerimageId: require('../images/decathlon.png'),
      iconimageId: 'test',
    },
    points: 100,
    inventory: [],
    isAdded: true,
  },
  {
    businessDetails: {
      publicId: '1',
      name: 'Deichmann',
      description: 'ąę',
      gpsCoordinates: '0',
      bannerimageId: require('../images/deichmann.png'),
      iconimageId: 'test',
    },
    points: 100,
    inventory: [],
    isAdded: true,
  },
  {
    businessDetails: {
      publicId: '1',
      name: 'Espirit',
      description: 'ąę',
      gpsCoordinates: '0',
      bannerimageId: require('../images/espirit.png'),
      iconimageId: 'test',
    },
    points: 100,
    inventory: [],
    isAdded: true,
  },
  {
    businessDetails: {
      publicId: '1',
      name: 'Kaufland',
      description: 'ąę',
      gpsCoordinates: '0',
      bannerimageId: require('../images/kaufland.png'),
      iconimageId: 'test',
    },
    points: 100,
    inventory: [],
    isAdded: true,
  },
  {
    businessDetails: {
      publicId: '1',
      name: 'Maggi spices',
      description: 'ąę',
      gpsCoordinates: '0',
      bannerimageId: require('../images/maggi.png'),
      iconimageId: 'test',
    },
    points: 100,
    inventory: [],
    isAdded: true,
  },
  {
    businessDetails: {
      publicId: '1',
      name: 'Pollo Feliz',
      description: 'ąę',
      gpsCoordinates: '0',
      bannerimageId: require('../images/pollofeliz.png'),
      iconimageId: 'test',
    },
    points: 100,
    inventory: [],
    isAdded: true,
  },
  {
    businessDetails: {
      publicId: '1',
      name: 'Roblox',
      description: 'ąę',
      gpsCoordinates: '0',
      bannerimageId: require('../images/roblox.png'),
      iconimageId: 'test',
    },
    points: 100,
    inventory: [],
    isAdded: true,
  },
  {
    businessDetails: {
      publicId: '1',
      name: 'Stock',
      description: 'ąę',
      gpsCoordinates: '0',
      bannerimageId: require('../images/stock.png'),
      iconimageId: 'test',
    },
    points: 100,
    inventory: [],
    isAdded: true,
  },
];
