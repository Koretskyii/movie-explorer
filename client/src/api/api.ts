export function getMovieByName(name: string) {
const baseUrl = process.env.NEST_SERVER_URL || 'http://localhost:3011';
  return fetch(`${baseUrl}/movies?name=${encodeURIComponent(name)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(
        res => {
            try {
                return res.json();
            } catch (error) {
                console.error("Error parsing JSON:", error);
                throw error;
            }
        }
    );
}