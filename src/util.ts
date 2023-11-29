export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function withError(cb) {
  try {
    return cb();
  } catch (err) {
    console.error(err);
    return err;
  }
}