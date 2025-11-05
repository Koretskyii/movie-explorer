"use client";

import {
  getMovieByPopularity,
  getMoviesByAllGenres,
} from "@/api/api";
import Search from "@/components/UI/Search/Search";
import { GENRES } from "@/constants/constants";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function ExplorePage() {
  const [searchInput, setSearchInput] = useState("");
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
    redirect(`/search?input=${searchInput}`);
  };

  const handleChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
  };

  return (
    <div>
      <h1>Explore Movies</h1>
      <Search onChange={handleChangeSearchInput} onSearch={handleSearch} />
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
                  href={`explore/movie/${movie.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Typography variant="subtitle1">{movie.title}</Typography>
                </Link>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

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
                  <Link href={`/explore/genre/${genreSet[0].genre}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {Object.values(GENRES).find(
                      (genre) => genre.id == genreSet[0].genre
                    )?.name || "Unknown Genre"}
                  </Link>
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
                        href={`explore/movie/${movie.id}`}
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
