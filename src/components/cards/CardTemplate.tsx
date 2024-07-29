import React, { useEffect, useState } from "react";
import { CardButton } from "./CardButton";
import { Box, Card, Paper, Typography, CardMedia, CardContent } from "@mui/material";
import { Link } from "react-router-dom";
import { MovieProps } from "./types";

import { useSelector } from "react-redux";
import { DataSelectorFavorites } from "@stateSelectors/data-handling-selectors";

import { fetchFavoriteMovie } from "@data/fetchFavorites";

const CardItem: React.FC<{ movie: MovieProps }> = ({ movie }) => {
  const favoritesState = useSelector(DataSelectorFavorites);
  const isFavoriteInitial = favoritesState.some(movieItem => movieItem.id === movie.id);
  const [isFavorite, setIsFavorite] = useState(isFavoriteInitial);

  const imageLink = import.meta.env.VITE_MOVIE_APP_IMAGES_LINK;

  const handleFavoriteToggling = async (movieItemId: number) => {
    try {
      const newStatus = !favoritesState.some(movieItem => movieItem.id === movieItemId);
      const response = await fetchFavoriteMovie(movieItemId, newStatus);

      if (response) {
        setIsFavorite(newStatus);
      }
    } catch (error) {
      console.error("Failed to fetch", error);
    }
  };

  useEffect(() => {
    setIsFavorite(favoritesState.some(movieItem => movieItem.id === movie.id));
  }, [favoritesState, movie.id]);

  return (
    <Box key={movie.id} sx={{ display: "flex", justifyContent: "center" }}>
      <Card sx={{ display: "flex" }} key={movie.id}>
        <Paper>
          <Link to={`/add_info/${movie.id}`}>
            <CardMedia
              component="img"
              sx={{ width: "200px", margin: "0" }}
              image={`${imageLink}${movie.poster_path}`}
              alt={`${movie.title}`}
            />
          </Link>

          <Box display="flex" alignItems="center" justifyContent="space-between" columnGap="10px">
            <CardContent>
              <Typography variant="h6" className="movie-name" maxWidth={"200px"}>
                {movie.title}
              </Typography>
              <Typography variant="h6" className="movie-rating" display={"flex"}>
                {movie.vote_average}
                <CardButton
                  isInFavoriteList={isFavorite}
                  handleFavoriteToggling={() => handleFavoriteToggling(movie.id)}
                  buttonId={movie.id}
                />
              </Typography>
            </CardContent>
          </Box>
        </Paper>
      </Card>
    </Box>
  );
};

export default CardItem;
