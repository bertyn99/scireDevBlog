function capitalize(sentence: string): string {
  return sentence
    .split(" ")
    .map((word: string, index: number) => word)
    .join(" ");
}

function getAuthorImg(author: string): string {
  return author.toLowerCase() == "magius"
    ? "/img/author/magius.webp"
    : "/img/author/randomcityzen.webp";
}

const truncate = (str: string, n: number) => {
  return str?.toString().replace(new RegExp(`(.{${n - 1}})..+`), "$1...");
};
export { capitalize, getAuthorImg, truncate };
