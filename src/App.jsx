import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import theme from './theme';

// Screens
import PinScreen from './pages/PinScreen';
import LoginScreen from './pages/LoginScreen';
import DashboardScreen from './pages/DashboardScreen';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ height: '100vh', bgcolor: 'background.default', overflow: 'hidden' }}>
        <Routes>
          <Route path="/" element={<AuthCheck />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/pin" element={<PinScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
        </Routes>
      </Box>
    </ThemeProvider>
  );
}

// Logic to decide initial screen (like your on_start)
import { Preferences } from '@capacitor/preferences';
function AuthCheck() {
  const navigate = useNavigate();
  React.useEffect(() => {
    const checkAuth = async () => {
      const { value } = await Preferences.get({ key: 'auth' });
      if (value) {
        navigate('/pin', { replace: true });
      } else {
        navigate('/login', { replace: true });
      }
    };
    checkAuth();
  }, [navigate]);
  return null;
}