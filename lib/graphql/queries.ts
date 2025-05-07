import { gql } from "@apollo/client"

export const GET_EMPLOYEES_ON_LEAVE = gql`
  query GetEmployeesOnLeave($limit: Int) {
    employeesOnLeave(limit: $limit) {
      id
      name
      department
      position
      avatar
      leaveType
      startDate
      endDate
    }
  }
`

export const GET_BIRTHDAYS_THIS_WEEK = gql`
  query GetBirthdaysThisWeek($limit: Int) {
    birthdaysThisWeek(limit: $limit) {
      id
      name
      department
      position
      email
      avatar
      dateOfBirth
    }
  }
`

export const GET_TEAM_OVERVIEW = gql`
  query GetTeamOverview {
    teamOverview {
      totalEmployees
      activeEmployees
      employeesOnLeave
      departmentBreakdown {
        department
        count
      }
    }
  }
`

