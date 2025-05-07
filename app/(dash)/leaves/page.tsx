
import { GET_EMPLOYEES_ON_LEAVE } from "@/lib/graphql/queries";
import { Box } from "@mui/material";

import { LeavesSection, LeavesSectionSkeleton } from "./leaves-section";
import { PreloadQuery } from "@/lib/graphql/apollo-client";
import { Suspense } from "react";

export default async function LeavesPage() {
  return (
    <Box>
      <PreloadQuery query={GET_EMPLOYEES_ON_LEAVE}>
        <Suspense fallback={<LeavesSectionSkeleton />}>
          <LeavesSection />
        </Suspense>
      </PreloadQuery>
    </Box>
  );
}
