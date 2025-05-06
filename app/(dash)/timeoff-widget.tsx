'use client';

import { useSuspenseQuery } from "@apollo/client";
import { GET_EMPLOYEES_ON_LEAVE } from "@/lib/graphql/queries";

export function TimeoffWidget() {
  const { error, data } = useSuspenseQuery(GET_EMPLOYEES_ON_LEAVE);
  console.log("Timeoff", data)
//   if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  return <p>Timeoff: {data.employeesOnLeave.length}</p>;
}
