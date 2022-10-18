function capitalize(sentence: string): string {
  return sentence
    .split(" ")
    .map((word: string, index: number) => word)
    .join(" ");
}

export { capitalize };
