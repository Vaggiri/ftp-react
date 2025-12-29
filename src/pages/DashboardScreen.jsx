import React, { useState } from 'react';
import { Box, Paper, Typography, IconButton, Grid, Breadcrumbs } from '@mui/material';
import { Cloud, ChevronLeft, CreateNewFolder, Upload, Refresh, Folder, InsertDriveFile, PictureAsPdf, Image, Code, FolderZip } from '@mui/icons-material';

// --- MOCK DATA to simulate FTP ---
const MOCK_FILES = [
  { name: "Assignment 1", is_dir: true },
  { name: "Notes", is_dir: true },
  { name: "resume.pdf", is_dir: false, type: 'pdf' },
  { name: "project.py", is_dir: false, type: 'code' },
  { name: "profile.jpg", is_dir: false, type: 'img' },
  { name: "backup.zip", is_dir: false, type: 'zip' }
];

export default function DashboardScreen() {
  const [path, setPath] = useState("/");
  const [files, setFiles] = useState(MOCK_FILES);

  const handleNav = (folderName) => {
    setPath((prev) => `${prev}${folderName}/`);
  };

  const handleBack = () => {
    if (path === "/") return;
    const newPath = path.split('/').slice(0, -2).join('/') + '/';
    setPath(newPath || "/");
  };

  // Helper to get Icon based on type (matches your Python colors)
  const getFileIcon = (file) => {
    if (file.is_dir) return <Folder sx={{ fontSize: 50, color: '#F59E0B' }} />; // Orange
    switch (file.type) {
        case 'pdf': return <PictureAsPdf sx={{ fontSize: 50, color: '#EF4444' }} />; // Red
        case 'img': return <Image sx={{ fontSize: 50, color: '#10B981' }} />; // Green
        case 'code': return <Code sx={{ fontSize: 50, color: '#2563EB' }} />; // Blue
        case 'zip': return <FolderZip sx={{ fontSize: 50, color: '#F97316' }} />; // Orange-Red
        default: return <InsertDriveFile sx={{ fontSize: 50, color: '#94A3B8' }} />; // Gray
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* Header */}
      <Paper elevation={1} square sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <Cloud sx={{ color: '#2563EB', fontSize: 30 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, color: '#0F172A' }}>Amrita Box</Typography>
        <Box sx={{ bgcolor: '#EFF6FF', px: 2, py: 0.5, borderRadius: 4 }}>
          <Typography variant="caption" sx={{ color: '#2563EB', fontWeight: 'bold' }}>
            Girisudhan
          </Typography>
        </Box>
      </Paper>

      {/* Toolbar */}
      <Box sx={{ p: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
        <IconButton onClick={handleBack} disabled={path === "/"} sx={{ opacity: path === "/" ? 0 : 1 }}>
          <ChevronLeft />
        </IconButton>
        
        <Typography variant="subtitle2" sx={{ flexGrow: 1, color: '#64748B' }}>
            {path === "/" ? "/ Root" : `...${path}`}
        </Typography>

        <IconButton><CreateNewFolder /></IconButton>
        <IconButton><Upload /></IconButton>
        <IconButton><Refresh /></IconButton>
      </Box>

      {/* File Grid */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, bgcolor: '#F8FAFC' }}>
        <Grid container spacing={2}>
          {files.map((file, index) => (
            <Grid item xs={4} key={index}>
              <Paper 
                elevation={0}
                onClick={() => file.is_dir ? handleNav(file.name) : alert(`Options for ${file.name}`)}
                sx={{ 
                  height: 130, 
                  display: 'flex', flexDirection: 'column', 
                  alignItems: 'center', justifyContent: 'center',
                  border: '1px solid #E2E8F0',
                  cursor: 'pointer',
                  '&:hover': { bgcolor: '#F1F5F9' }
                }}
              >
                {getFileIcon(file)}
                <Typography 
                  variant="caption" 
                  align="center" 
                  sx={{ mt: 1, px: 1, fontWeight: 'bold', color: '#334155', lineHeight: 1.2 }}
                >
                  {file.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

    </Box>
  );
}