// import React from "react";
// import MUIDataTable from "mui-datatables";
// import { createTheme, ThemeProvider } from "@mui/material/styles";

// function DataTable({
//   title,
//   data,
//   dataProcessingInfo,
//   rowsPerPage,
//   tableCellFontSize,
//   columns
// }) {
  

//   const options = {
//     selectableRows: false,
//     rowsPerPage: rowsPerPage,
//     textLabels: {
//       body: { noMatch: dataProcessingInfo },
//     },
//   };

  

//   const getMuiTheme = () =>
//     createTheme({
//       components: {
//         MUIDataTableBodyCell: {
//           styleOverrides: {
//             root: {
//               //   background: bgColor,
//               fontSize: tableCellFontSize,
//             },
//           },
//         },
//         MuiTableCell: {
//           head: {
//             backgroundColor: "red !important",
//           },
//         },
//       },
//     });

//   const customTheme = JSON.parse(localStorage.getItem("theme"));

//   const bgColor =
//     `url(` +
//     window.location.origin +
//     `/assets/images/background/` +
//     customTheme.theme.headerImage +
//     `)`;

  

//   return (
//     <div>
//       <ThemeProvider theme={getMuiTheme()}>
//         <MUIDataTable
//           title={title}
//           data={data}
//           columns={columns}
//           options={options}
//           selectableRows="multiple"
//         />
//       </ThemeProvider>
//     </div>
//   );
// }

// export default DataTable;



