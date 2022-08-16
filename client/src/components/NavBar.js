import React, {useState} from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import logoGroupomania from '../assets/logo.svg'
import Logout from './Logout';
import { NavLink } from 'react-router-dom';
import { Grid, Link, List } from '@mui/material';
import SearchBar from './SearchBar';

const NavBar = ({user}) => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  

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
    <>
      <Container>
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'inline-block', md: 'none' }, 
              }}
            >
                <MenuItem>
                    <NavLink to="/feed">Feed</NavLink>
                </MenuItem>
                <MenuItem>
                    <NavLink to="/profile">Profile</NavLink>
                </MenuItem>
                <MenuItem>
                    <SearchBar/>
                </MenuItem>
            </Menu>
          </Box>
        <Box component="img"
            src={logoGroupomania}
            sx={{
                height: 35,
                width: 350,
                maxHeight: { xs: 233, md: 167 },
                maxWidth: { xs: 350, md: 250 },
            }}
        />
          <Grid sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <List>
              <NavLink to="/feed">Feed</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/">Créer Post</NavLink>
              <SearchBar/>
            </List>
          </Grid>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {user.profilImage !== undefined && <Avatar src={"http://localhost:3050/Images/" + user.profilImage} alt="user" key={user.id}/>}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {
              user.isAdmin === true &&
                <MenuItem>
                  <NavLink to="/admin/*">Admin</NavLink>
                </MenuItem>
              }
              <MenuItem>
                  <Logout/>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </>
  );
};
export default NavBar;