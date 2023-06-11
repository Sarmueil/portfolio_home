export const shortenString = (input: string, maxLength: number): string => {
  if (input.length <= maxLength) {
    return input; // No need to shorten the string
  }

  const shortenedString = input.substring(0, maxLength) + "...";
  return shortenedString;
}

export function replacePercentWithDash(str: string): string {
  return str.replace(/%/g, '-');
}

export const dateFn = (data: any) => {
  if (!data) return;
  const date = new Date(isNaN(data) ? data : Number(data));
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};
