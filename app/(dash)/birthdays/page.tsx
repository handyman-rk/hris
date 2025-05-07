import { GET_BIRTHDAYS_THIS_WEEK } from "@/lib/graphql/queries";
import { Box } from "@mui/material";

import {
  BirthdaysSection,
  BirthdaysSectionSkeleton,
} from "./birthdays-section";
import { PreloadQuery } from "@/lib/graphql/apollo-client";
import { Suspense } from "react";

export default async function LeavesPage() {
  return (
    <Box>
      <PreloadQuery query={GET_BIRTHDAYS_THIS_WEEK}>
        <Suspense fallback={<BirthdaysSectionSkeleton />}>
          <BirthdaysSection />
        </Suspense>
      </PreloadQuery>
    </Box>
  );
}
