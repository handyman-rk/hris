import { generatedData } from "./fake-data";
import { isWithinInterval } from "date-fns";

// Resolvers for GraphQL queries and mutations
export const resolvers = {
  Query: {
    // Get all employees on leave today
    employeesOnLeave: () => {
      const today = new Date();

      // Get employees who are on leave
      const employeesOnLeave = generatedData.leaveData
        .filter((leave) => {
          const startDate = new Date(leave.startDate);
          const endDate = new Date(leave.endDate);
          return isWithinInterval(today, { start: startDate, end: endDate });
        })
        .map((leave) => {
          const employee = generatedData.employees.find(
            (emp) => emp.id === leave.employeeId
          );
          if (!employee) return null;

          return {
            ...employee,
            leaveType: leave.leaveType,
            startDate: leave.startDate,
            endDate: leave.endDate,
          };
        })
        .filter(Boolean);

      return employeesOnLeave;
    },

    // Get employees with birthdays this week
    birthdaysThisWeek: () => {
      return generatedData.birthdaysThisWeek;
    },

    // Get team overview statistics
    teamOverview: () => {
      return generatedData.teamOverview;
    },

    // Get a single employee by ID
    employee: (_, { id }) => {
      return generatedData.employees.find((emp) => emp.id === id);
    },

    // Get all employees, optionally filtered
    employees: (_, { department, status, search, offset = 0, limit = 50 }) => {
      let filteredEmployees = [...generatedData.employees];

      if (department) {
        filteredEmployees = filteredEmployees.filter(
          (emp) => emp.department === department
        );
      }

      if (status) {
        filteredEmployees = filteredEmployees.filter(
          (emp) => emp.status === status
        );
      }

      if (search) {
        const searchLower = search.toLowerCase();
        filteredEmployees = filteredEmployees.filter(
          (emp) =>
            emp.name.toLowerCase().includes(searchLower) ||
            emp.email.toLowerCase().includes(searchLower) ||
            emp.department.toLowerCase().includes(searchLower) ||
            emp.position.toLowerCase().includes(searchLower)
        );
      }

      // Apply pagination
      return filteredEmployees.slice(offset, offset + limit);
    },

    // Get employee count with filters
    employeeCount: (_, { department, status, search }) => {
      let filteredEmployees = [...generatedData.employees];

      if (department) {
        filteredEmployees = filteredEmployees.filter(
          (emp) => emp.department === department
        );
      }

      if (status) {
        filteredEmployees = filteredEmployees.filter(
          (emp) => emp.status === status
        );
      }

      if (search) {
        const searchLower = search.toLowerCase();
        filteredEmployees = filteredEmployees.filter(
          (emp) =>
            emp.name.toLowerCase().includes(searchLower) ||
            emp.email.toLowerCase().includes(searchLower) ||
            emp.department.toLowerCase().includes(searchLower) ||
            emp.position.toLowerCase().includes(searchLower)
        );
      }

      return filteredEmployees.length;
    },

    // Get leaves with optional filters
    leaves: (_, { status, upcoming }) => {
      let leaves = [...generatedData.allLeaves];

      if (status) {
        leaves = leaves.filter((leave) => leave.status === status);
      }

      if (upcoming !== undefined) {
        const today = new Date();
        if (upcoming) {
          // Get future leaves
          leaves = leaves.filter((leave) => new Date(leave.startDate) > today);
        } else {
          // Get current or past leaves
          leaves = leaves.filter((leave) => new Date(leave.startDate) <= today);
        }
      }

      return leaves;
    },

    // Get leaves for a specific employee
    leavesByEmployee: (_, { employeeId }) => {
      return generatedData.allLeaves.filter(
        (leave) => leave.employeeId === employeeId
      );
    },

    // Get attendance for a specific date
    attendance: (_, { date }) => {
      if (!date) {
        date = new Date().toISOString().split("T")[0];
      }

      return generatedData.attendanceData.filter((record) =>
        record.date.startsWith(date)
      );
    },

    // Get attendance for a specific employee
    attendanceByEmployee: (_, { employeeId, startDate, endDate }) => {
      let records = generatedData.attendanceData.filter(
        (record) => record.employeeId === employeeId
      );

      if (startDate) {
        records = records.filter((record) => record.date >= startDate);
      }

      if (endDate) {
        records = records.filter((record) => record.date <= endDate);
      }

      return records;
    },

    // Get attendance summary for a date range
    attendanceSummary: (_, { startDate, endDate }) => {
      const summary = [];

      // Default to current month if no dates provided
      if (!startDate) {
        const today = new Date();
        startDate = new Date(
          today.getFullYear(),
          today.getMonth(),
          1
        ).toISOString();
      }

      if (!endDate) {
        const today = new Date();
        endDate = today.toISOString();
      }

      // Group attendance by date
      const attendanceByDate = {};

      generatedData.attendanceData.forEach((record) => {
        const date = record.date.split("T")[0];

        if (date >= startDate.split("T")[0] && date <= endDate.split("T")[0]) {
          if (!attendanceByDate[date]) {
            attendanceByDate[date] = {
              present: 0,
              absent: 0,
              onLeave: 0,
              date,
            };
          }

          if (record.status === "Present") {
            attendanceByDate[date].present++;
          } else if (record.status === "Absent") {
            attendanceByDate[date].absent++;
          }
        }
      });

      // Add leave data
      generatedData.leaveData.forEach((leave) => {
        const startDate = new Date(leave.startDate);
        const endDate = new Date(leave.endDate);

        // For each day of leave
        for (
          let day = new Date(startDate);
          day <= endDate;
          day.setDate(day.getDate() + 1)
        ) {
          const dateStr = day.toISOString().split("T")[0];

          if (attendanceByDate[dateStr]) {
            attendanceByDate[dateStr].onLeave++;
          }
        }
      });

      // Convert to array
      return Object.values(attendanceByDate);
    },

    // Get announcements
    announcements: (_, { limit }) => {
      if (limit) {
        return generatedData.announcements.slice(0, limit);
      }
      return generatedData.announcements;
    },

    // Get events
    events: (_, { upcoming, limit }) => {
      let events = [...generatedData.events];

      if (upcoming !== undefined) {
        const today = new Date();
        if (upcoming) {
          events = events.filter((event) => new Date(event.startDate) >= today);
        } else {
          events = events.filter((event) => new Date(event.endDate) < today);
        }
      }

      if (limit) {
        events = events.slice(0, limit);
      }

      return events;
    },

    // Get all departments
    departments: () => {
      return [...new Set(generatedData.employees.map((emp) => emp.department))];
    },

    // Get positions for a department
    positions: (_, { department }) => {
      let positions = generatedData.employees.map((emp) => emp.position);

      if (department) {
        positions = generatedData.employees
          .filter((emp) => emp.department === department)
          .map((emp) => emp.position);
      }

      return [...new Set(positions)];
    },
  },

  // Resolve nested types
  Leave: {
    employee: (leave) => {
      return generatedData.employees.find((emp) => emp.id === leave.employeeId);
    },
  },

  Attendance: {
    employee: (attendance) => {
      return generatedData.employees.find(
        (emp) => emp.id === attendance.employeeId
      );
    },
  },
};
