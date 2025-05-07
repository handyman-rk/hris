"use client";

import { useSuspenseQuery } from "@apollo/client";
import { GET_BIRTHDAYS_THIS_WEEK } from "@/lib/graphql/queries";
import { Box, Button, Typography } from "@mui/material";
import { BirthdaysTable } from "./birthdays-table";
import { Query } from "@/lib/graphql/types";
import { exportToCSV } from "@/lib/utils/export-csv";
import { format } from "date-fns";

export function BirthdaysSection() {
  const { error, data } = useSuspenseQuery<Query>(GET_BIRTHDAYS_THIS_WEEK  );

  const handleExportCSV = () => {
    if (!data?.birthdaysThisWeek) return;

    const csvData = {
      headers: ['Employee Name', 'Department', 'Position', 'Date of Birth'],
      rows: data.birthdaysThisWeek.map(employee => [
        employee.name,
        employee.department,
        employee.position || '',
        format(employee.dateOfBirth, 'yyyy-MM-dd')
      ])
    };

    exportToCSV(csvData, 'birthdays_this_week.csv');
  };

  return (
    <Box component="section">
      <Box sx={{mb: 3, display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h1">Birthdays this week</Typography>
        <Button variant="contained" onClick={handleExportCSV}>Export (CSV)</Button>
      </Box>

      <BirthdaysTable data={data?.birthdaysThisWeek} />
    </Box>
  );
}
