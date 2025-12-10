"use client";
import { getMovieByName } from "@/api/api";
import Search from "@/components/UI/Search/Search";
import { useAppStore } from "@/store/store";
import Pagination from "@mui/material/Pagination";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
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
        setSearchedMovies([...(movies)]);
        setTotalPages(totalPages);
      }
    }
    fetchMovies();
  }, [searchParams]);

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
    if (event.key === 'Enter') {
      handleSearch(event);
    }
  };

  return (
    <>
      <Search
        onChange={handleChangeSearchInput}
        onSearch={handleSearch}
        onKeyDown={handleKeyDown}
        initialValue={searchInput}
      />
      {searchedMovies.length === 0 && <p>No movies found.</p>}
      {searchedMovies?.map((movie, index) => (
        <div key={index}>
          <Link href={`explore/movie/${movie.id}`}>
            <h2>{movie.title}</h2>
          </Link>
          <p>{movie.overview}</p>
        </div>
      ))}
      {(totalPages ?? 0) > 1 && 
      <Pagination
        count={totalPages}
        page={currentPage}
        variant="outlined"
        shape="rounded"
        onChange={(e, value) => {
          handlePageChange(e, value);
        }}
      />
      }
    </>
  );
}
