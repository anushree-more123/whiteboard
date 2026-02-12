import { Box, Card, Typography, styled } from "@mui/material";

export const StyledIconBox = styled(Box)(({ selected }) => ({
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

export const StyledColorCard = styled("span")(() => ({
  width: "24px",
  height: "24px",
  cursor: "pointer",
}));

export const StyledShapeCard = styled("span")(() => ({
  width: "30px",
  height: "30px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
}));

export const Container = styled(Box)(() => ({
  position: "relative",
}));

export const HeaderTitle = styled(Typography)(() => ({
  color: "orange",
  fontWeight: 600,
}));

export const HeaderBox = styled(Box)(() => ({
  position: "absolute",
  top: "30px",
  left: "11px",
  zIndex: 1,
  width: "70px",
}));

export const LeftToolbar = styled(Card)(() => ({
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "70px",
  left: "10px",
  zIndex: 1,
  backgroundColor: "#f8f9fa",
}));

export const TopControls = styled(Card)(() => ({
  display: "flex",
  flexDirection: "row",
  position: "absolute",
  top: "20px",
  left: "120px",
  zIndex: 1,
  backgroundColor: "#f8f9fa",
}));

export const StyledCanvas = styled("canvas")(() => ({
  border: "1px solid #000",
  height: "100%",
  width: "100%",
}));
