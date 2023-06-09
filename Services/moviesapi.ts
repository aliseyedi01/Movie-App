import { Genres } from "@/types/Genres";
import { Movie, MovieInfo, SaveMovie } from "@/types/Movie";

export async function getMoviesLatest(page: string): Promise<Movie[]> {
  const res = await fetch(`https://moviesapi.ir/api/v1/movies?page=${page}`);
  const dataObject = await res.json();
  const data = dataObject.data;
  return data;
}
export async function getListGenres(): Promise<Genres[]> {
  const res = await fetch("https://moviesapi.ir/api/v1/genres");
  const data = await res.json();
  return data;
}

export async function getSingleGenre(page: string, id: string): Promise<Movie[]> {
  const res = await fetch(`https://moviesapi.ir/api/v1/genres/${id}/movies?page=${page}`);
  const dataObject = await res.json();
  const data = dataObject.data;

  return data;
}
export async function getMovieName(page: string, name: string): Promise<Movie[]> {
  const res = await fetch(`https://moviesapi.ir/api/v1/movies?q=${name}&page=${page}`);
  const dataObject = await res.json();
  const data = dataObject.data;
  return data;
}
export async function getMovieInfo(movie_id: string): Promise<MovieInfo> {
  const res = await fetch(`https://moviesapi.ir/api/v1/movies/${movie_id}`);
  const data = await res.json();
  return data;
}
