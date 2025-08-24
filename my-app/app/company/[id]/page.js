'use client';

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Chip,
  Divider,
  Avatar,
  Grid
} from "@mui/material";

export default function CompanyDetails() {
  const { id } = useParams();

  const data = {
    "PeOrgNr": "161029626254",
    "OrgNr": "1029626254",
    "Foretagsnamn": "HEDKVISTS DÖDSBO, ULLA KRISTINA",
    "PostAdress": "RÅGSTIGEN 24",
    "PostNr": "137 55",
    "PostOrt": "TUNGELSTA",
    "Sateskommun": "Haninge",
    "Sateslan": "Stockholm",
    "Aregion": "Stockholm/Södertälje",
    "AntalArbetsstallen": 1,
    "Storleksklass": "0 anställda",
    "Foretagsstatus": "Är verksam",
    "JuridiskForm": "Oskiftade dödsbon",
    "Reklam": "Tar emot reklam, ej telefonnummerspärrat",
    "Utskick": "Postadress är OK",
    "Startdatum": "2025-01-20T00:00:00",
    "Registreringsdatum": "2025-01-20T00:00:00",
    "Bransch1": "Skogsförvaltning",
    "Avdelning1": "Jordbruk, skogsbruk och fiske",
    "Agarkategori": "Privat svenskt utan koncern",
    "PrivatPublikt": "Ej aktiebolag",
    "Arbetsgivarstatus": "Har aldrig varit registrerad som arbetsgivare",
    "Momsstatus": "Är registrerad för moms",
    "Fskattstatus": "Har aldrig varit registrerad för F-skatt",
    "Bolagsstatus": "Normalläge",
    "Sektor": "Koncerninterna finansinstitut och utlåningsföretag"
  };

  const [company, setCompany] = useState(data);

  useEffect(() => {
    setCompany(data);
  }, [id]);

  if (!company) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Box maxWidth="600px" mx="auto" bgcolor="#fff" p={5} borderRadius={3}>

      {/* Header */}
      <Box display="flex" alignItems="center" gap={3} mb={4}>
        <Avatar
          sx={{
            bgcolor: "",
            width: 80,
            height: 80,
            fontSize: 32,
            fontWeight: "bold"
          }}
        >
          {company.Foretagsnamn[0]}
        </Avatar>
        <Box>
          <Typography variant="h4" fontWeight="700" gutterBottom fontSize={'2rem'}>
            {company.Foretagsnamn}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            OrgNr: {company.OrgNr} | PeOrgNr: {company.PeOrgNr}
          </Typography>
          <Box mt={1} display="flex" gap={1}>
            <Chip
              label={company.Foretagsstatus}
            //   color={company.Foretagsstatus === "Är verksam" ? "success" : "default"}
              size="small"
            />
            <Chip label={company.Bolagsstatus} size="small" variant="outlined" />
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* About */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="600" gutterBottom>About</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1"><b>Legal Form:</b> {company.JuridiskForm}</Typography>
            <Typography variant="body1"><b>Ownership:</b> {company.Agarkategori}</Typography>
            <Typography variant="body1"><b>Public/Private:</b> {company.PrivatPublikt}</Typography>
            <Typography variant="body1"><b>Employees:</b> {company.Storleksklass}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1"><b>Sector:</b> {company.Sektor}</Typography>
            <Typography variant="body1"><b>Workplaces:</b> {company.AntalArbetsstallen}</Typography>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Location */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="600" gutterBottom>Location</Typography>
        <Typography variant="body1">{company.PostAdress}</Typography>
        <Typography variant="body1">{company.PostOrt}, {company.PostNr}</Typography>
        <Typography variant="body1">{company.Sateskommun}, {company.Sateslan}</Typography>
        <Typography variant="body2" color="text.secondary">
          Region: {company.Aregion}
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Industry */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="600" gutterBottom>Industry</Typography>
        <Typography variant="body1"><b>Primary:</b> {company.Bransch1}</Typography>
        <Typography variant="body2" color="text.secondary">{company.Avdelning1}</Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Timeline */}
      <Box mb={4}>
        <Typography variant="h6" fontWeight="600" gutterBottom>Company Timeline</Typography>
        <Typography variant="body1"><b>Founded:</b> {new Date(company.Startdatum).toLocaleDateString()}</Typography>
        <Typography variant="body1"><b>Registered:</b> {new Date(company.Registreringsdatum).toLocaleDateString()}</Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      {/* Other Info */}
      <Box mb={2}>
        <Typography variant="h6" fontWeight="600" gutterBottom>Other Info</Typography>
        <Box display="flex" flexWrap="wrap" gap={1}>
          <Chip label={company.Momsstatus} variant="outlined" />
          <Chip label={company.Fskattstatus} variant="outlined" />
          <Chip label={company.Arbetsgivarstatus} variant="outlined" />
          <Chip label={company.Reklam} variant="outlined" />
          <Chip label={company.Utskick} variant="outlined" />
        </Box>
      </Box>
    </Box>
  );
}
