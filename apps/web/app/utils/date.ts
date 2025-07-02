import { format as dateFnsFormat } from "date-fns";
import { ca } from "date-fns/locale";

function format(date: Date | number, format: string) {
  return dateFnsFormat(date, format, { locale: ca });
}

export function formatTextDate(date: Date | number) {
  return format(date, "dd MMM yyyy");
}

export function formatFullDate(date: Date | number) {
  return format(date, "P");
}
