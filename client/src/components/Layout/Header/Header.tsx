'use client';
import { useAuthStore } from "@/store/store";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "next/link";
import { Film, LogIn, LogOut, User } from "lucide-react";

export function Header() {
  const { isAuthenticated, setLoginModalOpen, logout } = useAuthStore();

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const Logout = () => logout();

  return (
    <AppBar 
      position="sticky" 
      sx={{ 
        bgcolor: 'rgba(20, 20, 20, 0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 10px rgba(0,0,0,0.5)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: "space-between", py: 1 }}>
          <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Film size={28} color="#e50914" strokeWidth={2.5} />
              <Typography 
                variant="h6" 
                sx={{ 
                  fontWeight: 700,
                  letterSpacing: '-0.5px',
                  background: "linear-gradient(135deg, #ffffff 0%, #e50914 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Movie Explorer
              </Typography>
            </Box>
          </Link>

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            {!isAuthenticated ? (
              <Button
                variant="outlined"
                startIcon={<LogIn size={18} />}
                onClick={openLoginModal}
                sx={{
                  borderColor: "rgba(255, 255, 255, 0.3)",
                  color: "white",
                  "&:hover": {
                    borderColor: "primary.main",
                    backgroundColor: "rgba(229, 9, 20, 0.1)",
                  },
                }}
              >
                Увійти
              </Button>
            ) : (
              <>
                <Link href="/account" style={{ textDecoration: "none" }}>
                  <Button
                    variant="text"
                    startIcon={<User size={18} />}
                    sx={{
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    Профіль
                  </Button>
                </Link>
                <Button
                  variant="outlined"
                  startIcon={<LogOut size={18} />}
                  onClick={Logout}
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.3)",
                    color: "white",
                    "&:hover": {
                      borderColor: "error.main",
                      backgroundColor: "rgba(229, 9, 20, 0.1)",
                    },
                  }}
                >
                  Вийти
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
