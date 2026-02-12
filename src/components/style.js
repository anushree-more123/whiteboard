import { Box, styled } from "@mui/material";

export const StyledIconBox = styled(Box)(({ theme, selected }) => ({
  width: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "45px",
  cursor: "pointer",
  backgroundColor: "#f8f9fa",
  ...(selected && {
    color: "#29c5f6",
    border: "1px solid #dae0e5",
    backgroundColor: "#dae0e5",
  }),
}));

export const StyledColorCard = styled("span")(({ theme }) => ({
  width: "24px",
  height: "24px",
  cursor: "pointer",
}));

export const StyledShapeCard = styled("span")(({ theme }) => ({
  width: "30px",
  height: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}));
