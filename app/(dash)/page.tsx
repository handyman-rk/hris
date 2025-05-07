import { Suspense } from "react";

import { LeavesWidget, LeavesWidgetSkeleton } from "@/app/(dash)/leaves-widget";
import {
  GET_BIRTHDAYS_THIS_WEEK,
  GET_TEAM_OVERVIEW,
  GET_EMPLOYEES_ON_LEAVE,
} from "@/lib/graphql/queries";
import { PreloadQuery } from "@/lib/graphql/apollo-client";
import { Stack } from "@mui/material";
import { BirthdaysWidget, BirthdaysWidgetSkeleton } from "./birthdays-widget";
import { TeamOverview, TeamOverviewSkeleton } from "./team-overview";

export default async function Dashboard() {
  return (
    <div>
      <Stack spacing={6}>
        <PreloadQuery query={GET_TEAM_OVERVIEW} >
          <Suspense fallback={<TeamOverviewSkeleton />}>
            <TeamOverview />
          </Suspense>
        </PreloadQuery>
        <PreloadQuery query={GET_EMPLOYEES_ON_LEAVE} variables={{ limit: 6 }}>
          <Suspense fallback={<LeavesWidgetSkeleton />}>
            <LeavesWidget />
          </Suspense>
        </PreloadQuery>
        <PreloadQuery query={GET_BIRTHDAYS_THIS_WEEK} variables={{ limit: 6 }}>
          <Suspense fallback={<BirthdaysWidgetSkeleton />}>
            <BirthdaysWidget />
          </Suspense>
        </PreloadQuery>
      </Stack>
    </div>
  );
}
