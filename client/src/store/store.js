import { create } from 'zustand';

const initialState = () => ({
    movies: [],
    popularMovies: [],
    moviesByGenre: [],
    filters: {
        query: '',
        page: 1,
    },
    movieDetails: {},
});

const appStore = (set, get) => ({
    ...initialState(),
    setFilter: (key, value) => {
        set((state) => ({
            filters: {...state.filters, [key]: value}
        }))
    },
    setMovies: (movies) => {
        set(({
            movies
        }))
    },
    setPopularMovies: (popularMovies) => {
        set(({
            popularMovies
        }))
    },
    setMoviesByGenre: (moviesByGenre) => {
        set(({
            moviesByGenre
        }))
    },
    setMovieDetails: (movieDetails) => {
        set(({
            movieDetails
        }))
    },
    reset: () => set(() => ({ ...initialState() })),
})

export const useAppStore = create(appStore);