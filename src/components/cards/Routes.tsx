import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCredits, fetchMovieDetails } from "@data/fetchMovieCreditsDetails";
import { CreditsDataProps, DetailsDataProps } from "./types";
import { CardMedia, Card } from "@mui/material";
import { theme } from "@helpers/theme-font";
import { ThemeProvider } from "@emotion/react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CardRout = () => {
  const { movieId } = useParams();
  const [creditsData, setCreditsData] = useState<CreditsDataProps>();
  const [detailsData, setDetailsData] = useState<DetailsDataProps>();

  const imageLink = import.meta.env.VITE_MOVIE_APP_IMAGES_LINK;

  useEffect(() => {
    const fetchCredits = async () => {
      try {
        const response = await fetchMovieCredits(movieId);
        console.log(response);
        setCreditsData(response?.data ?? []);
      } catch (error) {
        toast.error("Wrong credits data");
      }
    };
    fetchCredits();
  }, []);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetchMovieDetails(movieId);
        console.log("details", response);
        setDetailsData(response?.data ?? []);
      } catch (error) {
        toast.error("Wrong details data");
      }
    };
    fetchDetails();
  }, [movieId]);

  return (
    <ThemeProvider theme={theme}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        position="relative"
        sx={{ fontFamily: "Roman Jelly" }}
      >
        <Box position="absolute" top={20} left={70}>
          <Typography variant="h4">{detailsData?.original_title}</Typography>
        </Box>
        <Box display="flex" mt={8} alignItems="flex-start">
          <Box mr={4} width="300px">
            <Typography variant="h5">Details:</Typography>
            <Typography variant="h6">Vote: {detailsData?.vote_average}(average)</Typography>
            <Typography variant="h6">
              Runtime: {detailsData?.runtime} min / ({Math.round((detailsData?.runtime ?? 0) / 60)} hrs)
            </Typography>
            <Typography variant="h6">
              Country: {detailsData?.production_countries?.map(country => country.name).join(", ")}
            </Typography>
            <Typography variant="h6">
              <i>Genres: {detailsData?.genres?.map(genre => genre.name).join(", ")}</i>
            </Typography>
            <Typography variant="h6">Budget: {detailsData?.budget}$</Typography>
          </Box>
          <Card>
            <CardMedia
              component="img"
              sx={{ width: "600px", margin: "0" }}
              image={`${imageLink}${detailsData?.backdrop_path}`}
              alt={`${detailsData?.title}`}
            />
          </Card>
          <Box display="flex" flexDirection="column" ml={4}>
            <Typography variant="h5"> Cast:</Typography>
            {creditsData &&
              creditsData.cast.slice(0, 10).map(member => <Typography key={member.id}>{member.name}</Typography>)}
          </Box>
        </Box>
        <Typography variant="h5"> Overview:</Typography>
        <Typography sx={{ display: "flex", flexDirection: "column", width: "400px", marginTop: "5px" }}>
          {detailsData?.overview}{" "}
        </Typography>
        <ToastContainer />
      </Box>
    </ThemeProvider>
  );
};

export default CardRout;
