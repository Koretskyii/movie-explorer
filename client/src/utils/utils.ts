export const buildFetchOptions = (options: RequestInit, accessToken?: string | null): RequestInit => {
  let headers: Record<string, any> = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return {
    method: options.method,
    headers,
    body: options.body ?? null,
    credentials: "include"
  };
};

export const sliceArray: <T>(array: T[], start: number, end: number) => T[] = (array, start, end) => {
  return array?.slice(start, end);
};