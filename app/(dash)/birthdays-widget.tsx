"use client";

import Link from "next/link";
import { useSuspenseQuery } from "@apollo/client";
import { GET_BIRTHDAYS_THIS_WEEK } from "@/lib/graphql/queries";
import { Typography, Box, Stack, Link as MUILink, Button } from "@mui/material";
import {
  BirthdaysTable,
  BirthdaysTableSkeleton,
} from "./birthdays/birthdays-table";
import { Query } from "@/lib/graphql/types";
import { exportToCSV } from "@/lib/utils/export-csv";
import { format } from "date-fns";
import { ErrorState } from "@/components/error-state";

export function BirthdaysWidget() {
  const { error, data } = useSuspenseQuery<Query>(GET_BIRTHDAYS_THIS_WEEK, {
    variables: { limit: 6 },
  });

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
            <Typography variant="h2">Birthdays this week</Typography>

            <MUILink href="/birthdays" component={Link}>
              <Typography variant="body2">View all</Typography>
            </MUILink>
          </Box>
          <Button
            variant="contained"
            onClick={handleExportCSV}
            disabled={!!error}
          >
            Export (CSV)
          </Button>
        </Box>

        {error && <ErrorState title="Unable to load birthdays" />}
        {!error && <BirthdaysTable data={data?.birthdaysThisWeek} />}
      </Stack>
    </Box>
  );
}

export function BirthdaysWidgetSkeleton() {
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
          <Typography variant="h2">Birthdays this week</Typography>
          <Button variant="contained" size="small" disabled>
            Export (CSV)
          </Button>
        </Box>
        <BirthdaysTableSkeleton />
      </Stack>
    </Box>
  );
}
