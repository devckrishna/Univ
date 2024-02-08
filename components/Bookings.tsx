import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
]

export default function TableDemo() {
  return (
    <Table className="bg-white">
      {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
      <TableHeader>
        {/* <TableRow>
          <TableHead className="w-[50%] text-right">Invoice</TableHead>
          <TableHead className="w-[50%] text-right">Amount</TableHead>
        </TableRow> */}
        <TableRow>
          <TableHead className="w-[100px]">Date</TableHead>
          <TableHead>Start Time</TableHead>
          <TableHead>End Time</TableHead>
          <TableHead className="text-right">Duration</TableHead>
          <TableHead>Join Link</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((invoice) => (
          <TableRow key={invoice.invoice}>
            <TableCell className="font-medium">{invoice.invoice}</TableCell>
            <TableCell>{invoice.paymentStatus}</TableCell>
            <TableCell>{invoice.paymentMethod}</TableCell>
            <TableCell className="text-right">{invoice.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  )
}



// 'use client';
// import React from 'react';
// import {Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow} from '@mui/material'

// const columns = [
//     { id: 'name', label: 'Student Name', minWidth: 170 },
//     { id: 'code', label: 'Date', minWidth: 100 },
//     {
//       id: 'population',
//       label: 'Start Time',
//       minWidth: 170,
//       align: 'right',
//       format: (value:any) => value.toLocaleString('en-US'),
//     },
//     {
//       id: 'size',
//       label: 'End Time',
//       minWidth: 170,
//       align: 'right',
//       format: (value:any) => value.toLocaleString('en-US'),
//     },
//     {
//       id: 'density',
//       label: 'Duration (hrs)',
//       minWidth: 170,
//       align: 'right',
//       format: (value:any) => value.toFixed(2),
//     },
//   ];

//   function createData(name:any, code:any, population:any, size:any) {
//     const density = population / size;
//     return { name, code, population, size, density };
//   }

//   const rows = [
//     createData('India', 'IN', 1324171354, 3287263),
//     createData('China', 'CN', 1403500365, 9596961),
//     createData('Italy', 'IT', 60483973, 301340),
//     createData('United States', 'US', 327167434, 9833520),
//     createData('Canada', 'CA', 37602103, 9984670),
//     createData('Australia', 'AU', 25475400, 7692024),
//     createData('Germany', 'DE', 83019200, 357578),
//     createData('Ireland', 'IE', 4857000, 70273),
//     createData('Mexico', 'MX', 126577691, 1972550),
//     createData('Japan', 'JP', 126317000, 377973),
//     createData('France', 'FR', 67022000, 640679),
//     createData('United Kingdom', 'GB', 67545757, 242495),
//     createData('Russia', 'RU', 146793744, 17098246),
//     createData('Nigeria', 'NG', 200962417, 923768),
//     createData('Brazil', 'BR', 210147125, 8515767),
//   ];


// const Bookings:  React.FC = () =>{
    
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event:any, newPage:any) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event:any) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//     return (
//         <Paper>
//         <TableContainer sx={{ maxHeight: 440 }}>
//             <Table stickyHeader aria-label="sticky table">
//             <TableHead>
//                 <TableRow>
//                 <TableCell align="center" colSpan={2}>
//                     Student Details
//                 </TableCell>
//                 <TableCell align="center" colSpan={3}>
//                     Timings
//                 </TableCell>
//                 </TableRow>
//                 <TableRow>
//                 {columns.map((column:any) => (
//                     <TableCell
//                     key={column.id}
//                     align={column.align}
//                     style={{ top: 57}}
//                     >
//                     {column.label}
//                     </TableCell>
//                 ))}
//                 </TableRow>
//             </TableHead>
//             <TableBody>
//                 {rows
//                 .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//                 .map((row:any) => {
//                     return (
//                     <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
//                         {columns.map((column:any) => {
//                         const value = row[column.id];
//                         return (
//                             <TableCell key={column.id} align={column.align}>
//                             {column.format && typeof value === 'number'
//                                 ? column.format(value)
//                                 : value}
//                             </TableCell>
//                         );
//                         })}
//                     </TableRow>
//                     );
//                 })}
//             </TableBody>
//             </Table>
//         </TableContainer>
//         <TablePagination
//             rowsPerPageOptions={[10, 25, 100]}
//             component="div"
//             count={rows.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//         </Paper>
//     )

// }

// export default Bookings;