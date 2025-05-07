"use client";

import Link from "next/link";
import { useSuspenseQuery } from "@apollo/client";
import { GET_EMPLOYEES_ON_LEAVE } from "@/lib/graphql/queries";
import { Typography, Box, Stack, Link as MUILink, Button } from "@mui/material";
import { LeavesTable } from "./leaves/leaves-table";
import { Query } from "@/lib/graphql/types";

export function LeavesWidget() {
  const { error, data } = useSuspenseQuery<Query>(GET_EMPLOYEES_ON_LEAVE, {
    variables: { limit: 6 },
  });
  console.log("Timeoff", data);
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
          <Typography variant="h2">Employees on Leave</Typography>

          <MUILink href="/leaves" component={Link}>
            <Typography>View all</Typography>
          </MUILink>

          <Button variant="contained" size='small'>Export (CSV)</Button>
        </Box>
        <LeavesTable data={data?.employeesOnLeave} />
      </Stack>
    </Box>
  );
}
