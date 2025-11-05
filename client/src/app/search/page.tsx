"use client";
import { getMovieByName } from "@/api/api";
import Search from "@/components/UI/Search/Search";
import Pagination from "@mui/material/Pagination";
import Link from "next/dist/client/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const input = useSearchParams().get("input") || '';

  const [searchInput, setSearchInput] = useState(input || "");
  const [moviesToRender, setMoviesToRender] = useState<any[]>([]);

  useEffect(() => {
    if (input !== "") {
      handleSearch();
    }
  }, []);
  
  const handleSearch = async () => {
    const data = await getMovieByName(searchInput);
    setMoviesToRender([...data]);
  };

  const handleChangeSearchInput = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    setSearchInput(inputValue);
  };

  return (
    <>
      <Search
        onChange={handleChangeSearchInput}
        onSearch={handleSearch}
        initialValue={input}
      />
      Search page
      {moviesToRender?.map((movie, index) => (
        <div key={index}>
          <Link href={`explore/movie/${movie.id}`}>
            <h2>{movie.title}</h2>
          </Link>
          <p>{movie.overview}</p>
        </div>
      ))}
      <Pagination count={10} variant="outlined" shape="rounded" />
    </>
  );
}
