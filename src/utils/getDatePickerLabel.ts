const getDatePickerLabel = (date: string) => {
  if (date === 'dateFrom') {
    return 'date from';
  }
  if (date === 'dateTo') {
    return 'date to';
  }

  return date;
};

export default getDatePickerLabel;
