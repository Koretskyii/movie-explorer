'use client'

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#e50914', // Netflix-style red
            light: '#ff4444',
            dark: '#b00710',
        },
        secondary: {
            main: '#ffffff',
            light: '#f5f5f5',
            dark: '#e0e0e0',
        },
        background: {
            default: '#141414',
            paper: '#1f1f1f',
        },
        text: {
            primary: '#ffffff',
            secondary: '#b3b3b3',
        },
    },
    typography: { 
        fontFamily: `'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
        h1: {
            fontWeight: 700,
            fontSize: '3.5rem',
            letterSpacing: '-0.02em',
        },
        h2: {
            fontWeight: 600,
            fontSize: '2.5rem',
        },
        h4: {
            fontWeight: 600,
            fontSize: '1.75rem',
        },
        body1: {
            fontSize: '1.125rem',
            lineHeight: 1.6,
        },
    },
    shape: {
        borderRadius: 8,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 600,
                    padding: '12px 32px',
                    fontSize: '1rem',
                },
            },
        },
    },
})

export default theme;

