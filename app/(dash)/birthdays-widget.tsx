"use client";

import Link from "next/link";
import { useSuspenseQuery } from "@apollo/client";
import { GET_BIRTHDAYS_THIS_WEEK } from "@/lib/graphql/queries";
import { Typography, Box, Stack, Link as MUILink, Button } from "@mui/material";
import { BirthdaysTable } from "./birthdays/birthdays-table";
import { Query } from "@/lib/graphql/types";

export function BirthdaysWidget() {
  const { error, data } = useSuspenseQuery<Query>(GET_BIRTHDAYS_THIS_WEEK, {
    variables: { limit: 6 },
  });
  //   if (loading) return <p>Loading...</p>;
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
          <Typography variant="h2">Birthdays this week</Typography>

          <MUILink href="/birthdays" component={Link}>
            <Typography>View all</Typography>
          </MUILink>
          <Button variant="contained" size="small">Export (CSV)</Button>
        </Box>

        <BirthdaysTable data={data?.birthdaysThisWeek} />
      </Stack>
    </Box>
  );
}
