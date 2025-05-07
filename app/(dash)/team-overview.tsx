"use client";

import {
  Box,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import {
  GroupOutlined,
  PersonOutlined,
  GolfCourseOutlined,
} from "@mui/icons-material";
import { useSuspenseQuery } from "@apollo/client";
import { GET_TEAM_OVERVIEW } from "@/lib/graphql/queries";
import { Query } from "@/lib/graphql/types";
import { StatCard, StatCardSkeleton } from "@/components/stat-card";

export function TeamOverview() {
  const { data } = useSuspenseQuery<Query>(GET_TEAM_OVERVIEW);

  const { teamOverview } = data;

  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Team Overview
      </Typography>

      <Stack spacing={4}>
        <Grid container spacing={3}>
          <Grid size={4}>
            <StatCard
              title="Total Employees"
              value={teamOverview.totalEmployees}
              icon={<GroupOutlined fontSize="medium" />}
              color="#1976d2"
            />
          </Grid>
          <Grid size={4}>
            <StatCard
              title="Active Employees"
              value={teamOverview.activeEmployees}
              icon={<PersonOutlined fontSize="medium" />}
              color="#2e7d32"
            />
          </Grid>
          <Grid size={4}>
            <StatCard
              title="Employees on Leave"
              value={teamOverview.employeesOnLeave}
              icon={<GolfCourseOutlined fontSize="medium" />}
              color="#ed6c02"
            />
          </Grid>
        </Grid>

        <Card>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              Department Breakdown
            </Typography>
            <Box sx={{ height: 400 }}>
              <BarChart
                yAxis={[
                  {
                    label: "Number of Employees",
                  },
                ]}
                xAxis={[
                  {
                    scaleType: "band",
                    colorMap: {
                      type: "ordinal",
                      colors: [
                        "#B5D8EB",
                        "#C7E5C8",
                        "#E8C1E4",
                        "#FFE0B2",
                        "#BBDEFB",
                        "#D7CCC8",
                      ],
                    },
                    data: teamOverview.departmentBreakdown.map(
                      (item) => item.department
                    ),
                  },
                ]}
                series={[
                  {
                    data: teamOverview.departmentBreakdown.map(
                      (item) => item.count
                    ),
                    // color: "#1976d2",
                  },
                ]}
                height={350}
                borderRadius={10}
                barLabel="value"
              />
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export function TeamOverviewSkeleton() {
  return (
    <Box>
      <Typography variant="h2" sx={{ mb: 3 }}>
        Team Overview
      </Typography>

      <Stack spacing={4}>
        <Grid container spacing={3}>
          <Grid size={4}>
            <StatCardSkeleton />
          </Grid>
          <Grid size={4}>
            <StatCardSkeleton />
          </Grid>
          <Grid size={4}>
            <StatCardSkeleton />
          </Grid>
        </Grid>

        <Card>
          <CardContent>
            <Box sx={{ height: 400, p: 6 }}>
              <Stack spacing={3} direction="row" justifyContent="space-between">
                <Skeleton variant="rounded" width={72} height={320} sx={{translate: '0 20px'}} />
                <Skeleton variant="rounded" width={72} height={280} sx={{translate: '0 60px'}} />
                <Skeleton variant="rounded" width={72} height={320} sx={{translate: '0 20px'}} />
                <Skeleton variant="rounded" width={72} height={280} sx={{translate: '0 60px'}} />
                <Skeleton variant="rounded" width={72} height={320} sx={{translate: '0 20px'}} />
                <Skeleton variant="rounded" width={72} height={280} sx={{translate: '0 60px'}} />
                <Skeleton variant="rounded" width={72} height={320} sx={{translate: '0 20px'}} />
                <Skeleton variant="rounded" width={72} height={280} sx={{translate: '0 60px'}} />
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
