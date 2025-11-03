"use client";

import {
  getMovieByName,
  getMovieByPopularity,
  getMoviesByAllGenres,
} from "@/api/api";
import { GENRES } from "@/constants/constants";
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
  const [moviesByGenres, setMoviesByGenres] = useState<any[]>([]);
  useEffect(() => {
    retrievePopularMovies();
    retrieveMoviesByAllGenres();
  }, []);

  function retrieveMoviesByAllGenres() {
    getMoviesByAllGenres().then((data) => {
      setMoviesByGenres([...data]);
    });
  }

  function retrievePopularMovies() {
    getMovieByPopularity().then((data) => {
      setPopularMovies([...data]);
    });
  }

  const handleSearch = async () => {
    const data = await getMovieByName(movieName);
    setMoviesToRender({ ...data });
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
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography
            variant="h5"
            textAlign="center"
            gutterBottom
            sx={{ fontWeight: 600 }}
          >
            Фільми за жанрами
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              mt: 2,
            }}
          >
            {moviesByGenres.map((genreSet, index) => (
              <Box
                key={index}
                sx={{
                  border: "1px solid #ddd",
                  borderRadius: 3,
                  padding: 3,
                  backgroundColor: "#fafafa",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
                  width: "100%",
                  maxWidth: 1000,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: "center",
                    mb: 3,
                    fontWeight: 600,
                    color: "#333",
                  }}
                >
                  {Object.values(GENRES).find(
                    (genre) => genre.id == genreSet[0].genre
                  )?.name || "Unknown Genre"}
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 2,
                    justifyContent: "center",
                  }}
                >
                  {genreSet[0].movies.map((movie: any, index: number) => (
                    <Box
                      key={index}
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: 2,
                        padding: 2,
                        width: 180,
                        textAlign: "center",
                        backgroundColor: "#fff",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                        transition: "transform 0.2s",
                        "&:hover": {
                          transform: "scale(1.02)",
                          borderColor: "#999",
                        },
                      }}
                    >
                      <Link
                        href={`/movie/${movie.id}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{
                            fontWeight: 500,
                            fontSize: "1rem",
                            color: "#222",
                          }}
                        >
                          {movie.title}
                        </Typography>
                      </Link>
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </div>
  );
}
