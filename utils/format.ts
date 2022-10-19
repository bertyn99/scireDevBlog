function capitalize(sentence: string): string {
  return sentence
    .split(" ")
    .map((word: string, index: number) => word)
    .join(" ");
}

function getAuthorImg(author: string): string {
  return author == "Magius"
    ? "./img/author/magius.webp"
    : "./img/author/randomcityzen.webp";
}
export { capitalize, getAuthorImg };
