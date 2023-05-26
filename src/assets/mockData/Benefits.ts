import { Benefit } from '../../types';

export const benefits: Benefit[] = [
  {
    publicId: '1',
    name: 'test1',
    price: 100,
    description: 'test1',
    imageId: 'chrumczak',
    startDate: {
      type: 'ąąą',
      //format:
      nullable: false,
    },
    endDate: {
      type: 'ęęę',
      //format:
      nullable: true,
    },
    maxAmount: 100,
    available: true,
  },
  {
    publicId: '2',
    name: 'test2',
    price: 200,
    description: 'test2',
    imageId: 'chrumczak',
    startDate: {
      type: 'ąąą',
      //format:
      nullable: false,
    },
    endDate: {
      type: 'ęęę',
      //format:
      nullable: false,
    },
    maxAmount: 100,
    available: true,
  },
  {
    publicId: '3',
    name: 'test3',
    price: 300,
    description: 'test3',
    imageId: 'chrumczak',
    startDate: {
      type: 'ąąą',
      //format:
      nullable: false,
    },
    endDate: {
      type: 'ęęę',
      //format:
      nullable: false,
    },
    maxAmount: 100,
    available: true,
  },
  {
    publicId: '4',
    name: 'test4',
    price: 400,
    description: 'test4',
    imageId: 'chrumczak',
    startDate: {
      type: 'ąąą',
      //format:
      nullable: false,
    },
    endDate: {
      type: 'ęęę',
      //format:
      nullable: false,
    },
    maxAmount: 100,
    available: true,
  },
];
