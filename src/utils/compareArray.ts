function areEqual<T>(array1: T[], array2: T[]): boolean {
  if (array1.length === array2.length) {
    return array1.every((element, index) => {
      if (element === array2[index]) {
        return true;
      }

      return false;
    });
  }

  return false;
}

export { areEqual };
