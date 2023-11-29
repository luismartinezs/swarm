export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function withError<T extends () => Promise<any>>(cb: T) {
  try {
    return cb();
  } catch (err) {
    console.error(err);
    return err;
  }
}

export function camelCase(str: string) {
  // Using replace method with regEx
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
    return index == 0 ? word.toLowerCase() : word.toUpperCase();
  }).replace(/\s+/g, '');
}