import { Option } from './OptionRow';

const filterOptions: Option[] = [
  {
    key: {
      name: 'name',
      type: 'desc',
    },
    label: 'A->Z',
  },
  {
    key: {
      name: 'name',
      type: 'asc',
    },
    label: 'Z->A',
  },
  {
    key: {
      name: 'addition',
      type: 'desc',
    },
    label: '',
  },
  {
    key: {
      name: 'addition',
      type: 'asc',
    },
    label: '',
  },
  {
    key: {
      name: 'usage',
      type: 'desc',
    },
    label: '',
  },
  {
    key: {
      name: 'usage',
      type: 'asc',
    },
    label: '',
  },
  {
    key: {
      name: 'card',
      type: 'virtual',
    },
    label: 'virtual',
  },
  {
    key: {
      name: 'card',
      type: 'real',
    },
    label: 'real',
  },
];

export default filterOptions;
