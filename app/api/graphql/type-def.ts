import { gql } from "graphql-tag";

export const typeDefs = gql`
  type Employee {
    id: ID!
    name: String!
    gender: String
    department: String!
    position: String
    email: String
    dateOfBirth: String
    dateJoined: String
    status: String
    avatar: String
  }

  type Leave {
    id: ID!
    employeeId: ID!
    leaveType: String!
    startDate: String!
    endDate: String!
    status: String!
    reason: String
    approvedBy: String
    approvedOn: String
  }

  type EmployeeOnLeave {
    id: ID!
    name: String!
    department: String!
    position: String
    avatar: String
    leaveType: String!
    startDate: String!
    endDate: String!
  }

  type DepartmentBreakdown {
    department: String!
    count: Int!
  }

  type TeamOverview {
    totalEmployees: Int!
    activeEmployees: Int!
    employeesOnLeave: Int!
    departmentBreakdown: [DepartmentBreakdown!]!
  }

  type Query {
    employees: [Employee!]!
    employeesOnLeave(limit: Int = 100): [EmployeeOnLeave!]!
    birthdaysThisWeek(limit: Int = 100): [Employee!]!
    teamOverview: TeamOverview!
  }
`;
