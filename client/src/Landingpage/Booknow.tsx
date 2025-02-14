
import { Button, Stack } from "@mui/material"; 
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { styled } from "@mui/material/styles";

const GradientButton = styled(Button)({
  marginTop: '693px',
  marginLeft: '120px',
  width: '349px',
height: '90px',
  position: 'absolute',
  background: "linear-gradient(90deg, #FF6A3D, #8E2DE2)",
  color: "white",
  fontSize: "40px",
  fontWeight: "bold",
  
  borderRadius: "50px",
  textTransform: "none",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  transition: "0.3s",
  cursor: 'pointer', 

  '&:hover': {
    background: "linear-gradient(90deg, #FF5733, #7325B7)",
  },
});

const BookNowButton = () => {
  return (
    
      <GradientButton endIcon={<ArrowForwardIcon />}>Book Now</GradientButton>
    
  );
};

export default BookNowButton;
