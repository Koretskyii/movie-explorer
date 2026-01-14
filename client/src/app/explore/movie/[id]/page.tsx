'use client';
import { getMovieDetails } from "@/api/api";
import { useAppStore } from "@/store/store";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useParams } from "next/navigation";
import { useEffect } from "react";

type MovieDetails = {
  title?: string;
  [key: string]: any;
};
export default function MoviePage() {
  const details: MovieDetails = useAppStore((state) => state.movieDetails);
  const setDetails = useAppStore((state) => state.setMovieDetails);
  const movieId = useParams().id?.toString();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (movieId) {
        const data = await getMovieDetails(movieId);
        setDetails(data);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  return (<Card sx={{ maxWidth: 600, borderRadius: 3, boxShadow: 4, mx: "auto" }}>
      <CardMedia
        component="img"
        height="350"
        image={`https://image.tmdb.org/t/p/w780${details.backdrop_path}`}
        alt={details.title}
        sx={{ objectFit: "cover" }}
      />

      <CardContent>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          {details.title}
        </Typography>

        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          {details.tagline}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: "wrap" }}>
          {details?.genres?.map((g) => (
            <Chip key={g.id} label={g.name} size="small" />
          ))}
        </Stack>

        <Typography variant="body2" sx={{ mb: 2 }}>
          {details.overview}
        </Typography>

        <Typography variant="caption" color="text.secondary">
          Release date: {details.release_date}
        </Typography>
      </CardContent>
    </Card>);
}
