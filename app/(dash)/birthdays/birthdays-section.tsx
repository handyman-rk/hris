"use client";

import { useSuspenseQuery } from "@apollo/client";
import { GET_BIRTHDAYS_THIS_WEEK } from "@/lib/graphql/queries";
import { Box, Button, Typography } from "@mui/material";
import { BirthdaysTable, BirthdaysTableSkeleton } from "./birthdays-table";
import { Query } from "@/lib/graphql/types";
import { exportToCSV } from "@/lib/utils/export-csv";
import { format } from "date-fns";
import { ErrorState } from "@/components/error-state";

export function BirthdaysSection() {
  const { error, data } = useSuspenseQuery<Query>(GET_BIRTHDAYS_THIS_WEEK);

  const handleExportCSV = () => {
    if (!data?.birthdaysThisWeek) return;

    const csvData = {
      headers: ["Employee Name", "Department", "Position", "Date of Birth"],
      rows: data.birthdaysThisWeek.map((employee) => [
        employee.name,
        employee.department,
        employee.position || "",
        format(employee.dateOfBirth, "yyyy-MM-dd"),
      ]),
    };

    exportToCSV(csvData, "birthdays_this_week.csv");
  };

  return (
    <Box component="section">
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h1">Birthdays this week</Typography>
        <Button variant="contained" onClick={handleExportCSV} disabled={!!error}>
          Export (CSV)
        </Button>
      </Box>
      {error && <ErrorState title="Unable to load birthdays" description="Please try again later. If the issue persists, reach out to helpdesk." />}
      {!error && <BirthdaysTable data={data?.birthdaysThisWeek} />}
    </Box>
  );
}

export function BirthdaysSectionSkeleton() {
  return (
    <Box component="section">
      <Box sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h1">Birthdays this week</Typography>
        <Button variant="contained" disabled>
          Export (CSV)
        </Button>
      </Box>
      <BirthdaysTableSkeleton />
    </Box>
  );
}
