"use client";

import Link from "next/link";
import { useSuspenseQuery } from "@apollo/client";
import { GET_EMPLOYEES_ON_LEAVE } from "@/lib/graphql/queries";
import { Typography, Box, Stack, Link as MUILink, Button, Autocomplete, TextField } from "@mui/material";
import { LeavesTable, LeavesTableSkeleton } from "./leaves/leaves-table";
import { Query } from "@/lib/graphql/types";
import { exportToCSV } from "@/lib/utils/export-csv";
import { format } from "date-fns";
import { ErrorState } from "@/components/error-state";
import { useState, useMemo } from "react";

export function LeavesWidget() {
  const [selectedDepartments, setSelectedDepartments] = useState<Set<string>>(new Set());
  const { error, data } = useSuspenseQuery<Query>(GET_EMPLOYEES_ON_LEAVE, {
    variables: { limit: 6 },
  });

  // Extract unique departments from the data
  const departments = useMemo(() => {
    if (!data?.employeesOnLeave) return [];
    return data.employeesOnLeave.reduce((acc, leave) => {
      if (!acc.includes(leave.department)) {
        acc.push(leave.department);
      }
      return acc;
    }, [] as string[]);
  }, [data?.employeesOnLeave]);

  // Filter employees based on selected departments
  const filteredEmployees = useMemo(() => {
    if (!data?.employeesOnLeave) return [];
    if (selectedDepartments.size === 0) return data.employeesOnLeave;
    return data.employeesOnLeave.filter(leave => 
      selectedDepartments.has(leave.department)
    );
  }, [data?.employeesOnLeave, selectedDepartments]);

  const handleExportCSV = () => {
    if (!filteredEmployees?.length) return;

    const csvData = {
      headers: [
        "Employee Name",
        "Department",
        "Position",
        "Leave Type",
        "Start Date",
        "End Date",
      ],
      rows: filteredEmployees.map((leave) => [
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

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Autocomplete
              multiple
              size="small"
              limitTags={1}
              options={departments}
              value={Array.from(selectedDepartments)}
              onChange={(_, newValue) => setSelectedDepartments(new Set(newValue))}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField {...params} label="Filter by Departments" />
              )}
            />
            <Button
              variant="contained"
              onClick={handleExportCSV}
              disabled={!!error}
            >
              Export (CSV)
            </Button>
          </Box>
        </Box>
        {!!error && <ErrorState title="Unable to load employees on leave" />}
        {!error && <LeavesTable data={filteredEmployees} />}
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
