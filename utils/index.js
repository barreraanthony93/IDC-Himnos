export function toProperCase(str) {
  return str.replace(/[\p{L}']+/gu, (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  });
}

export function sortByNumber(arr) {
  return arr.sort((a, b) => a.number - b.number);
}
