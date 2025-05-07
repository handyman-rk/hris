"use client";

import { useSuspenseQuery } from "@apollo/client";
import { GET_BIRTHDAYS_THIS_WEEK } from "@/lib/graphql/queries";
import { Box, Button, Typography } from "@mui/material";
import { BirthdaysTable } from "./birthdays-table";
import { Query } from "@/lib/graphql/types";

export function BirthdaysSection() {
  const { error, data } = useSuspenseQuery<Query>(GET_BIRTHDAYS_THIS_WEEK  );
  return (
    <Box component="section">
      <Box sx={{mb: 3, display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h1">Birthdays this week</Typography>
        <Button variant="contained">Export (CSV)</Button>
      </Box>

      <BirthdaysTable data={data?.birthdaysThisWeek} />
    </Box>
  );
}
