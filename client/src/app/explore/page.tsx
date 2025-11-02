"use client";

import { getMovieByName, getMovieByPopularity } from "@/api/api";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Input from "@mui/material/Input";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";

export default function ExplorePage() {
  const [movieName, setMovieName] = useState("");
  const [moviesToRender, setMoviesToRender] = useState<any[]>([]);
  const [popularMovies, setPopularMovies] = useState<any[]>([]);

  useEffect(() => {
    retrievePopularMovies();
  }, []);

  function retrievePopularMovies() {
    getMovieByPopularity().then((data) => {
      setPopularMovies([...data]);
    });
  }

  const handleSearch = async () => {
    const data = await getMovieByName(movieName);
    setMoviesToRender([...data]);
  };

  const handleChangeMovieSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setMovieName(inputValue);
  };

  return (
    <div>
      <h1>Explore Movies</h1>
      <Container
        maxWidth="sm"
        sx={{ my: 2, display: "flex", flexDirection: "row", gap: 2 }}
      >
        <Input
          id="movie-search"
          type="text"
          placeholder="Search for movies..."
          fullWidth
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            handleChangeMovieSearchInput(event)
          }
        />
        <Button
          onClick={() => handleSearch()}
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
        >
          Search
        </Button>
      </Container>
      <Container>
        <Box sx={{ my: 2 }}>
          <Typography variant="h5">Популярні фільми</Typography>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              border: "1px solid gray",
              padding: 2,
              marginTop: 2,
              justifyContent: "center",
            }}
          >
            {popularMovies.map((movie, index) => (
              <Box
                key={index}
                sx={{
                  width: 150,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  padding: 1,
                  textAlign: "center",
                }}
              >
                <Link
                  href={`/movie/${movie.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography variant="subtitle1">{movie.title}</Typography>
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
      {moviesToRender?.map((movie, index) => (
        <div key={index}>
          <Link href={`/movie/${movie.id}`}>
            <h2>{movie.title}</h2>
          </Link>
          <p>{movie.overview}</p>
        </div>
      ))}
      {/* Movie exploration content goes here */}
    </div>
  );
}
