"use client";

import { useSuspenseQuery } from "@apollo/client";
import { GET_EMPLOYEES_ON_LEAVE } from "@/lib/graphql/queries";
import { Box, Typography, Button } from "@mui/material";
import { LeavesTable } from "./leaves-table";
import { Query } from "@/lib/graphql/types";

export function LeavesSection() {
  const { error, data } = useSuspenseQuery<Query>(GET_EMPLOYEES_ON_LEAVE);
  return (
    <Box component="section">
      <Box sx={{mb: 3, display: 'flex', justifyContent: 'space-between', gap: 2}}>
        <Typography variant="h1">Employees on Leave</Typography>
        <Box>
          
          <Box sx={{display: 'flex', alignItems: 'center', gap: 2}}>
          <Typography>Department</Typography>
          <Button variant="contained">Export (CSV)</Button>
          </Box>
        </Box>
      </Box>

      <LeavesTable data={data?.employeesOnLeave} />
    </Box>
  );
}
