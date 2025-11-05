import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Input from "@mui/material/Input";
import { ChangeEvent } from "react";

export default function Search(props: {
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  initialValue?: string;
}) {
  const { onChange, onSearch, initialValue } = props;

  return (
    <Container
      maxWidth="sm"
      sx={{ my: 2, display: "flex", flexDirection: "row", gap: 2 }}
    >
      <Input
        id="movie-search"
        type="text"
        placeholder="Search for movies..."
        defaultValue={initialValue}
        fullWidth
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event)}
      />
      <Button
        onClick={() => onSearch()}
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
      >
        Search
      </Button>
    </Container>
  );
}
