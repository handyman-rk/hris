import { gql } from "@apollo/client"

export const GET_DASHBOARD_DATA = gql`
  query GetDashboardData {
    employeesOnLeave {
      id
      name
      department
      position
      avatar
      leaveType
      startDate
      endDate
    }
    birthdaysThisWeek {
      id
      name
      department
      position
      avatar
      dateOfBirth
    }
    teamOverview {
      totalEmployees
      activeEmployees
      employeesOnLeave
      departmentBreakdown {
        department
        count
      }
    }
    announcements(limit: 3) {
      id
      title
      type
      date
      important
    }
    events(upcoming: true, limit: 3) {
      id
      title
      type
      startDate
      endDate
      location
    }
  }
`

export const GET_EMPLOYEES_ON_LEAVE = gql`
  query GetEmployeesOnLeave {
    employeesOnLeave {
      id
      name
      department
      position
      email
      phone
      avatar
      leaveType
      startDate
      endDate
    }
  }
`

export const GET_BIRTHDAYS_THIS_WEEK = gql`
  query GetBirthdaysThisWeek {
    birthdaysThisWeek {
      id
      name
      department
      position
      email
      phone
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
      genderDiversity {
        gender
        count
      }
      tenureData {
        range
        count
      }
      salaryData {
        range
        count
      }
    }
  }
`

export const GET_ANNOUNCEMENTS = gql`
  query GetAnnouncements($limit: Int) {
    announcements(limit: $limit) {
      id
      title
      type
      content
      date
      author
      department
      important
    }
  }
`

export const GET_EVENTS = gql`
  query GetEvents($upcoming: Boolean, $limit: Int) {
    events(upcoming: $upcoming, limit: $limit) {
      id
      title
      type
      description
      startDate
      endDate
      location
      organizer
      department
    }
  }
`

export const GET_ATTENDANCE_SUMMARY = gql`
  query GetAttendanceSummary($startDate: String, $endDate: String) {
    attendanceSummary(startDate: $startDate, endDate: $endDate) {
      present
      absent
      onLeave
      date
    }
  }
`
