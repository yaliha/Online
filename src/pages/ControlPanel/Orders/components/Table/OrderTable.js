import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import {Link} from "react-router-dom";
import {PATHS} from "../../../../../configs/routes.config";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },

    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
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


export default function OrderTable(props  ) {
    let rows = (props.valu.length==0?[{"name": "", "Price":"", "number":""}] :props.valu)
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

        <TableContainer component={Paper}  >
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">نام كالا </StyledTableCell>
                        <StyledTableCell align="right">قيمت</StyledTableCell>
                        <StyledTableCell align="right">تعداد</StyledTableCell>

                    </TableRow>
                </TableHead>
                <TableBody >
                    {(rows.length>4?rows.slice((page) * rowsPerPage, (page) * rowsPerPage + rowsPerPage) :rows)
                        .map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell component="th" scope="row" align="right">
                                <Link to={`${PATHS.COMMODITI}/?Card=${row.id}`} >
                                    {row.name}
                                </Link>

                            </StyledTableCell>
                            <StyledTableCell align="right">{row.Price}</StyledTableCell>
                            <StyledTableCell align="right">{row.num}</StyledTableCell>

                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
            {rows.length>4?<TablePagination
                component="div"
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
