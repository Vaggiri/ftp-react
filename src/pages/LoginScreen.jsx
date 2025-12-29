import React, { useState } from 'react';
import { Box, Card, Typography, TextField, Button, InputAdornment } from '@mui/material';
import { AccountCircle, Lock } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Preferences } from '@capacitor/preferences';

export default function LoginScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async () => {
    if (!user || !pass) return alert("Enter Credentials");
    
    // In a real app, you would validate FTP here before saving
    // For now, we simulate the "First Login" flow
    
    // Check if we need to set a PIN (simulating your Logic)
    const { value } = await Preferences.get({ key: 'auth' });
    
    if (!value) {
      // Temporarily store creds to pass to PIN setup or Dashboard
      // For this demo, we'll just save them and go to dashboard
      // You can add the "Set PIN" dialog here if you want strict parity
      await Preferences.set({
        key: 'current_session',
        value: JSON.stringify({ user, pass })
      });
      navigate('/dashboard');
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', p: 2 }}>
      <Card elevation={2} sx={{ width: 320, p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
        
        <Box sx={{ textAlign: 'center', mb: 1 }}>
          <Typography variant="h5" color="#0F172A">Amrita FTP</Typography>
          <Typography variant="caption" color="#64748B">Workspace Login</Typography>
        </Box>

        <TextField
          fullWidth
          label="Roll Number"
          variant="outlined"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end"><AccountCircle color="action" /></InputAdornment>,
          }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          InputProps={{
            endAdornment: <InputAdornment position="end"><Lock color="action" /></InputAdornment>,
          }}
        />

        <Button 
          variant="contained" 
          fullWidth 
          size="large" 
          onClick={handleLogin}
          sx={{ mt: 1, bgcolor: '#2563EB' }}
        >
          CONNECT
        </Button>

        {/* Developer Credit */}
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="caption" display="block" sx={{ color: '#94A3B8' }}>
            Designed by <Box component="span" sx={{ color: '#2563EB', fontWeight: 'bold' }}>Girisudhan V</Box>
          </Typography>
          <Typography variant="caption" sx={{ color: '#94A3B8' }}>
            2nd Year ECE
          </Typography>
        </Box>

      </Card>
    </Box>
  );
}