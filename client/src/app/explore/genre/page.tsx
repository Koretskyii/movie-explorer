"use client";

import { getMoviesByGenreId } from "@/api/api";
import { GENRES } from "@/constants/constants";
import { useSearchParams } from "next/navigation";
import React, { useEffect, Suspense } from "react";
import { useAppStore } from "@/store/store";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Link from "next/link";
import { Film, Star, ArrowLeft } from "lucide-react";
import Button from "@mui/material/Button";

import { Movie } from "@/types/types";

function GenrePageContent() {
  const searchParams = useSearchParams();
  const movies = useAppStore((state) => state.movies);
  const setMovies = useAppStore((state) => state.setMovies);
  const genreId = searchParams.get("id") ?? "0";
  const genreName =
    Object.values(GENRES).find((genre) => genre.id === genreId)?.name ||
    "Unknown Genre";

  useEffect(() => {
    const loadMovies = async () => {
      if (genreId) {
        const moviesResponse = await getMoviesByGenreId(genreId);
        setMovies(moviesResponse[0].movies);
      }
    };
    loadMovies();
  }, [genreId, setMovies]);

  const MovieCard = ({ movie }: { movie: Movie }) => (
    <Link
      href={`/explore/movie/${movie.id}`}
      style={{ textDecoration: "none" }}
    >
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
    <Box sx={{ flex: 1, bgcolor: "background.default", py: 4 }}>
      <Container maxWidth="lg">
        <Link href="/explore" style={{ textDecoration: "none" }}>
          <Button
            startIcon={<ArrowLeft size={20} />}
            sx={{
              mb: 3,
              color: "text.secondary",
              "&:hover": {
                color: "primary.main",
                bgcolor: "rgba(229, 9, 20, 0.1)",
              },
            }}
          >
            Назад до Explorer
          </Button>
        </Link>

        <Box sx={{ mb: 4, textAlign: "center" }}>
          <Chip
            icon={<Film size={20} />}
            label={genreName}
            sx={{
              fontSize: "1.2rem",
              fontWeight: 700,
              py: 3,
              px: 3,
              mb: 2,
              bgcolor: "rgba(229, 9, 20, 0.15)",
              color: "white",
              border: "2px solid rgba(229, 9, 20, 0.4)",
              "& .MuiChip-icon": {
                color: "#e50914",
              },
            }}
          />
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            {movies.length} {movies.length === 1 ? "фільм" : "фільмів"}
          </Typography>
        </Box>

        {movies.length < 1 ? (
          <Box sx={{ textAlign: "center", py: 12 }}>
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                bgcolor: "rgba(255, 255, 255, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3,
              }}
            >
              <Film size={60} color="rgba(255, 255, 255, 0.2)" />
            </Box>
            <Typography variant="h5" sx={{ color: "text.secondary" }}>
              Фільми не знайдено
            </Typography>
          </Box>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(auto-fill, minmax(180px, 1fr))",
                sm: "repeat(auto-fill, minmax(200px, 1fr))",
                md: "repeat(auto-fill, minmax(220px, 1fr))",
                lg: "repeat(auto-fill, minmax(240px, 1fr))",
              },
              gap: 3,
            }}
          >
            {movies.map((movie: Movie, index: number) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default function GenrePage() {
  return (
    <Suspense fallback={<Box sx={{ flex: 1, py: 4, bgcolor: "background.default" }}><Container maxWidth="lg"><Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>Loading...</Typography></Container></Box>}>
      <GenrePageContent />
    </Suspense>
  );
}
