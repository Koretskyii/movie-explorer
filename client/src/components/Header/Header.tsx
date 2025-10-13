import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export function Header() {
  return (
    <div style={{ position: "relative" }}>
      <AppBar position="absolute" sx={{ width: "100%" }} color="primary">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h6">Movie Explorer</Typography>
        </Toolbar>
        <Link
          href="/account"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <IconButton
            className="userProfile"
            color="inherit"
            aria-label="user profile"
            sx={{
              position: "absolute",
              right: 16,
              top: 8,
              border: "1px solid white",
            }}
          >
            Profile
          </IconButton>
        </Link>
      </AppBar>
      <Toolbar /> {/* This is to offset the fixed AppBar */}
    </div>
  );
}
