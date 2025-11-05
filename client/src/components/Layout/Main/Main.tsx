import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export function Main() {
  return (
    <>
      <Box
        component="main"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ height: "75vh", p: 2 }}
      >
        <Typography variant="h4" gutterBottom>
          Welcome to Movie Explorer
        </Typography>
        <Typography variant="body1">
          Discover and explore a vast collection of movies. Use the search
          functionality to find your favorite films and get detailed information
          about them.
        </Typography>
        <Link href="/explore" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 1 }}
          >
            Explore Films
          </Button>
        </Link>
      </Box>
    </>
  );
}
