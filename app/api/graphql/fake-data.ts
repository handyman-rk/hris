import { faker } from "@faker-js/faker";
import { addDays, addYears } from "date-fns";

// Set seed for consistent data generation
faker.seed(123);

const departments = {
  Engineering: [
    "Software Engineer",
    "Senior Software Engineer",
    "Lead Developer",
    "DevOps Engineer",
    "QA Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Engineering Manager",
    "CTO",
  ],
  Marketing: [
    "Marketing Specialist",
    "Digital Marketing Manager",
    "Content Strategist",
    "SEO Specialist",
    "Social Media Manager",
    "Brand Manager",
    "Marketing Director",
    "Growth Hacker",
    "Marketing Analyst",
    "CMO",
  ],
  Finance: [
    "Financial Analyst",
    "Accountant",
    "Senior Accountant",
    "Financial Controller",
    "Finance Manager",
    "Payroll Specialist",
    "Tax Specialist",
    "Finance Director",
    "CFO",
  ],
  "Human Resources": [
    "HR Specialist",
    "HR Manager",
    "Recruitment Specialist",
    "Talent Acquisition Manager",
    "HR Business Partner",
    "Training Coordinator",
    "Compensation Analyst",
    "HR Director",
    "CHRO",
  ],
  Sales: [
    "Sales Representative",
    "Account Executive",
    "Sales Manager",
    "Business Development Representative",
    "Sales Director",
    "Account Manager",
    "Sales Operations Analyst",
    "CRO",
  ],
  Operations: [
    "Operations Coordinator",
    "Operations Manager",
    "Project Manager",
    "Business Analyst",
    "Operations Director",
    "Process Improvement Specialist",
    "COO",
  ],
  "Customer Support": [
    "Customer Support Representative",
    "Customer Success Manager",
    "Support Team Lead",
    "Technical Support Specialist",
    "Customer Experience Manager",
  ],
  Legal: [
    "Legal Counsel",
    "Compliance Officer",
    "Legal Assistant",
    "Contract Specialist",
    "General Counsel",
  ],
  Product: [
    "Product Manager",
    "Product Owner",
    "UX Designer",
    "UI Designer",
    "Product Analyst",
    "Product Director",
    "CPO",
  ],
};

const leaveTypes = [
  "Annual Leave",
  "Sick Leave",
  "Personal Leave",
  "Maternity/Paternity Leave",
  "Bereavement Leave",
  "Unpaid Leave",
];

// Generate a realistic employee
function generateEmployee(id: number) {
  const name = faker.person.fullName();
  const gender = faker.person.sex();
  const department = faker.helpers.objectKey(departments);
  const position = faker.helpers.arrayElement(departments[department]);

  // Generate a realistic date of birth (25-65 years old)
  const dateOfBirth = faker.date.birthdate({
    min: 25,
    max: 65,
    mode: "age",
    refDate: new Date(),
  });

  // Generate a realistic date of joining (25-60 years after birth)
  const dateJoined = faker.date.between({
    from: addYears(dateOfBirth, 25),
    to: addYears(dateOfBirth, 60),
  });

  return {
    id: id.toString(),
    name,
    gender,
    department,
    position,
    email: faker.internet.email().toLowerCase(),
    dateOfBirth: dateOfBirth.toISOString(),
    dateJoined: dateJoined.toISOString(),
    status: Math.random() > 0.05 ? "Active" : "On Notice", // 5% of employees on notice
    avatar: faker.image.avatar(),
  };
}

// Generate employees with birthdays this week
function generateBirthdaysThisWeek(count: number, existingEmployees: any[]) {
  const today = new Date();
  const employees = faker.helpers.arrayElements(existingEmployees, count);

  employees.map((employee) =>  {
    const daysAhead = faker.helpers.rangeToNumber({min: 0, max: 6}); // 0-6 days ahead

    // Set birthday to be within the next week, but keep the year the same
    const birthDate = new Date(employee.dateOfBirth);
    const newBirthDate = new Date(
      birthDate.getFullYear(),
      today.getMonth(),
      today.getDate() + daysAhead,
      0,
      0,
      0
    );

    employee.dateOfBirth = newBirthDate.toISOString();

    return employee;
  })

  return employees;
}

// Generate leave data
function generateLeaveData(count: number, existingEmployees: any[]) {
  const today = new Date();
  const employees = faker.helpers.arrayElements(existingEmployees, count);
  
  const leaves = [];

  for (let i = 0; i < count; i++) {
    const employee = employees[i];
    const leaveType = faker.helpers.arrayElement(leaveTypes);

    // Generate random leave duration (1-14 days)
    const leaveDuration = faker.helpers.rangeToNumber({ min: 1, max: 14 });

    // Some leaves start in the past, some today
    const startOffset = faker.helpers.rangeToNumber({min: -4, max: 0}); // -4 to 0 days
    const startDate = addDays(today, startOffset);
    const endDate = addDays(startDate, leaveDuration);

    leaves.push({
      id: i.toString(),
      employeeId: employee.id,
      leaveType,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: "Approved",
      reason: faker.lorem.sentence(),
      approvedBy: faker.person.fullName(),
      approvedOn: startDate.toISOString(),
    });
  }

  return leaves;
}

// Generate all data
export function generateData(employeeCount = 150) {
  // Generate base employees
  const employees = Array(employeeCount)
    .fill(null)
    .map((_, i) => generateEmployee(i + 1));

  const birthdaysThisWeek = generateBirthdaysThisWeek(8, employees);

  // Update the original employees with the birthday data
  for (const employee of birthdaysThisWeek) {
    const index = employees.findIndex((e) => e.id === employee.id);
    if (index !== -1) {
      employees[index].dateOfBirth = employee.dateOfBirth;
    }
  }

  const leaveData = generateLeaveData(12, employees);
  const employeesOnLeave = leaveData.map((leave) => {
    const employee = employees.find((e) => e.id === leave.employeeId);
    if (!employee) {
      throw new Error(`Employee with ID ${leave.employeeId} not found`);
    }

    return ({
        id: leave.id,
    name: employee.name,
    department: employee.department,
    position: employee.position,
    avatar: employee.avatar,
    leaveType: leave.leaveType,
    startDate: leave.startDate,
    endDate: leave.endDate,
    })
  })

  // Calculate department breakdown
  const departmentCounts = employees.reduce((acc, employee) => {
    const { department } = employee;
    if (!acc[department]) {
      acc[department] = 0;
    }
    acc[department] = acc[department] + 1;

    return acc;
  }, {} as Record<string, number>);

  // Format department breakdown
  const departmentBreakdown = Object.entries(departmentCounts).map(
    ([department, count]) => ({
      department,
      count,
    })
  );

  return {
    employees,
    employeesOnLeave,
    birthdaysThisWeek,

    teamOverview: {
      totalEmployees: employees.length,
      activeEmployees: employees.length - leaveData.length,
      employeesOnLeave: leaveData.length,
      departmentBreakdown,
    },
  };
}

// Export the generated data
export const generatedData = generateData();
