'use client';

import { getMovieByName } from "@/api/api";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";

export default function ExplorePage() {
    const handleSearch = () => {
        getMovieByName("Inception").then(data => {
            console.log("Movie data:", data);
        });
        // TODO: Implement the search functionality here
    }
    const handleChangeMovieSearchInput = (event) => {
        const inputValue = event.target.value;
        console.log("Movie search input changed:", inputValue);
        // Handle the change in movie search input
    }
  return (
    <div>
      <Header />
      <h1>Explore Movies</h1>
      <Container maxWidth="sm" sx={{ my: 2, display: 'flex', flexDirection: 'row', gap: 2 }}>
        <Input id="movie-search" type="text" placeholder="Search for movies..." fullWidth onChange={(event) => handleChangeMovieSearchInput(event)} />
        <Button onClick={() => handleSearch()} variant="contained" color="primary" sx={{ mt: 2 }}>
          Search
        </Button>
      </Container>
      {/* Movie exploration content goes here */}
      <Footer />
    </div>
  );
}
