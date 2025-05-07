import { format } from "date-fns";
import {
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Box,
} from "@mui/material";

type BirthDaysTableProps = {
  data?: any[];
};

export function BirthdaysTable({ data = [] }: BirthDaysTableProps) {
  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Employee</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Date of birth</TableCell>
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
                  {format(new Date(employee.dateOfBirth), "MMM dd, yyyy")}
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
