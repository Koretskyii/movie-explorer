'use client';
import { useAuthStore } from "@/store/store";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "next/link";

export function Header() {
  const { isAuthenticated, setLoginModalOpen, logout } = useAuthStore();

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const Logout = () => logout();

  return (
    <div style={{ position: "relative" }}>
      <AppBar position="absolute" sx={{ width: "100%" }} color="primary">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Typography variant="h6">
            <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
              Movie Explorer
            </Link>
          </Typography>
        </Toolbar>
        {!isAuthenticated ? (
          <IconButton
            className="loginButton"
            color="inherit"
            aria-label="login"
            sx={{
              position: "absolute",
              top: 8,
              right: 16,
              border: "1px solid white",
            }}
            onClick={openLoginModal}
          >
            Login
          </IconButton>
        ) : (
          <Container>
            <IconButton
              className="logoutButton"
              color="warning"
              aria-label="logout"
              sx={{
                position: "absolute",
                top: 8,
                border: "1px solid white",
              }}
              onClick={Logout}
            >
              Logout
            </IconButton>
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
          </Container>
        )}
      </AppBar>
      <Toolbar /> {/* This is to offset the fixed AppBar */}
    </div>
  );
}
