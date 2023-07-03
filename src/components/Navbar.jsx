import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authActions } from "../store";

const pages = ["All Splits", "Add Splits", "My Splits"];
const settings = ["Logout"];
const buttonStyle = {
  backgroundColor: "#f8dc9a",
  mt: 2.5,
  borderRadius: 2,

  color: "#202151",
  ":hover": {
    bgcolor: "#202151",
    color: "#f8dc9a",
  },
};

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/");
  };
  const handleLogout = () => {
    dispatch(authActions.logout());
    handleRedirect();
  };
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" sx={{marginBottom:6}} >
      <Container maxWidth="xl" sx={{backgroundColor:'#0b0c1d'}}>
        <Toolbar disableGutters>
          {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "ubuntu",
              fontWeight: 700,

              color: "#facb60",
              textDecoration: "none",
            }}
          >
            💰Tracker
          </Typography>

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
              <MenuItem onClick={handleCloseNavMenu}>
                <Button onClick={() => navigate("/transactions/add")}>
                  <Typography textAlign="center">Add</Typography>
                </Button>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Button onClick={() => navigate("/myTransactions")}>
                  <Typography textAlign="center">My splits</Typography>
                </Button>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Button onClick={() => navigate("/transactions")}>
                  <Typography textAlign="center">All</Typography>
                </Button>
              </MenuItem>
            </Menu>
          </Box>
          {/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "ubuntu",
              fontWeight: 700,

              color: "inherit",
              textDecoration: "none",
            }}
          >
            💰Tracker
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => navigate("/transactions/add")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              Add
            </Button>
            <Button
              onClick={() => navigate("/myTransactions")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              My Splits
            </Button>

            <Button
              onClick={() => navigate("/transactions")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              All
            </Button>
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar  />
              </IconButton>
            </Tooltip>
          
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
          
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            > 
          
              <MenuItem>
            
                {!isLoggedIn && (
                  <>
                    {" "}
                    <Button onClick={() => navigate("/auth")} to="/auth">
                      Login 
                    </Button>
                  </>
                )}
              </MenuItem>

              <MenuItem>
                {isLoggedIn && (
                  <Button onClick={() => handleLogout()}>Logout</Button>
                )}
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
