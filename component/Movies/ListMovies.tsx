import React, { useContext, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PublicIcon from "@mui/icons-material/Public";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Image from "next/image";
import { Suspense } from "react";
import { Grid, Skeleton } from "@mui/material";
import { HomeProps, SaveMovie } from "@/types/Movie";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import IconButton from "@mui/material/IconButton";
import { MoviesContext } from "@/state/movieReducer";
import { useRouter } from "next/router";

export default function ListMovies({ movies }: HomeProps) {
  const [bookmarkStatus, setBookmarkStatus] = useState(Array(movies.length).fill(false));
  const { dispatch } = useContext(MoviesContext);
  const router = useRouter();

  const handleBookmarkToggle = (index: number) => {
    setBookmarkStatus((prevStatus) => {
      const updatedStatus = [...prevStatus];
      updatedStatus[index] = !prevStatus[index];

      const movie = movies[index];
      if (updatedStatus[index]) {
        dispatch({ type: "ADD_MOVIE", payload: movie });
      } else {
        dispatch({ type: "REMOVE_MOVIE", payload: movie });
      }

      return updatedStatus;
    });
  };

  const handleSingleMovie = (id: number) => {
    router.push(`/movie/${id}`);
  };
  return (
    <ul className=" grid grid-cols-1 place-items-center gap-4  p-5 dark:bg-indigo-950 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {movies.map((movie, index) => (
        <li key={movie.id} className=" transition-all duration-150 hover:scale-[1.02]">
          <Card sx={{ maxWidth: 345 }} className="dark:bg-slate-700">
            <Suspense
              fallback={
                <Skeleton
                  sx={{ bgcolor: "grey.900" }}
                  variant="rectangular"
                  width={250}
                  height={340}
                />
              }
            >
              <Image src={movie.poster} alt="movie" width={345} height={550} />
            </Suspense>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="w-52 truncate font-ubuntu text-lg font-bold text-indigo-900 dark:text-indigo-200"
              >
                {movie.title}
              </Typography>
              <Typography className="font-mono text-sm text-indigo-900 dark:text-indigo-300">
                <CalendarMonthIcon className="text-xl dark:text-yellow-200" /> Years: {movie.year}
              </Typography>
              <Typography className="w-52 truncate font-mono text-sm text-indigo-900 dark:text-indigo-300">
                <PublicIcon className="text-xl dark:text-yellow-200" /> Country: {movie.country}
              </Typography>
            </CardContent>
            <CardActions className="flex flex-row-reverse  justify-between">
              <Typography className="w-9 cursor-default rounded-lg border-2 bg-sky-200 p-1 dark:bg-indigo-700 dark:text-white/90">
                {movie.imdb_rating}
              </Typography>
              <div className=" flex justify-start">
                <IconButton
                  aria-label="fingerprint"
                  color="secondary"
                  className="dark:text-yellow-300"
                  onClick={() => handleBookmarkToggle(index)}
                >
                  {bookmarkStatus[index] ? <TurnedInIcon /> : <TurnedInNotIcon />}
                </IconButton>
                <Button
                  size="small"
                  onClick={() => handleSingleMovie(movie.id)}
                  className="dark:text-slate-200"
                >
                  Learn More
                </Button>
              </div>
            </CardActions>
          </Card>
        </li>
      ))}
    </ul>
  );
}
