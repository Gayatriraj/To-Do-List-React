import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CancelIcon from "@mui/icons-material/Cancel";
import logo from "../components/images/image.avif"; 

const Header = ({
  onSearch,
  onClear,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); 
    onSearch(searchTerm);
  };
  const handleClearSearch = (e) => {
    setSearchTerm("");
    onClear();
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <img src={logo} alt="Logo" style={{ width: 50, marginRight: 16 }} />
          <Typography
            variant="h6"
            component="div"
            sx={{ fontFamily: "Rock Salt, cursive" }}
          >
            The To-Do List
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{ display: "flex", alignItems: "center" }}
        >
          <TextField
            variant="outlined"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search tasks"
            size="small"
            sx={{
              backgroundColor: "white",
              borderRadius: 1,
              marginLeft: 80,
              width: 300,
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "transparent", 
                },
                "&:hover fieldset": {
                  borderColor: "transparent",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "transparent", 
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {searchTerm && (
                    <IconButton
                      size="small"
                      onClick={handleClearSearch}
                      edge="end"
                      sx={{ color: "black" }}
                    >
                      <CancelIcon />
                    </IconButton>
                  )}
                </InputAdornment>
              ),
            }}
          />
          <IconButton
            type="submit"
            color="inherit"
            sx={{ ml: 1, backgroundColor: "white" }}
          >
            <SearchIcon sx={{ color: "black" }} />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
