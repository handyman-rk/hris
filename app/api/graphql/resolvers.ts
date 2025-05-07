import { generatedData } from "./fake-data";
import { faker } from "@faker-js/faker";

// Resolvers for GraphQL queries and mutations
export const resolvers = {
  Query: {
    // Get all employees
    employees: () => generatedData.employees,

    // Get all employees on leave today
    employeesOnLeave: (_:unknown, args: { limit: number }) =>
      faker.helpers.arrayElements(generatedData.employeesOnLeave, args.limit),

    // Get employees with birthdays this week
    birthdaysThisWeek: (_:unknown, args: { limit: number }) =>
      faker.helpers.arrayElements(generatedData.birthdaysThisWeek, args.limit),

    // Get team overview statistics
    teamOverview: () => generatedData.teamOverview,
  },
};
