import { Typography, Box, Stack } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const defaultDescription = "Something went wrong. Please try again later.";

export function ErrorState({
  title,
  description = defaultDescription,
}: {
  title: string;
  description?: string;
}) {
  return (
    <Box sx={{p: 2}}>
      <Stack spacing={1} sx={{alignItems: 'center'}}>
        <ErrorOutlineIcon color="error" fontSize="large" />
        <Box sx={{textAlign: 'center'}}>
        <Typography variant="body1">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        </Box>
      </Stack>
    </Box>
  );
}
