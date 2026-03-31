"use client";
import { getMovieByName } from "@/api/api";
import Search from "@/components/UI/Search/Search";
import { useAppStore } from "@/store/store";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Movie } from "@/types/types";

function SearchPageContent() {
  const searchParams: URLSearchParams = useSearchParams();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(
    parseInt(searchParams.get("page") || "1")
  );
  const [searchInput, setSearchInput] = useState(
    searchParams.get("input") || ""
  );
  const searchedMovies = useAppStore((state) => state.movies);
  const setSearchedMovies = useAppStore((state) => state.setMovies);
  const [totalPages, setTotalPages] = useState<number | undefined>();

  useEffect(() => {
    async function fetchMovies() {
      if (searchInput !== "") {
        const data = await getMovieByName(searchInput, currentPage);
        const { results: movies, total_pages: totalPages } = data;
        setSearchedMovies([...movies]);
        setTotalPages(totalPages);
      }
    }
    fetchMovies();
  }, [searchParams, currentPage, searchInput, setSearchedMovies]);

  const handleSearch = (event: React.FormEvent<HTMLElement>) => {
    event.preventDefault();

    if (searchInput.trim() === "") return;
    router.push(`/search?input=${searchInput}&page=1`);
  };

  const handleChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
  };

  const handlePageChange = (e: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
    router.push(`/search?input=${searchInput}&page=${value}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter") {
      handleSearch(event);
    }
  };

  return (
    <Box sx={{ flex: 1, py: 4, bgcolor: "background.default" }}>
      <Container maxWidth="lg">
        <Search
          onChange={handleChangeSearchInput}
          onSearch={handleSearch}
          onKeyDown={handleKeyDown}
          initialValue={searchInput}
        />
        {searchedMovies.length === 0 && (
          <Typography
            variant="h6"
            sx={{ mt: 4, textAlign: "center", color: "text.secondary" }}
          >
            No movies found.
          </Typography>
        )}
        <Box sx={{ mt: 3 }}>
          {searchedMovies?.map((movie: Movie, index) => (
            <Box
              key={index}
              sx={{
                mb: 3,
                p: 3,
                bgcolor: "background.paper",
                borderRadius: 2,
                "&:hover": { bgcolor: "rgba(255, 255, 255, 0.05)" },
              }}
            >
              <Link
                href={`explore/movie/${movie.id}`}
                style={{ textDecoration: "none" }}
              >
                <Typography variant="h5" sx={{ color: "white", mb: 1 }}>
                  {movie.title}
                </Typography>
              </Link>
              <Typography variant="body1" sx={{ color: "text.secondary" }}>
                {movie.overview}
              </Typography>
            </Box>
          ))}
        </Box>
        {(totalPages ?? 0) > 1 && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <Pagination
              count={totalPages}
              page={currentPage}
              variant="outlined"
              shape="rounded"
              onChange={(e, value) => {
                handlePageChange(e, value);
              }}
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "white",
                  borderColor: "rgba(255, 255, 255, 0.3)",
                },
                "& .Mui-selected": {
                  bgcolor: "primary.main",
                  borderColor: "primary.main",
                },
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<Box sx={{ flex: 1, py: 4, bgcolor: "background.default" }}><Container maxWidth="lg"><Typography variant="h6" sx={{ mt: 4, textAlign: "center" }}>Loading...</Typography></Container></Box>}>
      <SearchPageContent />
    </Suspense>
  );
}
