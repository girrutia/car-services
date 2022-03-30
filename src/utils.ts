export const getYearOptions = () => {
  const years: ComboType[] = [];
  for (let i = new Date().getFullYear(); i >= 1930; i--) {
    years.push({ value: i, label: i.toString() });
  }
  return years;
};
