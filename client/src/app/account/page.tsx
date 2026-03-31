"use client";
import { useAuthStore } from "@/store/store";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { useEffect } from "react";
import { User, Mail, Calendar, Film, Heart, LogIn } from "lucide-react";

export default function AccountPage() {
  const { isAuthenticated, setLoginModalOpen } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      setLoginModalOpen(true);
    }
  }, [isAuthenticated, setLoginModalOpen]);

  return (
    <Box sx={{ flex: 1, py: 6, bgcolor: "background.default" }}>
      <Container maxWidth="md">
        {isAuthenticated ? (
          <Box>
            {/* Header */}
            <Typography
              variant="h3"
              sx={{
                mb: 4,
                fontWeight: 700,
                background: "linear-gradient(135deg, #ffffff 0%, #e50914 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "center",
              }}
            >
              Мій Профіль
            </Typography>

            <Card
              sx={{
                bgcolor: "background.paper",
                borderRadius: 3,
                border: "1px solid rgba(229, 9, 20, 0.2)",
                mb: 4,
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Stack direction="column" alignItems="center" spacing={3}>
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      bgcolor: "primary.main",
                      fontSize: "3rem",
                      border: "4px solid rgba(229, 9, 20, 0.3)",
                    }}
                  >
                    <User size={64} />
                  </Avatar>

                  <Box sx={{ textAlign: "center", width: "100%" }}>
                    <Typography
                      variant="h4"
                      sx={{ fontWeight: 600, color: "white", mb: 1 }}
                    >
                      User Name
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ color: "text.secondary" }}
                    >
                      Movie Enthusiast
                    </Typography>
                  </Box>

                  <Divider
                    sx={{
                      width: "100%",
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    }}
                  />

                  <Stack spacing={2.5} sx={{ width: "100%" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          bgcolor: "rgba(229, 9, 20, 0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Mail size={20} color="#e50914" />
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          Email
                        </Typography>
                        <Typography variant="body1" sx={{ color: "white" }}>
                          user@example.com
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: "50%",
                          bgcolor: "rgba(229, 9, 20, 0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Calendar size={20} color="#e50914" />
                      </Box>
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: "text.secondary" }}
                        >
                          Дата реєстрації
                        </Typography>
                        <Typography variant="body1" sx={{ color: "white" }}>
                          Січень 2024
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                gap: 3,
              }}
            >
              <Card
                sx={{
                  bgcolor: "rgba(229, 9, 20, 0.1)",
                  border: "1px solid rgba(229, 9, 20, 0.3)",
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        bgcolor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Film size={28} color="white" />
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "white" }}
                      >
                        0
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        Переглянуто фільмів
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Card
                sx={{
                  bgcolor: "rgba(229, 9, 20, 0.1)",
                  border: "1px solid rgba(229, 9, 20, 0.3)",
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Box
                      sx={{
                        width: 50,
                        height: 50,
                        borderRadius: 2,
                        bgcolor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Heart size={28} color="white" fill="white" />
                    </Box>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{ fontWeight: 700, color: "white" }}
                      >
                        0
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        Улюблених фільмів
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
        ) : (
          <Box sx={{ textAlign: "center", py: 12 }}>
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                bgcolor: "rgba(229, 9, 20, 0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 4,
              }}
            >
              <LogIn size={60} color="#e50914" />
            </Box>
            <Typography
              variant="h4"
              sx={{ color: "white", mb: 2, fontWeight: 600 }}
            >
              Вхід необхідний
            </Typography>
            <Typography variant="body1" sx={{ color: "text.secondary" }}>
              Будь ласка, увійдіть, щоб переглянути дані облікового запису
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
}
