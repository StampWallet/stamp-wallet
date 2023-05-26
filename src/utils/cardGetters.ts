import { LocalCard, VirtualCard } from '../types';

interface Props {
  content: LocalCard | VirtualCard;
}

export const getName = ({ content }: Props) => {
  if ('name' in content) return content.name;
  return content.businessDetails.name;
};

export const getImage = ({ content }: Props) => {
  if ('image' in content) return content.image;
  return content.businessDetails.bannerImageId;
};
