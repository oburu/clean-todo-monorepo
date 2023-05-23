export function sleep(ms = 2000) {
  return new Promise((r) => setTimeout(r, ms));
}

export function shortId(id: string | undefined) {
  if (!id) {
    return null;
  }

  return id.split('-', 1)[0];
}
