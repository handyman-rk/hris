import {
  Card,
  CardContent,
  Stack,
  Box,
  Typography,
  Skeleton,
} from "@mui/material";

export function StatCard({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <Card>
      <CardContent>
        <Stack spacing={1.5}>
          <Stack spacing={1} alignItems="start">
            <Box
              sx={{
                backgroundColor: `${color}15`,
                p: 1,
                borderRadius: 2,
                alignItems: "center",
                mr: 2,
              }}
              color={color}
            >
              {icon}
            </Box>
            <Typography
              variant="body1"
              component="div"
              color="text.secondary"
              sx={{ fontWeight: 500 }}
            >
              {title}
            </Typography>
          </Stack>
          <Typography variant="h1" component="div">
            {value}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export function StatCardSkeleton() {
  return (
    <Card>
      <CardContent>
        <Stack spacing={2}>
          <Stack spacing={1.5} alignItems="start">
            <Skeleton variant="rounded" width={40} height={40} />
            <Skeleton variant="rounded" width={140}  />
          </Stack>
          <Skeleton variant="rounded" width={60} height={36} />
        </Stack>
      </CardContent>
    </Card>
  );
}
