import { LocalCard, VirtualCard } from '../types';

//interface usuniety bo nie chce dzialac xd

interface Props {
  Card: (LocalCard | VirtualCard) & { isAdded?: boolean };
}

export const getName = ({ Card }: Props) => {
  if ('name' in Card) return Card.name;
  if ('businessDetails' in Card) return Card.businessDetails.name;
  return undefined;
};

//getName({Card: card});

export const getImage = ({ Card }: Props) => {
  if ('image' in Card) return Card.image;
  if ('businessDetails' in Card) return Card.businessDetails.bannerImageId;
  return undefined;
};

export const getBusinessDetails = ({ Card }: Props) => {
  if ('businessDetails' in Card) return Card.businessDetails;
  return undefined;
};

export const getPoints = ({ Card }: Props) => {
  if ('points' in Card) return Card.points;
  return undefined;
};

export const getInventory = ({ Card }: Props) => {
  if ('inventory' in Card) return Card.inventory;
  return undefined;
};
