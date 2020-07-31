const createSequentialNumberArray = (size: number): number[] => {
  let arr: number[] = [];
  for (let i = 0; i < size; i += 1) {
    arr = [...arr, i];
  }
  return arr;
};

export default createSequentialNumberArray;
