"use client";

import { getMoviesByGenreId } from "@/api/api";
import { useSearchParams } from "next/navigation";
import React, { forwardRef, useEffect, useState } from "react";
import { VirtuosoGrid, VirtuosoGridProps } from "react-virtuoso";
import { useAppStore } from "@/store/store";

export default function GenrePage() {
  const searchParams = useSearchParams();
  const movies = useAppStore((state) => state.movies);
  const setMovies = useAppStore((state) => state.setMovies);

  useEffect(() => {
    const loadMovies = async () => {
      let genreId: PropertyKey = searchParams.get("id") ?? "";
      genreId = parseInt(genreId);
      const moviesResponse = await getMoviesByGenreId(genreId);
      setMovies(moviesResponse[0].movies);
    };
    loadMovies();
  }, []);

  const gridComponents: VirtuosoGridProps<undefined, undefined>["components"] =
    {
      List: forwardRef(({ style, children, ...props }, ref) => (
        <div
          ref={ref}
          {...props}
          style={{
            display: "flex",
            flexWrap: "wrap",
            ...style,
          }}
        >
          {children}
        </div>
      )),
      Item: ({ children, ...props }) => (
        <div
          {...props}
          style={{
            padding: "0.5rem",
            width: "33%",
            display: "flex",
            flex: "none",
            alignContent: "stretch",
            boxSizing: "border-box",
          }}
        >
          {children}
        </div>
      ),
    };

  const ItemWrapper = ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLDivElement> & { children: React.ReactNode }) => (
    <div
      {...props}
      style={{
        display: "flex",
        flex: 1,
        textAlign: "center",
        padding: "1rem 1rem",
        border: "1px solid gray",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </div>
  );

  return (
    <>
      {movies.length < 1 ? (
        <p>no movies data</p>
      ) : (
        <VirtuosoGrid
          style={{ height: "80vh", width: "100%" }}
          totalCount={movies.length}
          components={gridComponents}
          itemContent={(index) => <ItemWrapper>{movies[index].title}</ItemWrapper>}
        />
      )}
    </>
  );
}
