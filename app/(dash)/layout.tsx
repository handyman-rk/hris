import { ApolloWrapper } from "../../lib/graphql/apollo-wrapper";
import { Box } from "@mui/material";
import { AppSidebar, SIDEBAR_WIDTH } from "@/components/app-sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Box sx={{ minHeight: "100vh", position: "relative" }}>
      <AppSidebar />
      <Box sx={{ paddingLeft: SIDEBAR_WIDTH }}>
        <Box sx={{px: 5, pb: 4, pt: 8}}>
        <ApolloWrapper>{children}</ApolloWrapper>
        </Box>
      </Box>
    </Box>
  );
}
