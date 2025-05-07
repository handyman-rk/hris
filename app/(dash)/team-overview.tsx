"use client";

import {
  Box,
  Card,
  CardContent,
  Grid,
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

function StatCard({
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
        <Box display="flex" alignItems="center" mb={2}>
          <Box color={color} mr={1}>
            {icon}
          </Box>
          <Typography variant="h6" component="div" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h3" component="div" color={color}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

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
              icon={<GroupOutlined fontSize="large" />}
              color="#1976d2"
            />
          </Grid>
          <Grid size={4}>
            <StatCard
              title="Active Employees"
              value={teamOverview.activeEmployees}
              icon={<PersonOutlined fontSize="large" />}
              color="#2e7d32"
            />
          </Grid>
          <Grid size={4}>
            <StatCard
              title="Employees on Leave"
              value={teamOverview.employeesOnLeave}
              icon={<GolfCourseOutlined fontSize="large" />}
              color="#ed6c02"
            />
          </Grid>
        </Grid>

        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Department Breakdown
            </Typography>
            <Box sx={{ width: "100%", height: 400 }}>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
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
                    color: "#1976d2",
                  },
                ]}
                height={350}
              />
            </Box>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
