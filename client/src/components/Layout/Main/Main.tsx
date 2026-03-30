'use client'

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Film, Search as SearchIcon, Sparkles } from "lucide-react";
import Stack from "@mui/material/Stack";

export function Main() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?input=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.95) 100%), url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 1200 600\"><rect fill=\"%23141414\" width=\"1200\" height=\"600\"/><g fill-opacity=\"0.05\"><circle fill=\"%23e50914\" cx=\"100\" cy=\"100\" r=\"100\"/><circle fill=\"%23e50914\" cx=\"900\" cy=\"400\" r=\"150\"/><circle fill=\"%23e50914\" cx=\"1100\" cy=\"150\" r=\"80\"/></g></svg>')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        position: "relative",
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center" sx={{ py: 8 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              mb: 2,
            }}
          >
            <Film size={48} color="#e50914" strokeWidth={2} />
            <Sparkles size={32} color="#e50914" strokeWidth={2} />
          </Box>

          <Typography
            variant="h1"
            component="h1"
            sx={{
              textAlign: "center",
              background: "linear-gradient(135deg, #ffffff 0%, #e50914 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 2,
            }}
          >
            Movie Explorer
          </Typography>

          <Typography
            variant="h4"
            component="p"
            sx={{
              textAlign: "center",
              color: "text.secondary",
              maxWidth: "700px",
              fontWeight: 400,
            }}
          >
            Швидкий пошук та огляд фільмів
          </Typography>

          <Box
            component="form"
            onSubmit={handleSearch}
            sx={{
              width: "100%",
              maxWidth: "600px",
              mt: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                borderRadius: 2,
                overflow: "hidden",
                border: "2px solid transparent",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderColor: "rgba(229, 9, 20, 0.5)",
                },
                "&:focus-within": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                  borderColor: "primary.main",
                  boxShadow: "0 0 0 4px rgba(229, 9, 20, 0.2)",
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  pl: 3,
                  color: "text.secondary",
                }}
              >
                <SearchIcon size={24} />
              </Box>
              <Box
                component="input"
                value={searchQuery}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSearchQuery(e.target.value)
                }
                placeholder="Пошук фільму..."
                sx={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  backgroundColor: "transparent",
                  color: "white",
                  fontSize: "1.125rem",
                  padding: "18px 20px",
                  fontFamily: "inherit",
                  "&::placeholder": {
                    color: "rgba(255, 255, 255, 0.5)",
                  },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  minWidth: "120px",
                  height: "100%",
                  borderRadius: 0,
                  fontSize: "1rem",
                }}
              >
                Знайти
              </Button>
            </Box>
          </Box>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            <Link href="/explore" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Film size={20} />}
                sx={{
                  px: 5,
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 8px 20px rgba(229, 9, 20, 0.4)",
                  },
                  transition: "all 0.3s ease",
                }}
              >
                До каталогу
              </Button>
            </Link>
          </Box>

          <Box
            sx={{
              mt: 8,
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(3, 1fr)",
              },
              gap: 3,
              width: "100%",
              maxWidth: "900px",
            }}
          >
            {[
              {
                title: "Швидкий пошук",
                description: "Знайдіть будь-який фільм миттєво",
              },
              {
                title: "Детальна інформація",
                description: "Опис, рейтинги та трейлери",
              },
              {
                title: "Персоналізація",
                description: "Збережіть улюблені фільми",
              },
            ].map((feature, index) => (
              <Box
                key={index}
                sx={{
                  textAlign: "center",
                  p: 3,
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  borderRadius: 2,
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.08)",
                    transform: "translateY(-4px)",
                    borderColor: "rgba(229, 9, 20, 0.3)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: "white", mb: 1, fontWeight: 600 }}
                >
                  {feature.title}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {feature.description}
                </Typography>
              </Box>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
