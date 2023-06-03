import { getMoviesLatest } from "@/Services/moviesapi";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PublicIcon from "@mui/icons-material/Public";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

export default function Home({ movies }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <ul className="  lg:grid-cols-5ssss grid grid-cols-1 place-items-center gap-3 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  ">
        {movies.map((movie) => (
          <li key={movie.id}>
            <Card sx={{ maxWidth: 345 }}>
              <CardMedia
                component="img"
                alt="movies"
                image={movie.poster}
                className="grayscale hover:grayscale-0"
              />
              <CardContent>
                <Typography
                  gutterBottom
                  variant="h5"
                  component="div"
                  className="w-52 truncate  text-lg"
                >
                  {movie.title}
                </Typography>

                <Typography>
                  <CalendarMonthIcon /> Years: {movie.year}
                </Typography>
                <Typography>
                  <PublicIcon /> Country:{movie.country}
                </Typography>
              </CardContent>
              <CardActions className="flex flex-row-reverse justify-between">
                <Typography className="w-9 cursor-default rounded-lg border-2 bg-red-200 p-1">
                  {movie.imdb_rating}
                </Typography>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const movies = await getMoviesLatest();
    // console.log(movies);
    return {
      props: {
        movies,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        movies: [],
      },
    };
  }
};
