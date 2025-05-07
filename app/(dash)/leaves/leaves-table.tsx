import { format, differenceInDays } from "date-fns";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Box,
  Chip,
  Card,
  Skeleton,
  Stack,
} from "@mui/material";

const getDaysRemaining = (endDate: string) => {
  const today = new Date();
  const end = new Date(endDate);
  return Math.max(0, differenceInDays(end, today));
};

type LeavesTableProps = {
  data?: any[];
};

export function LeavesTable({ data = [] }: LeavesTableProps) {
  return (
    <Box>
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Start date</TableCell>
              <TableCell>End date</TableCell>
              <TableCell>Days remaining</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar src={employee.avatar} sx={{ mr: 2 }}>
                      {employee.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="body1">{employee.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {employee.position}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell>{employee.department}</TableCell>
                <TableCell>
                  <Chip
                    label={employee.leaveType}
                    variant="outlined"
                    color={
                      employee.leaveType === "Annual Leave"
                        ? "primary"
                        : employee.leaveType === "Sick Leave"
                        ? "error"
                        : employee.leaveType === "Maternity/Paternity Leave"
                        ? "secondary"
                        : "default"
                    }
                  />
                </TableCell>
                <TableCell>
                  {format(new Date(employee.startDate), "MMM dd, yyyy")}
                </TableCell>
                <TableCell>
                  {format(new Date(employee.endDate), "MMM dd, yyyy")}
                </TableCell>

                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    {getDaysRemaining(employee.endDate)} days
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <Typography variant="body1" sx={{ py: 3 }}>
                    No employees currently on leave
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export function LeavesTableSkeleton() {
  return (
    <Box>
      <TableContainer component={Card}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Start date</TableCell>
              <TableCell>End date</TableCell>
              <TableCell>Days remaining</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Avatar sx={{ mr: 2 }} />
                    <Stack spacing={0.5}>
                      <Skeleton variant="rounded" width={80} />
                      <Skeleton variant="rounded" width={100} />
                    </Stack>
                  </Box>
                </TableCell>
                <TableCell>
                  <Skeleton variant="rounded" width={120} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rounded" width={120} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rounded" width={120} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rounded" width={120} />
                </TableCell>
                <TableCell>
                  <Skeleton variant="rounded" width={120} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
