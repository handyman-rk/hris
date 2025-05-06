import { faker } from "@faker-js/faker"
import { addDays, subDays, subYears, subMonths, format } from "date-fns"

// Set seed for consistent data generation
faker.seed(123)

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
  Legal: ["Legal Counsel", "Compliance Officer", "Legal Assistant", "Contract Specialist", "General Counsel"],
  Product: [
    "Product Manager",
    "Product Owner",
    "UX Designer",
    "UI Designer",
    "Product Analyst",
    "Product Director",
    "CPO",
  ],
}

// Define leave types with realistic distribution
const leaveTypes = [
  { type: "Annual Leave", weight: 50 },
  { type: "Sick Leave", weight: 30 },
  { type: "Personal Leave", weight: 10 },
  { type: "Maternity/Paternity Leave", weight: 5 },
  { type: "Bereavement Leave", weight: 3 },
  { type: "Unpaid Leave", weight: 2 },
]

// Helper function to get weighted random leave type
function getRandomLeaveType() {
  const totalWeight = leaveTypes.reduce((sum, type) => sum + type.weight, 0)
  let random = Math.random() * totalWeight

  for (const leaveType of leaveTypes) {
    random -= leaveType.weight
    if (random <= 0) {
      return leaveType.type
    }
  }

  return leaveTypes[0].type
}

// Helper function to get random position based on department
function getRandomPosition(department: string) {
  const positions = departments[department] || departments.Operations
  return positions[Math.floor(Math.random() * positions.length)]
}

// Generate a realistic employee
function generateEmployee(id: number) {
  const firstName = faker.person.firstName()
  const lastName = faker.person.lastName()
  const gender = faker.person.sex()
  const departmentKeys = Object.keys(departments)
  const department = departmentKeys[Math.floor(Math.random() * departmentKeys.length)]
  const position = getRandomPosition(department)

  // Generate a realistic date of birth (25-65 years old)
  const age = Math.floor(Math.random() * 40) + 25
  const dateOfBirth = subYears(new Date(), age)

  // Generate a realistic join date (0-10 years ago)
  const yearsEmployed = Math.floor(Math.random() * 10)
  const monthsExtra = Math.floor(Math.random() * 12)
  const dateJoined = subMonths(subYears(new Date(), yearsEmployed), monthsExtra)

  // Generate salary based on position seniority
  let baseSalary = 50000
  if (position.includes("Senior") || position.includes("Lead")) baseSalary = 85000
  if (position.includes("Manager")) baseSalary = 110000
  if (position.includes("Director")) baseSalary = 150000
  if (position.includes("C")) baseSalary = 200000 // C-level

  // Add some randomness to salary
  const salary = Math.round(baseSalary + (Math.random() * 20000 - 10000))

  return {
    id: id.toString(),
    name: `${firstName} ${lastName}`,
    firstName,
    lastName,
    gender,
    department,
    position,
    email: faker.internet.email({ firstName, lastName, provider: "company.com" }).toLowerCase(),
    phone: faker.phone.number(),
    dateOfBirth: dateOfBirth.toISOString(),
    dateJoined: dateJoined.toISOString(),
    salary,
    status: Math.random() > 0.05 ? "Active" : "On Notice", // 5% of employees on notice
    avatar: faker.image.avatar(),
    address: {
      street: faker.location.streetAddress(),
      city: faker.location.city(),
      state: faker.location.state({ abbreviated: true }),
      zipCode: faker.location.zipCode(),
      country: "United States",
    },
    emergencyContact: {
      name: faker.person.fullName(),
      relationship: ["Spouse", "Parent", "Sibling", "Friend"][Math.floor(Math.random() * 4)],
      phone: faker.phone.number(),
    },
    bankDetails: {
      accountName: `${firstName} ${lastName}`,
      accountNumber: faker.finance.accountNumber(),
      routingNumber: faker.finance.routingNumber(),
    },
    documents: Array(Math.floor(Math.random() * 3) + 1)
      .fill(null)
      .map(() => ({
        id: faker.string.uuid(),
        name: ["Resume", "Contract", "ID", "Certifications", "Performance Review"][Math.floor(Math.random() * 5)],
        uploadDate: subMonths(new Date(), Math.floor(Math.random() * 12)).toISOString(),
        fileType: ["pdf", "docx", "jpg"][Math.floor(Math.random() * 3)],
      })),
    performanceReviews: Array(Math.floor(Math.random() * 3))
      .fill(null)
      .map((_, i) => ({
        id: faker.string.uuid(),
        date: subMonths(new Date(), (i + 1) * 6).toISOString(),
        rating: Math.floor(Math.random() * 5) + 1,
        reviewedBy: faker.person.fullName(),
        comments: faker.lorem.paragraph(),
      })),
  }
}

// Generate employees with birthdays this week
function generateBirthdaysThisWeek(count: number, existingEmployees: any[]) {
  const today = new Date()
  const employees = []

  for (let i = 0; i < count; i++) {
    const daysAhead = Math.floor(Math.random() * 7) // 0-6 days ahead
    const employee = { ...existingEmployees[i] }

    // Set birthday to be within the next week, but keep the year the same
    const birthDate = new Date(employee.dateOfBirth)
    const newBirthDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysAhead, 0, 0, 0)

    // Keep the original year
    newBirthDate.setFullYear(birthDate.getFullYear())
    employee.dateOfBirth = newBirthDate.toISOString()

    employees.push(employee)
  }

  return employees
}

// Generate leave data
function generateLeaveData(employees: any[], percentOnLeave = 10) {
  const today = new Date()
  const leaves = []
  const employeesOnLeaveCount = Math.floor(employees.length * (percentOnLeave / 100))

  // Randomly select employees to be on leave
  const employeesOnLeave = [...employees].sort(() => 0.5 - Math.random()).slice(0, employeesOnLeaveCount)

  for (let i = 0; i < employeesOnLeaveCount; i++) {
    const employee = employeesOnLeave[i]
    const leaveType = getRandomLeaveType()

    // Generate random leave duration (1-14 days)
    const leaveDuration = Math.floor(Math.random() * 14) + 1

    // Some leaves start in the past, some today
    const startOffset = Math.floor(Math.random() * 3) - 2 // -2 to 0 days
    const startDate = addDays(today, startOffset)
    const endDate = addDays(startDate, leaveDuration)

    leaves.push({
      id: i.toString(),
      employeeId: employee.id,
      leaveType,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status: "Approved",
      reason: faker.lorem.sentence(),
      approvedBy: faker.person.fullName(),
      approvedOn: subDays(startDate, Math.floor(Math.random() * 14) + 1).toISOString(),
    })
  }

  return leaves
}

// Generate upcoming leave requests
function generateUpcomingLeaves(employees: any[], count = 15) {
  const today = new Date()
  const leaves = []

  // Randomly select employees for upcoming leaves
  const selectedEmployees = [...employees].sort(() => 0.5 - Math.random()).slice(0, count)

  for (let i = 0; i < count; i++) {
    const employee = selectedEmployees[i]
    const leaveType = getRandomLeaveType()

    // Generate random leave duration (1-14 days)
    const leaveDuration = Math.floor(Math.random() * 14) + 1

    // Upcoming leaves start in the future (3-30 days ahead)
    const startOffset = Math.floor(Math.random() * 28) + 3
    const startDate = addDays(today, startOffset)
    const endDate = addDays(startDate, leaveDuration)

    // Some are approved, some are pending
    const status = Math.random() > 0.3 ? "Approved" : "Pending"

    leaves.push({
      id: (i + 100).toString(), // Avoid ID collision with current leaves
      employeeId: employee.id,
      leaveType,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      status,
      reason: faker.lorem.sentence(),
      approvedBy: status === "Approved" ? faker.person.fullName() : null,
      approvedOn: status === "Approved" ? subDays(today, Math.floor(Math.random() * 7) + 1).toISOString() : null,
    })
  }

  return leaves
}

// Generate attendance data for the current month
function generateAttendanceData(employees: any[]) {
  const today = new Date()
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1)
  const attendance = []

  for (const employee of employees) {
    // Skip employees on leave
    if (employee.status !== "Active") continue

    // Generate attendance for each day from start of month to today
    for (let day = new Date(startOfMonth); day <= today; day = addDays(day, 1)) {
      // Skip weekends
      if (day.getDay() === 0 || day.getDay() === 6) continue

      const isPresent = Math.random() > 0.05 // 95% attendance rate

      if (isPresent) {
        // Generate clock in time (8:00 AM - 9:30 AM)
        const clockInHour = 8 + Math.floor(Math.random() * 2)
        const clockInMinute = Math.floor(Math.random() * 60)
        const clockIn = new Date(day)
        clockIn.setHours(clockInHour, clockInMinute, 0, 0)

        // Generate clock out time (5:00 PM - 7:00 PM)
        const clockOutHour = 17 + Math.floor(Math.random() * 3)
        const clockOutMinute = Math.floor(Math.random() * 60)
        const clockOut = new Date(day)
        clockOut.setHours(clockOutHour, clockOutMinute, 0, 0)

        attendance.push({
          id: `${employee.id}-${format(day, "yyyy-MM-dd")}`,
          employeeId: employee.id,
          date: day.toISOString(),
          status: "Present",
          clockIn: clockIn.toISOString(),
          clockOut: clockOut.toISOString(),
        })
      } else {
        attendance.push({
          id: `${employee.id}-${format(day, "yyyy-MM-dd")}`,
          employeeId: employee.id,
          date: day.toISOString(),
          status: "Absent",
          clockIn: null,
          clockOut: null,
        })
      }
    }
  }

  return attendance
}

// Generate announcements
function generateAnnouncements(count = 5) {
  const announcements = []
  const today = new Date()

  const announcementTypes = [
    "Company Update",
    "HR Announcement",
    "Policy Change",
    "Event",
    "Holiday",
    "Training",
    "Office Closure",
  ]

  for (let i = 0; i < count; i++) {
    const daysAgo = Math.floor(Math.random() * 30)
    const date = subDays(today, daysAgo)

    announcements.push({
      id: i.toString(),
      title: faker.lorem.sentence().replace(".", ""),
      type: announcementTypes[Math.floor(Math.random() * announcementTypes.length)],
      content: faker.lorem.paragraphs(2),
      date: date.toISOString(),
      author: faker.person.fullName(),
      department: "Human Resources",
      important: Math.random() > 0.7, // 30% are important
    })
  }

  // Sort by date, newest first
  return announcements.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// Generate company events
function generateEvents(count = 8) {
  const events = []
  const today = new Date()

  const eventTypes = [
    "Team Building",
    "Training",
    "Conference",
    "Holiday Party",
    "All Hands Meeting",
    "Department Meeting",
    "Workshop",
    "Hackathon",
  ]

  for (let i = 0; i < count; i++) {
    // Some events in the past, most in the future
    const dayOffset = Math.floor(Math.random() * 60) - 10 // -10 to 50 days from now
    const date = addDays(today, dayOffset)

    // Event duration 1-3 days
    const duration = Math.floor(Math.random() * 3) + 1
    const endDate = addDays(date, duration)

    events.push({
      id: i.toString(),
      title: faker.lorem.words(3),
      type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
      description: faker.lorem.paragraph(),
      startDate: date.toISOString(),
      endDate: endDate.toISOString(),
      location: Math.random() > 0.5 ? "Office" : faker.location.city(),
      organizer: faker.person.fullName(),
      department: Object.keys(departments)[Math.floor(Math.random() * Object.keys(departments).length)],
    })
  }

  // Sort by date
  return events.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
}

// Generate all data
export function generateData(employeeCount = 150) {
  // Generate base employees
  const employees = Array(employeeCount)
    .fill(null)
    .map((_, i) => generateEmployee(i + 1))

  // Generate employees with birthdays this week (8-12 employees)
  const birthdayCount = Math.floor(Math.random() * 5) + 8
  const birthdaysThisWeek = generateBirthdaysThisWeek(birthdayCount, employees)

  // Update the original employees with the birthday data
  for (const employee of birthdaysThisWeek) {
    const index = employees.findIndex((e) => e.id === employee.id)
    if (index !== -1) {
      employees[index].dateOfBirth = employee.dateOfBirth
    }
  }

  // Generate leave data (about 5-10% of employees on leave)
  const leaveData = generateLeaveData(employees, 8)

  // Generate upcoming leave requests
  const upcomingLeaves = generateUpcomingLeaves(employees)

  // Combine current and upcoming leaves
  const allLeaves = [...leaveData, ...upcomingLeaves]

  // Generate attendance data
  const attendanceData = generateAttendanceData(employees)

  // Generate announcements
  const announcements = generateAnnouncements()

  // Generate events
  const events = generateEvents()

  // Calculate department breakdown
  const departmentCounts = employees.reduce((acc, employee) => {
    const { department } = employee
    if (!acc[department]) {
      acc[department] = 0
    }
    acc[department]++
    return acc
  }, {})

  // Format department breakdown
  const departmentBreakdown = Object.entries(departmentCounts).map(([department, count]) => ({
    department,
    count,
  }))

  // Calculate gender diversity
  const genderCounts = employees.reduce((acc, employee) => {
    const { gender } = employee
    if (!acc[gender]) {
      acc[gender] = 0
    }
    acc[gender]++
    return acc
  }, {})

  // Format gender diversity
  const genderDiversity = Object.entries(genderCounts).map(([gender, count]) => ({
    gender,
    count,
  }))

  // Calculate tenure distribution
  const tenureDistribution = {
    "Less than 1 year": 0,
    "1-2 years": 0,
    "3-5 years": 0,
    "6-10 years": 0,
    "More than 10 years": 0,
  }

  employees.forEach((employee) => {
    const joinDate = new Date(employee.dateJoined)
    const today = new Date()
    const yearsEmployed = today.getFullYear() - joinDate.getFullYear()

    if (yearsEmployed < 1) tenureDistribution["Less than 1 year"]++
    else if (yearsEmployed < 3) tenureDistribution["1-2 years"]++
    else if (yearsEmployed < 6) tenureDistribution["3-5 years"]++
    else if (yearsEmployed < 11) tenureDistribution["6-10 years"]++
    else tenureDistribution["More than 10 years"]++
  })

  // Format tenure distribution
  const tenureData = Object.entries(tenureDistribution).map(([range, count]) => ({
    range,
    count,
  }))

  // Calculate salary distribution
  const salaryRanges = {
    "Under $50k": 0,
    "$50k-$75k": 0,
    "$75k-$100k": 0,
    "$100k-$150k": 0,
    "Over $150k": 0,
  }

  employees.forEach((employee) => {
    const { salary } = employee

    if (salary < 50000) salaryRanges["Under $50k"]++
    else if (salary < 75000) salaryRanges["$50k-$75k"]++
    else if (salary < 100000) salaryRanges["$75k-$100k"]++
    else if (salary < 150000) salaryRanges["$100k-$150k"]++
    else salaryRanges["Over $150k"]++
  })

  // Format salary distribution
  const salaryData = Object.entries(salaryRanges).map(([range, count]) => ({
    range,
    count,
  }))

  return {
    employees,
    birthdaysThisWeek,
    leaveData,
    upcomingLeaves,
    allLeaves,
    attendanceData,
    announcements,
    events,
    teamOverview: {
      totalEmployees: employees.length,
      activeEmployees: employees.length - leaveData.length,
      employeesOnLeave: leaveData.length,
      departmentBreakdown,
      genderDiversity,
      tenureData,
      salaryData,
    },
  }
}

// Export the generated data
export const generatedData = generateData()
