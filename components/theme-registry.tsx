"use client";

import type React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Create a theme instance
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#457b9d",
      light: "#6b98b7",
    },
    secondary: {
      main: "#607D8B",
      light: "#8EACBB",
    },
    background: {
      default: "#F5F5F5",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: "var(--font-geist-sans)",
    h1: {
      fontSize: "2rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.25rem",
      fontWeight: 600,
    },
    h4: {
      fontSize: "1.125rem",
      fontWeight: 600,
    },
    h5: {
      fontSize: "1rem",
      fontWeight: 600,
    },
    h6: {
      fontSize: "0.875rem",
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 4,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: "#e0e0e0",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          borderColor: "#e0e0e0",

          "& .MuiTableCell-root": {
            color: "#666",
            fontWeight: 600,
          },
        },
      },
    },
  },
});

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
