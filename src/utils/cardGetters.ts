import { Card } from '../types';

interface Props {
  Card: Card;
}

export const getName = ({ Card }: Props) => {
  if ('name' in Card) return Card.name;
  if ('businessDetails' in Card) return Card.businessDetails.name;
  return undefined;
};

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
  if ('ownedItems' in Card) return Card.ownedItems;
  return [];
};
