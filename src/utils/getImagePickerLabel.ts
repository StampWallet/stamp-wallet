const PICKER_LABELS = {
  cardIcon: 'Card icon',
  banner: 'Banner',
  menu: 'Menu',
  benefitIcon: 'Benefit Icon',
};

const getImagePickerLabel = (name: string) => PICKER_LABELS[name] || 'Pick an image';

export default getImagePickerLabel;
