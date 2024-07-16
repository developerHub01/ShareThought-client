import {
  IconButton,
  FormControl,
  Paper,
  InputBase,
  styled,
} from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { ThemeColors } from "../../constants/ThemeColors";

const Wrapper = styled(Paper)(({ theme }) => {
  return {
    background: theme.palette.primary.main,
    borderColor: "#393d42",
  };
});

const SearchBar = () => {
  const [searchText, setSearchText] = useState<string>("");
  const handleSearchOnChange = (e: ChangeEvent<HTMLInputElement>) =>
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setSearchText((_prev) => e.target.value);

  const handleSearch = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

  return (
    <Wrapper
      sx={{
        width: "100%",
        maxWidth: 550,
        borderRadius: 50,
        overflow: "hidden",
        p: 0.5,
      }}
      // elevation={24}
      variant="outlined"
    >
      <FormControl
        component={"form"}
        onSubmit={handleSearch}
        sx={{
          display: "flex",
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          gap: 0.5,
          justifyContent: "space-between",
        }}
      >
        <InputBase
          fullWidth
          id="search"
          placeholder="Search"
          value={searchText}
          onChange={handleSearchOnChange}
          sx={{
            px: 2,
            py: 0.5,
            background: ThemeColors.BACKGROUND,
            borderRadius: "100px 0 0 100px",
          }}
        />
        <IconButton
          aria-label="search"
          type="submit"
          sx={{
            width: 50,
          }}
        >
          <SearchIcon
            sx={{
              color: ThemeColors.BACKGROUND,
              height: "100%",
            }}
          />
        </IconButton>
      </FormControl>
    </Wrapper>
  );
};

export default SearchBar;
