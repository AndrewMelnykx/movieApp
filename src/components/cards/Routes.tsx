import React, { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";
import { CardMedia, Card } from "@mui/material";

import { CreditsDataProps, DetailsDataProps } from "./types";
import { fetchMovieCredits, fetchMovieDetails } from "@data/fetchMovieCreditsDetails";
import { theme } from "@helpers/theme-font";

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
        display={"flex"}
        flexDirection={"column"}
        alignItems={"flex-start"}
        sx={{ fontFamily: "Roman Jelly", color: "white" }}
        width={"100%"}
      >
        <Box display={"flex"} flexDirection={"column"} width={"100%"}>
          <Box
            display={"flex"}
            ml={"5%"}
            mb={"2rem"}
            p={"2% 2% 2% 2%"}
            flexDirection={{ xs: "column", md: "row" }}
          >
            {" "}
            <Typography variant="h4" bgcolor={"transparent"}>
              {detailsData?.original_title}
            </Typography>
            <Card>
              <CardMedia
                component="img"
                sx={{
                  width: { xs: "300xp", md: "600px" },
                  margin: "0 auto",
                  objectFit: "cover",
                  height: "100%",
                }}
                image={`${imageLink}${detailsData?.backdrop_path}`}
                alt={`${detailsData?.title}`}
              />
            </Card>
            <Box
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              ml={{ xs: "0", md: "6rem" }}
              alignItems={"flex-start"}
              justifyContent={"space-between"}
              gap={"8rem"}
              bgcolor={"#470047"}
              p={"2% 2% 2% 2%"}
              mt={{ xs: "5%", md: "0" }}
              borderRadius={"3rem"}
            >
              <Box display={"flex"} flexDirection={"column"}>
                <Typography variant="h5"> Cast:</Typography>
                {creditsData &&
                  creditsData.cast
                    .slice(0, 10)
                    .map(member => <Typography key={member.id}>{member.name}</Typography>)}
              </Box>

              <Box
                display={"flex"}
                flexDirection={"column"}
                alignItems={"flex-start"}
                justifyContent={"center"}
              >
                <Typography variant="h5">Details:</Typography>
                <Typography variant="h6">Vote: {detailsData?.vote_average}(average)</Typography>
                <Typography variant="h6">
                  Runtime: {detailsData?.runtime} min / (
                  {Math.round((detailsData?.runtime ?? 0) / 60)} hrs)
                </Typography>
                <Typography variant="h6">
                  Country:{" "}
                  {detailsData?.production_countries?.map(country => country.name).join(", ")}
                </Typography>
                <Typography variant="h6">
                  <i>Genres: {detailsData?.genres?.map(genre => genre.name).join(", ")}</i>
                </Typography>
                <Typography variant="h6">Budget: {detailsData?.budget}$</Typography>
              </Box>
            </Box>
          </Box>

          <Box
            display={"flex"}
            justifyContent={{ xs: "center", md: "space-between" }}
            flexDirection={{ xs: "column", md: "row" }}
            width={"90%"}
            ml={{ xs: "6%", md: "5%" }}
            // p={{ xs: "1% 1% 1% 1%", md: "0" }}
            bgcolor={"#470047"}
            p={"2% 2% 2% 2%"}
            mt={{ xs: "5%", md: "0" }}
            borderRadius={"3rem"}
          >
            <Box
              display={"flex"}
              flexDirection={"column"}
              alignItems={"flex-start"}
              justifyContent={"center"}
              mb={5}
              width={{ xs: "75%", md: "100%" }}
            >
              <Typography variant="h5"> Overview:</Typography>
              <Typography>{detailsData?.overview} </Typography>
            </Box>
          </Box>
          <ToastContainer />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CardRout;
