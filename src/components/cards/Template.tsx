import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { CardButton } from "./Button";
import { MovieProps } from "./types";
import EmptyImage from "@assets/images/no-image-cinema.jpg";

import { Box, Card, Paper, Typography, CardMedia, CardContent } from "@mui/material";
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
      <Card sx={{ display: "flex", position: "relative" }} key={movie.id}>
        <Paper sx={{ borderRadius: "1rem" }}>
          <Link to={`/add_info/${movie.id}`}>
            <CardMedia
              component="img"
              sx={{
                width: "100%",
                margin: "0 auto",
                display: "block",
              }}
              image={movie.poster_path ? `${imageLink}${movie.poster_path}` : EmptyImage}
              alt={`${movie.title}`}
            />
          </Link>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" alignSelf={"center"} mb={2}>
              {movie.title}
            </Typography>
            <Box
              display={"flex"}
              alignItems={"center"}
              position={"absolute"}
              bottom={0}
              sx={{ right: { xs: "0", md: "-20" } }}
            >
              <Typography variant="h6">{movie.vote_average}</Typography>
              <CardButton
                isInFavoriteList={isFavorite}
                handleFavoriteToggling={() => handleFavoriteToggling(movie.id)}
                buttonId={movie.id}
              />
            </Box>
          </CardContent>
        </Paper>
      </Card>
    </Box>
  );
};

export default CardItem;
