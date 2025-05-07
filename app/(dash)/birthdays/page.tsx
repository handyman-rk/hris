
import { GET_BIRTHDAYS_THIS_WEEK } from "@/lib/graphql/queries";
import { Box } from "@mui/material";

import { BirthdaysSection } from "./birthdays-section";
import { PreloadQuery } from "@/lib/graphql/apollo-client";

export default async function LeavesPage() {
  return (
    <Box>
      <PreloadQuery query={GET_BIRTHDAYS_THIS_WEEK}>
        <BirthdaysSection />
      </PreloadQuery>
    </Box>
  );
}
