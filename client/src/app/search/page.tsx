"use client";
import { getMovieByName } from "@/api/api";
import Search from "@/components/UI/Search/Search";
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
  const [moviesToRender, setMoviesToRender] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState<number | undefined>();

  useEffect(() => {
    async function fetchMovies() {
      if (searchInput !== "") {
        const data = await getMovieByName(searchInput, currentPage);
        const { results: movies, total_pages: totalPages } = data;
        setMoviesToRender([...(movies)]);
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

  return (
    <>
      <Search
        onChange={handleChangeSearchInput}
        onSearch={handleSearch}
        initialValue={searchInput}
      />    
      {moviesToRender?.map((movie, index) => (
        <div key={index}>
          <Link href={`explore/movie/${movie.id}`}>
            <h2>{movie.title}</h2>
          </Link>
          <p>{movie.overview}</p>
        </div>
      ))}
      <Pagination
        count={totalPages}
        page={currentPage}
        variant="outlined"
        shape="rounded"
        onChange={(e, value) => {
          handlePageChange(e, value);
        }}
      />
    </>
  );
}
