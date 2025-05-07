"use client";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { HomeOutlined, GolfCourseOutlined, CakeOutlined } from "@mui/icons-material";

const NAVIGATION = [
  {
    text: "Dashboard",
    link: "/",
    icon: <HomeOutlined fontSize="small" />,
  },
  {
    text: "Leaves",
    link: "/leaves",
    icon: <GolfCourseOutlined fontSize="small" />,
  },
  {
    text: "Birthdays",
    link: "/birthdays",
    icon: <CakeOutlined fontSize="small" />,
  },
];

export const SIDEBAR_WIDTH = "220px";

export function AppSidebar() {
  const pathname = usePathname();

  const isActiveLink = (path: string) => pathname === path;

  const getItemStyles = (path: string) => ({
    borderRadius: 2,
    px: 1,
    py: 0.5,
    color: isActiveLink(path) ? "#1976d2" : "#666",
    mb: 0.5,
    backgroundColor: isActiveLink(path)
      ? "rgba(25, 118, 210, 0.08)"
      : "transparent",
    "&:hover": {
      backgroundColor: "rgba(25, 118, 210, 0.04)",
    },
  });

  return (
    <Box
      sx={{
        width: SIDEBAR_WIDTH,
        height: "100vh",
        backgroundColor: "#f5f5f5",
        borderRight: "1px solid #e0e0e0",
        position: "fixed",
        left: 0,
        top: 0,
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography
          variant="h2"
          component="div"
          sx={{
            mb: 1,
            px: 1,
          }}
        >
          HRIS
        </Typography>
        <List>
          {NAVIGATION.map((item) => (
            <ListItem
              key={item.text}
              component={Link}
              href={item.link}
              sx={getItemStyles(item.link)}
            >
              <ListItemIcon
              sx={{minWidth: '16px', color: 'currentColor', opacity: 0.8, mr: 1}}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
              
              >
                <Typography variant="body1">{item.text}</Typography>
              </ListItemText>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}
