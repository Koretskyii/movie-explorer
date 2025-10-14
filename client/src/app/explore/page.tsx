"use client";

import { getMovieByName } from "@/api/api";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Input from "@mui/material/Input";
import { ChangeEvent, useState } from "react";

export default function ExplorePage() {
  const [movieName, setMovieName] = useState("");

  const handleSearch = async () => {
    const data = await getMovieByName(movieName);
    console.log("Movie data: ", data);
  };

  const handleChangeMovieSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    console.log("Movie search input changed:", inputValue);
    setMovieName(inputValue);
  };

  return (
    <div>
      <Header />
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
      {/* Movie exploration content goes here */}
      <Footer />
    </div>
  );
}
