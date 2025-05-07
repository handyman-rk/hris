
import { GET_EMPLOYEES_ON_LEAVE } from "@/lib/graphql/queries";
import { Box } from "@mui/material";

import { LeavesSection } from "./leaves-section";
import { PreloadQuery } from "@/lib/graphql/apollo-client";

export default async function LeavesPage() {
  return (
    <Box>
      <PreloadQuery query={GET_EMPLOYEES_ON_LEAVE}>
        <LeavesSection />
      </PreloadQuery>
    </Box>
  );
}
