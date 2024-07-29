import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import { Star } from "@mui/icons-material";

interface CardButtonProps {
  isInFavoriteList: boolean;
  buttonId: number;
  handleFavoriteToggling: () => void;
}
const CardButton: React.FC<CardButtonProps> = ({ buttonId, handleFavoriteToggling, isInFavoriteList }) => {
  const [isClicked, setIsClicked] = useState(isInFavoriteList);
  const handleClick = () => {
    setIsClicked(!isClicked);
    handleFavoriteToggling();
  };
  useEffect(() => {
    setIsClicked(isInFavoriteList);
  }, [isInFavoriteList]);

  return (
    <IconButton sx={{ marginLeft: "20%", marginTop: "-1.5%" }} onClick={() => handleClick()} id={buttonId.toString()}>
      {<Star style={{ color: isClicked ? "yellow" : "grey" }} />}
    </IconButton>
  );
};

export { CardButton };
