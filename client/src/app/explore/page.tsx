"use client";

import { getMovieByPopularity, getMoviesByAllGenres } from "@/api/api";
import Search from "@/components/UI/Search/Search";
import { GENRES } from "@/constants/constants";
import { useAppStore } from "@/store/store";
import { sliceArray } from "@/utils/utils";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { TrendingUp, Film, Star } from "lucide-react";

export default function ExplorePage() {
  const [searchInput, setSearchInput] = useState("");
  const popularMovies = useAppStore((state) => state.popularMovies);
  const setPopularMovies = useAppStore((state) => state.setPopularMovies);
  const moviesByGenres = useAppStore((state) => state.moviesByGenre);
  const setMoviesByGenres = useAppStore((state) => state.setMoviesByGenre);

  useEffect(() => {
    retrievePopularMovies();
    retrieveMoviesByAllGenres();
  }, []);

  function retrieveMoviesByAllGenres() {
    getMoviesByAllGenres().then((genres) => {
      const filteredMovies = genres.map((genreSet: any) => {
        return {
          genre: genreSet[0].genre,
          movies: sliceArray(genreSet[0].movies, 0, 6),
        };
      });
      setMoviesByGenres([...filteredMovies]);
    });
  }

  function retrievePopularMovies() {
    getMovieByPopularity().then((movies) => {
      setPopularMovies([...sliceArray(movies, 0, 6)]);
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

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const MovieCard = ({ movie }: { movie: any }) => (
    <Link href={`explore/movie/${movie.id}`} style={{ textDecoration: "none" }}>
      <Card
        sx={{
          bgcolor: "background.paper",
          borderRadius: 2,
          overflow: "hidden",
          transition: "all 0.3s ease",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          cursor: "pointer",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          "&:hover": {
            transform: "translateY(-8px)",
            boxShadow: "0 12px 24px rgba(229, 9, 20, 0.3)",
            borderColor: "primary.main",
          },
        }}
      >
        {movie.poster_path ? (
          <CardMedia
            component="img"
            height="300"
            image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            sx={{ objectFit: "cover" }}
          />
        ) : (
          <Box
            sx={{
              height: 300,
              bgcolor: "rgba(255, 255, 255, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Film size={64} color="rgba(255, 255, 255, 0.2)" />
          </Box>
        )}
        <CardContent sx={{ flex: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: "white",
              fontWeight: 600,
              mb: 1,
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              minHeight: "3.6em",
            }}
          >
            {movie.title}
          </Typography>
          {movie.vote_average && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Star size={16} fill="#e50914" color="#e50914" />
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {movie.vote_average.toFixed(1)}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <Box sx={{ flex: 1, py: 4, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h3"
            sx={{
              mb: 2,
              fontWeight: 700,
              background: "linear-gradient(135deg, #ffffff 0%, #e50914 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Explore Movies
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 3 }}>
            Відкрийте для себе найкращі фільми
          </Typography>
        </Box>

        {/* Search */}
        <Search
          onChange={handleChangeSearchInput}
          onSearch={handleSearch}
          onKeyDown={handleKeyDown}
        />

        {/* Popular Movies Section */}
        <Box sx={{ my: 6 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
            <TrendingUp size={28} color="#e50914" strokeWidth={2.5} />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: "white",
              }}
            >
              Популярні фільми
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(auto-fill, minmax(200px, 1fr))",
                sm: "repeat(auto-fill, minmax(220px, 1fr))",
                md: "repeat(auto-fill, minmax(240px, 1fr))",
              },
              gap: 3,
            }}
          >
            {popularMovies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </Box>
        </Box>

        {/* Movies by Genres Section */}
        <Box sx={{ my: 6 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              mb: 4,
              justifyContent: "center",
            }}
          >
            <Film size={28} color="#e50914" strokeWidth={2.5} />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 600,
                color: "white",
              }}
            >
              Фільми за жанрами
            </Typography>
          </Box>

          <Stack spacing={6}>
            {moviesByGenres.map((genreSet, index) => (
              <Box key={index}>
                <Link
                  href={`/explore/genre/?id=${genreSet.genre}`}
                  style={{ textDecoration: "none" }}
                >
                  <Chip
                    label={
                      Object.values(GENRES).find(
                        (genre) => genre.id == genreSet.genre
                      )?.name || "Unknown Genre"
                    }
                    sx={{
                      mb: 3,
                      fontSize: "1.1rem",
                      fontWeight: 600,
                      py: 3,
                      px: 2,
                      bgcolor: "rgba(229, 9, 20, 0.15)",
                      color: "white",
                      border: "1px solid rgba(229, 9, 20, 0.3)",
                      "&:hover": {
                        bgcolor: "rgba(229, 9, 20, 0.25)",
                        borderColor: "primary.main",
                      },
                    }}
                  />
                </Link>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: {
                      xs: "repeat(auto-fill, minmax(180px, 1fr))",
                      sm: "repeat(auto-fill, minmax(200px, 1fr))",
                      md: "repeat(auto-fill, minmax(220px, 1fr))",
                    },
                    gap: 3,
                  }}
                >
                  {genreSet.movies.map((movie: any, movieIndex: number) => (
                    <MovieCard key={movieIndex} movie={movie} />
                  ))}
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
