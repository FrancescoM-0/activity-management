import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { IPath, Paths } from "../services/Paths";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout, selectAuthUser } from "../redux/reducers/authSlice";

function NavBar() {
  const auth = useAppSelector(selectAuthUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);

  if (auth === null) {
    return <></>;
  }

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function linkTo(path: string): void {
    if (path === Paths.login.path) {
      dispatch(logout());
    }
    navigate(path);
  }

  let authorizedPaths: IPath[] = [];
  for (let pathKey in Paths) {
    if (Paths[pathKey].role.length === 0) {
      authorizedPaths.push(Paths[pathKey]);
      continue;
    }
    for (let roleKey in Paths[pathKey].role) {
      if (auth!.role === Paths[pathKey].role[roleKey]) {
        authorizedPaths.push(Paths[pathKey]);
      }
    }
  }

  let pathsMenuItem: JSX.Element[] = [];
  for (let key in authorizedPaths) {
    pathsMenuItem.push(
      <MenuItem
        key={key}
        onClick={() => {
          handleCloseNavMenu();
          linkTo(authorizedPaths[key].path);
        }}
      >
        <Typography textAlign="center">{authorizedPaths[key].name}</Typography>
      </MenuItem>
    );
  }

  let pathsButton: JSX.Element[] = [];
  for (let key in authorizedPaths) {
    pathsButton.push(
      <Button
        key={key}
        onClick={() => {
          handleCloseNavMenu();
          linkTo(authorizedPaths[key].path);
        }}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        {authorizedPaths[key].name}
      </Button>
    );
  }

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pathsMenuItem}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pathsButton}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <br />
    </>
  );
}

export default NavBar;
