import { isEmpty } from './myDash/isEmpty';

export const getTimeInfo = (date: string) => {
  if (isEmpty(date)) return;

  const dateNew = new Date(date);

  const hours = dateNew.getHours();
  const minutes = dateNew.getMinutes();
  const minutesText = minutes.toString().padStart(2, '0');
  const timeText = `${hours}:${minutesText}`;

  // eslint-disable-next-line consistent-return
  return {
    hours,
    minutes,
    minutesText,
    timeText,
  };
};

export const getDate = (dateString: string) => {
  const dateNew = new Date(dateString);

  const year = dateNew.getFullYear();
  const month = dateNew.getMonth() + 1;
  const monthText = `${month < 10 ? `0${month}` : month}`;
  const date = dateNew.getDate();
  const dateText = `${date < 10 ? `0${date}` : date}`;
  const fullDateText = `${dateText}.${monthText}.${year}`;

  return {
    fullDateText,
  };
};
