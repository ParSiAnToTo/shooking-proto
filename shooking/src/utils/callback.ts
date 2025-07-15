export const fetchData = (callback: (data: string) => void): void => {
  setTimeout(() => {
    callback('jest testing...');
  }, 100);
};