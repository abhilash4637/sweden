'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/authSlice'; // Adjust the path as needed
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#37474f', color: '#fff' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
            MySite
          </Link>
        </Typography>

        {/* Mobile Menu Icon */}
        <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
          <IconButton size="large" color="inherit" onClick={handleOpenNavMenu}>
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorElNav}
            open={Boolean(anchorElNav)}
            onClose={handleCloseNavMenu}
          >
           {!isLoggedIn
            ? [
                <MenuItem key="login" onClick={handleCloseNavMenu}>
                    <ListItemIcon>
                    <LoginIcon fontSize="small" />
                    </ListItemIcon>
                    <Link href="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemText>Sign In</ListItemText>
                    </Link>
                </MenuItem>,
                <MenuItem key="register" onClick={handleCloseNavMenu}>
                    <ListItemIcon>
                    <PersonAddIcon fontSize="small" />
                    </ListItemIcon>
                    <Link href="/register" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemText>Register</ListItemText>
                    </Link>
                </MenuItem>,
                ]
            : [
                <MenuItem key="dashboard" onClick={handleCloseNavMenu}>
                    <Link href="/dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Dashboard
                    </Link>
                </MenuItem>,
                ]}

          </Menu>
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
          {!isLoggedIn ? (
            <div>
              <Button color="inherit" component={Link} href="/login" startIcon={<LoginIcon />}>
                Sign In
              </Button>
              <Button color="inherit" component={Link} href="/register" startIcon={<PersonAddIcon />}>
                Register
              </Button>
            </div>
          ) : (
            <div>
              <Button color="inherit" component={Link} href="/dashboard">
                Dashboard
              </Button>
              <IconButton color="inherit" onClick={handleOpenUserMenu}>
                <AccountCircle />
              </IconButton>
              <Menu
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <ListItemIcon>
                    <AccountCircle fontSize="small" />
                  </ListItemIcon>
                  <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <ListItemText>Profile</ListItemText>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </div>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
