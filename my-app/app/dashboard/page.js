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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';

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
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/company");
        const data = await res.json();

        const mapped = (Array.isArray(data) ? data : [data]).map((c, idx) => ({
          id: c.OrgNr || idx,
          OrgNr: c.OrgNr,
          name: c.Foretagsnamn,
          industry: c.Bransch1 || "Unknown",
          location: `${c.Sateskommun}, ${c.Sateslan}`,
          rating: Math.floor(Math.random() * 5) + 1,
          jobs: c.AntalArbetsstallen || 0,
        }));

        setCompanies(mapped);
        setTotal(mapped.length);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div>
        <Box mt={3} mb={3} display="flex" px={4} justifyContent={"center"}>
          <TextField
            fullWidth
            placeholder="Search companies, industries, locations..."
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value)}
            size="small"
            sx={{
              width: "450px", // decrease width
              height: "50px", // increase height
              backgroundColor: "#fff",
              borderRadius: "50px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "50px",
                height: "55px", // controls actual input height
                fontSize: "1rem", // larger text
                paddingRight: "12px",
                "&.Mui-focused fieldset": {
                  borderColor: "#008855", // your custom focus color
                  borderWidth: "2px",
                },
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
        </Box>
        <Box display="flex" gap={3} p={3}>
        
      <Box
          width={260}
          flexShrink={0}
          sx={{
            background: "#fff",
            p: 2,
            position: "sticky",
            top: 20,
            height: "fit-content",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Filters companies
          </Typography>

          <Divider sx={{ mb: 2 }} />

          {/* Industry Filter */}
          <Typography variant="subtitle2" gutterBottom>
            Industry
          </Typography>
          <Select
            fullWidth
            value={industry}
            onChange={(e) => { setPage(1); setIndustry(e.target.value); }}
            displayEmpty
            size="small"
            sx={{ mb: 3 }}
          >
            <MenuItem value="">All Industries</MenuItem>
            <MenuItem value="Skogsförvaltning">Skogsförvaltning</MenuItem>
            <MenuItem value="IT Services">IT Services</MenuItem>
          </Select>

          {/* Location Filter */}
          <Typography variant="subtitle2" fontWeight="500" gutterBottom>
            Location
          </Typography>
          <Select
            fullWidth
            value={location}
            onChange={(e) => { setPage(1); setLocation(e.target.value); }}
            displayEmpty
            size="small"
            sx={{ mb: 3 }}
          >
            <MenuItem value="">All Locations</MenuItem>
            <MenuItem value="Haninge, Stockholm">Haninge, Stockholm</MenuItem>
          </Select>
        </Box>
      {/* Main Content */}
      <Box flex={1}>
        {/* Companies Grid */}
        {loading ? (
          <Box display="flex" justifyContent="center" py={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Box
            display="grid"
            gridTemplateColumns="repeat(auto-fill, minmax(450px, 1fr))"
            gap={3}
          >
            {companies.map((company) => (
              <Card
                key={company.id}
                onClick={() => router.push(`/company/${company.OrgNr}`)}
                sx={{
                  cursor: "pointer",
                  // borderRadius: 1.5,
                  boxShadow: "none",
                  transition: "all 0.2s",
                  "&:hover": {
                    backgroundColor: "#f2f4f5"
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h5" mb={0.5}>
                    {company.name}
                  </Typography>

                  <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                    <BusinessIcon fontSize="small" color="action" />
                    <Typography sx={{ lineHeight: 1.4 }} variant="body2" color="text.secondary">
                      Org.nr <strong>{company.OrgNr}</strong>
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center" gap={1}>
                    <LocationOnIcon fontSize="small" color="action" />
                    <Typography sx={{ lineHeight: 1.4 }} variant="body2" color="text.secondary">
                      {company.location}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {/* Pagination */}
        {total > 0 && (
          <Box display="flex" justifyContent="center" mt={4}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Box>
        )}
      </Box>
    </Box>
    </div>
  );
}
