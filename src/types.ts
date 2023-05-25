export type LoginFormData = {
  email: string;
  password: string;
};

export type CardType = 'virtual' | 'real';

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

export type BenefitFormData = {
  name: string;
  price: number;
  description: string;
  /*
  waiting for components implem
  imageId: string,
  or image: ImageSourcePropType
  startDate: string, (?)
  endDate: string,
  */
  maxAmount: number; //check if int somehow
};
