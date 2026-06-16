function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function capitalize(sentence: string): string {
  return sentence
    .split(" ")
    .map((word: string) => capitalizeFirstLetter(word))
    .join(" ");
}

export function getAuthorImg(author: string): string {
  return author.toLowerCase() === "magius"
    ? "/img/author/magius.webp"
    : "/img/author/randomcityzen.webp";
}

export const truncate = (str: string, n: number) => {
  return str?.toString().replace(new RegExp(`(.{${n - 1}})..+`), "$1...");
};
