import { ImageSourcePropType } from 'react-native/types';

export type LoginFormData = {
  email: string;
  password: string;
};

export type RegistrationFormData = {
  name: string;
  email: string;
  password: string;
  passwordRepeated: string;
};

export type BusinessRegistrationFormData = {
  name: string;
  surname: string;
  email: string;
  phoneNumber: string;
  NIP: string;
  KRS: string;
  REGON: string;
  businessName: string;
  businessAddress: string;
  postalCode: string;
  city: string;
};

//na podstawie schematu api

export type Date = {
  //idk jak nazwac xd
  type: string;
  //format: date-time
  nullable: boolean;
};

export type BenefitFormData = {
  name: string;
  price: number; //int
  description: string;
  imageId: string;
  startDate: Date;
  endDate: Date;
  maxAmount: number; //int
};

type UUID = string;

export type Benefit = {
  publicId: UUID;
  name: string;
  price: number; //int
  description: string;
  imageId: string;
  startDate: Date;
  endDate: Date;
  maxAmount: number; //int
  available: boolean;
};

export type BusinessDetails = {
  publicId: string;
  name: string;
  description: string;
  gpsCoordinates: string;
  bannerImageId: ImageSourcePropType; //temp, string od api (adapter)?
  iconImageId: string;
  menuImageIds?: string[];
  itemDefinitions?: Benefit[];
};

export type InventoryElem = {
  publicId: UUID;
  amount: number;
  name: string;
};

export type VirtualCard = {
  businessDetails: BusinessDetails;
  points?: number; //int
  inventory?: InventoryElem[];
};

export type LocalCard = {
  publicId: string;
  name: string;
  type: string;
  code: string;
  image: ImageSourcePropType; //jw
};

export type Card = (VirtualCard | LocalCard) & { isAdded?: boolean };
