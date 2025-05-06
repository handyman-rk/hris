import { Suspense } from "react";

import { TimeoffWidget } from "@/app/(dash)/timeoff-widget";
import { GET_EMPLOYEES_ON_LEAVE } from "@/lib/graphql/queries";
import { PreloadQuery } from "../../lib/graphql/apollo-client";

export default async function Dashboard() {
  return (
    <div>
      <h1>Dashboard</h1>
      <PreloadQuery query={GET_EMPLOYEES_ON_LEAVE} >
      {/* <Suspense fallback={<p>Loading...</p>}> */}
        <TimeoffWidget />
      {/* </Suspense> */}
      </PreloadQuery>
    </div>
  );
}
