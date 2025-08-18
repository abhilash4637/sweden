import { NextResponse } from 'next/server';

// Mock dataset
const companies = Array.from({ length: 200 }, (_, i) => ({
  id: i + 1,
  name: `Company ${i + 1}`,
  logo: "https://via.placeholder.com/80",
  industry: ["Tech", "E-commerce", "IT Services"][i % 3],
  location: ["California, USA", "Washington, USA", "Mumbai, India"][i % 3],
  rating: parseFloat((Math.random() * 2 + 3).toFixed(1)),
  jobs: Math.floor(Math.random() * 200)
}));

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const searchTerm = searchParams.get('searchTerm')?.toLowerCase() || '';
  const industry = searchParams.get('industry') || '';
  const location = searchParams.get('location') || '';
  const minRating = parseFloat(searchParams.get('minRating') || '0');
  const maxRating = parseFloat(searchParams.get('maxRating') || '5');
  const minJobs = parseInt(searchParams.get('minJobs') || '0', 10);
  const maxJobs = parseInt(searchParams.get('maxJobs') || '999999', 10);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = 12;

  let filtered = companies.filter((c) =>
    c.name.toLowerCase().includes(searchTerm) &&
    (industry ? c.industry === industry : true) &&
    (location ? c.location === location : true) &&
    c.rating >= minRating &&
    c.rating <= maxRating &&
    c.jobs >= minJobs &&
    c.jobs <= maxJobs
  );

  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return NextResponse.json({
    total: filtered.length,
    page,
    pageSize,
    companies: paginated
  });
}
