"use client";

import {
  Box,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

export default function HeroSection() {
  return (
    <Box
      sx={{
        textAlign: "center",
        px: { xs: 3, md: 10 },
        py: { xs: 2, md: 5 },
      }}
    >
      {/* Title & Subtitle */}
      <Typography
        variant="h4"
        gutterBottom
        
      >
        Get ahead with Us
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ maxWidth: 480, margin: "0 auto", marginBottom: "40px" }}
      >
        We're serving up trusted insights and anonymous conversation,
        so you'll have the goods you need to succeed.
      </Typography>

      {/* Features Grid */}
      <Grid container spacing={6} justifyContent="center" mb={6}>
        <Grid item xs={6} md={3}>
          <GroupsOutlinedIcon sx={{ fontSize: 60, color: "#ddd" }} />
          <Typography variant="subtitle1" mt={2}>
            Join your work community
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <WorkOutlineIcon sx={{ fontSize: 60, color: "#ddd" }} />
          <Typography variant="subtitle1" mt={2}>
            Find and apply to jobs
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <RateReviewOutlinedIcon sx={{ fontSize: 60, color: "#ddd" }} />
          <Typography variant="subtitle1" mt={2}>
            Search company reviews
          </Typography>
        </Grid>
        <Grid item xs={6} md={3}>
          <MonetizationOnOutlinedIcon sx={{ fontSize: 60, color: "#ddd" }} />
          <Typography variant="subtitle1" mt={2}>
            Compare salaries
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
