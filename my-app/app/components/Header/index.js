'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/authSlice'; 
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
  Badge,
} from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications'; // ✅ Import Notification
import AuthModal from "../AuthModal";

export default function Header() {
  const dispatch = useDispatch();
  const router = useRouter();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // example count

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/');
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static" sx={{
        backgroundColor: '#ffff',
        color: '#000',
        borderBottom: '1px solid #ddd', 
        boxShadow: 'none',
        padding: '0 40px'
      }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ display: { xs: 'none', sm: 'block' } }}>
          <Link href="/" style={{ color: '#008855', textDecoration: 'none', fontWeight: '600', fontSize: '24px' }}>
            Insyn
          </Link>
        </Typography>

        {/* Mobile Menu */}
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
                      <ListItemText>Logga in</ListItemText>
                    </Link>
                </MenuItem>
              ]
            : [
                <MenuItem key="profile">
                  <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Profil
                  </Link>
                </MenuItem>,
                <MenuItem key="Logout" onClick={handleLogout}>
                  <Link href="" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Logga ut
                  </Link>
                </MenuItem>,
              ]}
          </Menu>
        </Box>

        {/* Desktop Menu */}
        <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 2 }}>
          {!isLoggedIn ? (
            <Button color="inherit" startIcon={<LoginIcon />} onClick={() => setOpen(true)} >
              Logga in
            </Button>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {/* ✅ Notification Icon with badge */}
              <IconButton color="inherit">
                <Badge badgeContent={notifications} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              {/* ✅ Profile Icon */}
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
                    <ListItemText>Profil</ListItemText>
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logga ut</ListItemText>
                </MenuItem>
              </Menu>
            </Box>
          )}
        </Box>
      </Toolbar>
      <AuthModal open={open} handleClose={() => setOpen(false)} />
    </AppBar>
  );
}
