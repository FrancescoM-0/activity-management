import { Button, Checkbox, Stack, TextField, Tooltip } from "@mui/material";
import Status from "../types/Status";
import { ChangeEvent, Fragment } from "react";

interface SearchBarProps {
  onTextFilterChange: (text: string) => void;
  statusFilter: string;
  onStatusFilterChange: (status: string) => void;
  onUserFilterChange?: (user: string) => void;
}

function SearchBar({
  onTextFilterChange,
  statusFilter,
  onStatusFilterChange,
  onUserFilterChange,
}: SearchBarProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onStatusFilterChange(Status[event.target.value].name);
  }
  function reset(): void {
    onTextFilterChange("");
    onStatusFilterChange("");
    if (typeof onUserFilterChange !== "undefined") {
      onUserFilterChange("");
    }

    (document.getElementById("searchText") as HTMLInputElement).value = "";
  }

  let statusOptions: JSX.Element[] = [];
  for (let key in Status) {
    statusOptions.push(
      <Fragment key={key}>
        <Tooltip title={Status[key].name}>
          <Checkbox
            value={key}
            checked={
              statusFilter.localeCompare(Status[key].name) ? false : true
            }
            icon={Status[key].icon}
            checkedIcon={Status[key].icon}
            onChange={(e) => handleChange(e)}
          ></Checkbox>
        </Tooltip>
      </Fragment>
    );
  }

  return (
    <>
      <TextField
        label="Search Tasks"
        id="searchText"
        onChange={(e) => {
          onTextFilterChange(e.target.value);
        }}
        sx={{
          width: "50vh",
          backgroundColor: "white",
          borderRadius: "4px",
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "gray",
          },
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "blue",
          },
          "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
            borderColor: "blue",
          },
        }}
      />
      <Button onClick={reset}>Reset</Button>
      <Stack direction="row">{statusOptions}</Stack>
    </>
  );
}

export default SearchBar;
