export type Month =
  | 'gener'
  | 'febrer'
  | 'març'
  | 'abril'
  | 'maig'
  | 'juny'
  | 'juliol'
  | 'agost'
  | 'setembre'
  | 'octubre'
  | 'novembre'
  | 'desembre';

export const monthToDateMonth = (month: Month): string => {
  switch (month) {
    case 'gener':
      return '01';
    case 'febrer':
      return '02';
    case 'març':
      return '03';
    case 'abril':
      return '04';
    case 'maig':
      return '05';
    case 'juny':
      return '06';
    case 'juliol':
      return '07';
    case 'agost':
      return '08';
    case 'setembre':
      return '09';
    case 'octubre':
      return '10';
    case 'novembre':
      return '11';
    case 'desembre':
      return '12';
    default:
      return '';
  }
};

export const formatMonthToDateMonth = (month: number): string => {
  switch (month) {
    case 0:
      return '01';
    case 1:
      return '02';
    case 2:
      return '03';
    case 3:
      return '04';
    case 4:
      return '05';
    case 5:
      return '06';
    case 6:
      return '07';
    case 7:
      return '08';
    case 8:
      return '09';
    case 9:
      return '10';
    case 10:
      return '11';
    case 11:
      return '12';
    default:
      return '';
  }
};

export const formatDayToDateDay = (day: number): string => {
  if (day >= 10) return day.toString();
  return `0${day}`;
};
export function subtractYears(date: Date, years: number): Date {
  const dateCopy = new Date(date);
  dateCopy.setFullYear(dateCopy.getFullYear() - years);
  return dateCopy;
}
