"use client";

import { TextField, Button, Box, Typography } from "@mui/material";
import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [value, setValue] = useState("");

  const handleSearchClick = () => {
    onSearch(value);
  };

  return (
    <Box display="flex" gap={1} alignItems="center" justifyContent="center">
      <Typography variant="h6" gutterBottom>
        Have an employer in mind?
      </Typography>
      <TextField
        variant="outlined"
        placeholder="Search companies..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          minWidth: 350,
          backgroundColor: "#fff",
          "& .MuiOutlinedInput-root": {
            borderRadius: "50px", 
            height: 50,
          },
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearchClick}
        sx={{
          borderRadius: "50px", // match roundness with TextField
          paddingX: 3,
          height: 50,
          textTransform: "none",
        }}
      >
        Search
      </Button>
    </Box>
  );
}
