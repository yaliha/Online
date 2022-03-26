import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import * as moment from "jalali-moment";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

import OrdersModal from "../Modal/OrdersModal";
import TablePagination from "@mui/material/TablePagination";
import Box from '@mui/material/Box'


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor:   "#060638",
        color: "#f5eee8",
        fontSize: 20
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}



export default function CustomizedTables(props) {
    let data =props.prop.data;
    let rows = props.prop.data.filter(row=>{
        return row.OrderStatus == props.prop.value
    })
    console.log(rows)
    const [flg,setFlg]=React.useState(true)
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(2);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };




    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700,alignItems:"center" }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">نام كاربر</StyledTableCell>
                        <StyledTableCell align="right">مجموع مبلغ</StyledTableCell>
                        <StyledTableCell align="right">زمان ثبت سفارش</StyledTableCell>
                        <StyledTableCell align="right">جزئیات</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rows.length>4?rows.slice((page) * rowsPerPage, (page) * rowsPerPage + rowsPerPage) :rows)
                        .map((row) => (
                        <StyledTableRow key={row.fristName}>
                            <StyledTableCell component="th" scope="row" align="right" sx={{width:"30%"}}>
                                {row.fristName+"_"+row.lastName}
                            </StyledTableCell>
                            <StyledTableCell align="right">{row.TotalPrice}</StyledTableCell>
                            <StyledTableCell align="right">{moment(row.OrderTime).locale('fa').format('YYYY/MM/DD')}</StyledTableCell>
                            <StyledTableCell align="right" > <DialogActions align="right"style={{direction:"rtl",justifyContent: "start"}}  >
                                <OrdersModal data={row} func={setFlg}/>
                            </DialogActions></StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>


            </Table>

            {rows.length>4?<TablePagination
                component="div"
                sx={{width:"100%",justifyContent:"center",display:"inline-flex"}}
                count={rows.length}
                page={page}
                rowsPerPageOptions={[2,5, 10, 25, { label: 'All', value: -1 }]}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            /> :<></>}


        </TableContainer>
    );
}
