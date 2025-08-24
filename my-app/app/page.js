'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Card,
  CardContent,
  Chip,
  Rating,
  Pagination,
  CircularProgress,
  Slider,
  TextField,
  InputAdornment,
  Divider,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import HeroSection from './components/HeroSection';

export default function Dashboard() {
  const router = useRouter();

  // State
  const [searchTerm, setSearchTerm] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [ratingRange, setRatingRange] = useState([0, 5]);
  const [jobRange, setJobRange] = useState([0, 200]);
  const [companies, setCompanies] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const pageSize = 12;

  // Login check
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  // Fetch companies
  // useEffect(() => {
  //   const fetchCompanies = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await fetch("/api/company");
  //       const data = await res.json();

  //       const mapped = (Array.isArray(data) ? data : [data]).map((c, idx) => ({
  //         id: c.OrgNr || idx,
  //         OrgNr: c.OrgNr,
  //         name: c.Foretagsnamn,
  //         industry: c.Bransch1 || "Unknown",
  //         location: `${c.Sateskommun}, ${c.Sateslan}`,
  //         rating: Math.floor(Math.random() * 5) + 1,
  //         jobs: c.AntalArbetsstallen || 0,
  //       }));

  //       setCompanies(mapped);
  //       setTotal(mapped.length);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCompanies();
  // }, []);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <Box display="flex" gap={3} p={3}>

      {/* Main Content */}
      <Box flex={1}>
        {/* Search Bar */}
        {/* <Box mb={6} justifyContent="center">
        </Box> */}
        {/* <Box mb={3} display="flex" justifyContent="center">
         <TextField
            placeholder="Search companies, industries, locations..."
            size="medium" // bigger input
            sx={{
              width: "500px", // decrease width
              height: "55px", // increase height
              backgroundColor: "#fff",
              borderRadius: "50px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                height: "55px", // controls actual input height
                fontSize: "1rem", // larger text
                paddingRight: "12px",
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box> */}
{/* 
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
            gap={3}
          >
            {companies.map((company) => (
              <Card
                key={company.id}
                onClick={() => router.push(`/company/${company.OrgNr}`)}
                sx={{
                  cursor: "pointer",
                  borderRadius: 2,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
                  transition: "all 0.2s",
                  "&:hover": {
                    boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                    transform: "translateY(-4px)",
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h6" fontWeight="600">
                    {company.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    OrgNr: {company.OrgNr}
                  </Typography>

                  <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                    <Chip size="small" label={company.industry} />
                    <Chip size="small" label={company.location} />
                  </Box>

                  <Box mt={1} display="flex" alignItems="center">
                    <Rating value={company.rating} precision={0.5} readOnly />
                    <Typography variant="body2" ml={1}>
                      {company.rating}
                    </Typography>
                  </Box>

                  <Typography variant="body2" mt={1} fontWeight="500">
                    {company.jobs} jobs
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {total > 0 && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Box>
        )} */}
        {/* <Divider sx={{ my: 1, borderColor: "#ddd", borderBottomWidth: 2 }} /> */}
        <HeroSection/>
      </Box>
    </Box>
  );
}
