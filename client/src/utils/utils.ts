export const buildFetchOptions = (options: RequestInit): RequestInit => {
  return {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : null,
  };
};
