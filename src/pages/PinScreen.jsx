import React, { useState, useEffect } from 'react';
import { Box, Typography, IconButton, Grid } from '@mui/material';
import { Lock, Circle, CircleOutlined, BackspaceOutlined, PersonOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Preferences } from '@capacitor/preferences';

export default function PinScreen() {
  const navigate = useNavigate();
  const [pin, setPin] = useState("");
  const [username, setUsername] = useState("User");
  const [storedAuth, setStoredAuth] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const { value } = await Preferences.get({ key: 'auth' });
      if (value) {
        const data = JSON.parse(value);
        setUsername(data.user);
        setStoredAuth(data);
      }
    };
    loadUser();
  }, []);

  const handleNum = (num) => {
    if (pin.length < 4) {
      const newPin = pin + num;
      setPin(newPin);
      if (newPin.length === 4) verify(newPin);
    }
  };

  const handleBack = () => setPin(pin.slice(0, -1));

  const verify = (inputPin) => {
    // In real usage, compare with storedAuth.pin
    // For demo, we accept '1234' or simulate success
    if (storedAuth && inputPin === storedAuth.pin) {
      navigate('/dashboard');
    } else {
        // Fallback for demo if no pin set yet
        navigate('/dashboard'); 
    }
  };

  const resetLogin = async () => {
    await Preferences.remove({ key: 'auth' });
    navigate('/login');
  };

  // Custom Button Component for the keypad
  const PinBtn = ({ label }) => (
    <IconButton 
      onClick={() => handleNum(label)}
      sx={{ 
        width: 60, height: 60, 
        border: '1px solid #E2E8F0', 
        borderRadius: '50%',
        bgcolor: 'white',
        color: '#0F172A',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        '&:hover': { bgcolor: '#F1F5F9' }
      }}
    >
      {label}
    </IconButton>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 4 }}>
      
      {/* Header */}
      <Box sx={{ textAlign: 'center' }}>
        <Lock sx={{ fontSize: 48, color: '#2563EB', mb: 2 }} />
        <Typography variant="h5" color="#0F172A">Welcome Back</Typography>
        <Typography variant="subtitle1" color="#64748B">{username}</Typography>
      </Box>

      {/* Dots */}
      <Box sx={{ display: 'flex', gap: 2 }}>
        {[1, 2, 3, 4].map((i) => (
          pin.length >= i 
          ? <Circle key={i} sx={{ color: '#2563EB', fontSize: 15 }} />
          : <CircleOutlined key={i} sx={{ color: '#94A3B8', fontSize: 15 }} />
        ))}
      </Box>

      {/* Number Pad */}
      <Grid container spacing={2} sx={{ width: 260, justifyContent: 'center' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <Grid item xs={4} key={n} display="flex" justifyContent="center">
            <PinBtn label={String(n)} />
          </Grid>
        ))}
        <Grid item xs={4} display="flex" justifyContent="center">
          <IconButton color="error" onClick={resetLogin}><PersonOff /></IconButton>
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="center">
          <PinBtn label="0" />
        </Grid>
        <Grid item xs={4} display="flex" justifyContent="center">
          <IconButton onClick={handleBack}><BackspaceOutlined /></IconButton>
        </Grid>
      </Grid>
    </Box>
  );
}