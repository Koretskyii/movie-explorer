export const useFetch = (
  url: string,
  options: RequestInit,
  params: Record<string, any>
) => {
  debugger;
  const queryString = new URLSearchParams(params).toString();
  return fetch(`${url}?${queryString}`, {
    method: options.method,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : null,
  }).then((res) => {
    try {
      const data = res.json();
      debugger;
      return data;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      throw error;
    }
  });
};
