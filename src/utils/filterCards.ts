import { OptionName, OptionType } from '../components/Bars/SearchBar/OptionRow';

//temp
function getName(card) {
  if (card.type === 'virtual') return card.content.businessDetails.name;
  return card.content.name;
}
const compareNamesAsc = (a, b) => {
  const nameA = getName(a).toUpperCase();
  const nameB = getName(b).toUpperCase();

  if (nameA > nameB) {
    return -1;
  }

  if (nameA < nameB) {
    return 1;
  }

  return 0;
};
const compareNamesDesc = (a, b) => {
  const nameA = getName(a).toUpperCase();
  const nameB = getName(b).toUpperCase();

  if (nameA < nameB) {
    return -1;
  }

  if (nameA > nameB) {
    return 1;
  }

  return 0;
};

const sortByCardType = (cards, type: 'virtual' | 'real') => {
  const virtualCards = cards.filter((card) => card.type === 'virtual');
  const realCards = cards.filter((card) => card.type !== 'virtual');

  return type === 'virtual' ? [...virtualCards, ...realCards] : [...realCards, ...virtualCards];
};
const filterCards = (name: OptionName, type: OptionType, cards: any[]): any[] => {
  switch (name) {
    case 'name':
      return type === 'asc' ? cards.sort(compareNamesAsc) : cards.sort(compareNamesDesc);
    case 'addition':
      return cards;
    case 'usage':
      return cards;
    case 'card':
      // TODO: wait for Card type
      // @ts-ignore
      return sortByCardType(cards, type);
    default:
      return cards;
  }
};

export default filterCards;
