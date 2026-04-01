import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Search as SearchIcon } from "lucide-react";
import { ChangeEvent } from "react";

export default function Search(props: {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: (event: React.FormEvent<HTMLElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLElement>) => void;
  initialValue?: string;
}) {
  const { onChange, onSearch, onKeyDown, initialValue } = props;

  return (
    <Box
      component="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(e);
      }}
      sx={{
        maxWidth: "700px",
        mx: "auto",
        mb: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(10px)",
          borderRadius: 2,
          overflow: "hidden",
          border: "2px solid rgba(255, 255, 255, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            borderColor: "rgba(229, 9, 20, 0.4)",
          },
          "&:focus-within": {
            backgroundColor: "rgba(255, 255, 255, 0.15)",
            borderColor: "primary.main",
            boxShadow: "0 0 0 3px rgba(229, 9, 20, 0.15)",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            pl: 2.5,
            color: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <SearchIcon size={22} />
        </Box>
        <TextField
          id="movie-search"
          type="text"
          placeholder="Пошук фільмів..."
          defaultValue={initialValue}
          fullWidth
          variant="standard"
          onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event)}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) =>
            onKeyDown(event)
          }
          sx={{
            "& .MuiInput-root": {
              color: "white",
              fontSize: "1.05rem",
              px: 2,
              py: 1.5,
              "&:before, &:after": {
                display: "none",
              },
            },
            "& .MuiInput-input": {
              "&::placeholder": {
                color: "rgba(255, 255, 255, 0.4)",
                opacity: 1,
              },
            },
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            minWidth: "110px",
            height: "100%",
            borderRadius: 0,
            fontSize: "1rem",
            fontWeight: 600,
          }}
        >
          Знайти
        </Button>
      </Box>
    </Box>
  );
}
