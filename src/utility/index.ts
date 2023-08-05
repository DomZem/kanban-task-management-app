export const transformToKebabCase = (input: string): string =>
  input.toLowerCase().replace(/\s+/g, '-');

export const transformToPascalCase = (input: string): string => {
  // Remove special characters like "/"
  const cleanedInput = input.replace(/[/]/g, '');

  const words = cleanedInput.split('-');
  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1)
  );
  return capitalizedWords.join(' ');
};
