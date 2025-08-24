'use client';

import React from 'react';
import { Box, Container, Typography, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#f5f5f5',
        padding: '20px 40px',
        borderTop: '1px solid #ddd',
        mt: 'auto',
      }}
    >
      <Container
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} MySite. All rights reserved.
        </Typography>
        <Box>
          <IconButton color="inherit" href="https://facebook.com" target="_blank">
            <FacebookIcon />
          </IconButton>
          <IconButton color="inherit" href="https://twitter.com" target="_blank">
            <TwitterIcon />
          </IconButton>
          <IconButton color="inherit" href="https://instagram.com" target="_blank">
            <InstagramIcon />
          </IconButton>
          <IconButton color="inherit" href="https://linkedin.com" target="_blank">
            <LinkedInIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
}
