'use client';

import { Container, Typography, Box, Button } from '@mui/material';
import Link from 'next/link';

export default function HomePage() {
  return (
    <Container maxWidth="md" sx={{ mt: 10, textAlign: 'center' }}>
      <Typography variant="h3" gutterBottom>
        Welcome to MySite
      </Typography>

      <Typography variant="subtitle1" sx={{ mb: 4 }}>
        Your modern platform built with Next.js, SCSS, and Material UI.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Link href="/dashboard">
          <Button variant="contained" color="primary">
            Go to Dashboard
          </Button>
        </Link>
        <Link href="/about">
          <Button variant="contained" color="primary">
            Learn More
          </Button>
        </Link>
      </Box>
    </Container>
  );
}
