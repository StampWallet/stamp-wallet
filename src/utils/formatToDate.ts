const formatToDate = (date: string) => {
  const parts = date.slice(0, 10).split('-');

  return `${parts[0]}-${parts[1]}-${parts[2]}`;
};

export default formatToDate;
