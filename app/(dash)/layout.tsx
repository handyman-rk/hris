import { ApolloWrapper } from "../../lib/graphql/apollo-wrapper";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ApolloWrapper>{children}</ApolloWrapper>;
}
