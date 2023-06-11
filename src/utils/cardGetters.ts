import { LocalCard, VirtualCard } from '../types';

interface Props {
  item: LocalCard | VirtualCard;
}

export const getName = ({ item }: Props) => {
  console.log(item);
  if ('name' in item) return item.name;
  return item.businessDetails.name;
};

export const getImage = ({ item }: Props) => {
  if ('imageUrl' in item) return item.imageUrl;
  return item.businessDetails.bannerImageId;
};
