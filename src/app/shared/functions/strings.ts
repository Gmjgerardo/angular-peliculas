export function capitalizeString(text: string): string {
  let result: string = '';

  result = text.replace(/^(\w)/, (match: string) => match.toUpperCase());

  return result;
}