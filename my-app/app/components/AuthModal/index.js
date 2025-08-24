"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "@/redux/authSlice";
import {
  Dialog,
  DialogContent,
  TextField,
  Button,
  Tabs,
  Tab,
  Box,
  Alert,
} from "@mui/material";
import { useRouter } from "next/navigation";

export default function AuthModal({ open, handleClose }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [tab, setTab] = useState(0); // 0 = Sign In, 1 = Register
  const [error, setError] = useState("");

  // Common states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Register-specific states
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleTabChange = (_, newValue) => {
    setTab(newValue);
    setError("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    if (email === "test@gmail.com" && password === "password123") {
      const fakeToken = "demo-token";
      const user = { email };

      dispatch(login({ token: fakeToken, user }));
      handleClose(); // close modal
      router.push("/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // In real app, call API. For now, just show success.
    setError("");
    alert("Registration successful! Please sign in.");
    setTab(0);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
     <div className={"auth-modal"}>
        <Tabs
        value={tab}
        onChange={handleTabChange}
        centered
      >
        <Tab className= "tab" label="Logga in" />
        <Tab className= "tab" label="Register" />
      </Tabs>

      <DialogContent>
        {tab === 0 ? (
          // Sign In Form
          <Box
            component="form"
            onSubmit={handleLogin}
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
          >
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ borderRadius: "25px", py: 1.2 }}
            >
              Logga in
            </Button>
          </Box>
        ) : (
          // Register Form
          <Box
            component="form"
            onSubmit={handleRegister}
            sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}
          >
            {error && <Alert severity="error">{error}</Alert>}

            <TextField
              label="Email"
              type="email"
              fullWidth
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{ borderRadius: "25px", py: 1.2 }}
            >
              Register
            </Button>
          </Box>
        )}
      </DialogContent>
     </div>
    </Dialog>
  );
}
