"use client";

import Link from "next/link";
import { useSuspenseQuery } from "@apollo/client";
import { GET_EMPLOYEES_ON_LEAVE } from "@/lib/graphql/queries";
import { Typography, Box, Stack, Link as MUILink, Button } from "@mui/material";
import { LeavesTable, LeavesTableSkeleton } from "./leaves/leaves-table";
import { Query } from "@/lib/graphql/types";
import { exportToCSV } from "@/lib/utils/export-csv";
import { format } from "date-fns";
import { ErrorState } from "@/components/error-state";

export function LeavesWidget() {
  const { error, data } = useSuspenseQuery<Query>(GET_EMPLOYEES_ON_LEAVE, {
    variables: { limit: 6 },
  });

  const handleExportCSV = () => {
    if (!data?.employeesOnLeave) return;

    const csvData = {
      headers: [
        "Employee Name",
        "Department",
        "Position",
        "Leave Type",
        "Start Date",
        "End Date",
      ],
      rows: data.employeesOnLeave.map((leave) => [
        leave.name,
        leave.department,
        leave.position || "",
        leave.leaveType,
        format(leave.startDate, "yyyy-MM-dd"),
        format(leave.endDate, "yyyy-MM-dd"),
      ]),
    };

    exportToCSV(csvData, "employees_on_leave.csv");
  };

  if (error) return <p>Error :(</p>;
  return (
    <Box>
      <Stack gap={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "baseline", gap: 2 }}>
            <Typography variant="h2">Employees on Leave</Typography>
            <MUILink href="/leaves" component={Link}>
              <Typography variant="body2">View all</Typography>
            </MUILink>
          </Box>

          <Button
            variant="contained"
            size="small"
            onClick={handleExportCSV}
            disabled={!!error}
          >
            Export (CSV)
          </Button>
        </Box>
        {!!error && <ErrorState title="Unable to load employees on leave" />}
        {!error && <LeavesTable data={data?.employeesOnLeave} />}
      </Stack>
    </Box>
  );
}

export function LeavesWidgetSkeleton() {
  return (
    <Box>
      <Stack gap={3}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h2">Employees on Leave</Typography>

          <Button variant="contained" size="small" disabled>
            Export (CSV)
          </Button>
        </Box>
        <LeavesTableSkeleton />
      </Stack>
    </Box>
  );
}
