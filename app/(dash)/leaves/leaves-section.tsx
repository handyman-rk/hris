"use client";

import { useSuspenseQuery } from "@apollo/client";
import { GET_EMPLOYEES_ON_LEAVE } from "@/lib/graphql/queries";
import { Box, Typography, Button } from "@mui/material";
import { LeavesTable, LeavesTableSkeleton } from "./leaves-table";
import { Query } from "@/lib/graphql/types";
import { exportToCSV } from "@/lib/utils/export-csv";
import { format } from "date-fns";
import { ErrorState } from "@/components/error-state";

export function LeavesSection() {
  const { error, data } = useSuspenseQuery<Query>(GET_EMPLOYEES_ON_LEAVE);

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

    exportToCSV(csvData, "all_employees_on_leave.csv");
  };

  return (
    <Box component="section">
      <Box
        sx={{ mb: 3, display: "flex", justifyContent: "space-between", gap: 2 }}
      >
        <Typography variant="h1">Employees on Leave</Typography>
        <Button
          variant="contained"
          onClick={handleExportCSV}
          disabled={!!error}
        >
          Export (CSV)
        </Button>
      </Box>

      {error && <ErrorState title="Unable to load employees on leave" />}
      {!error && <LeavesTable data={data?.employeesOnLeave} />}
    </Box>
  );
}

export function LeavesSectionSkeleton() {
  return (
    <Box component="section">
      <Box
        sx={{ mb: 3, display: "flex", justifyContent: "space-between", gap: 2 }}
      >
        <Typography variant="h1">Employees on Leave</Typography>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>Department</Typography>
            <Button variant="contained" disabled>
              Export (CSV)
            </Button>
          </Box>
        </Box>
      </Box>
      <LeavesTableSkeleton />
    </Box>
  );
}
