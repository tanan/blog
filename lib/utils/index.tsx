export const toFormatDate = (d: string) => {
  const date = new Date(d);
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};
