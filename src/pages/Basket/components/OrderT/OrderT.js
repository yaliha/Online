import React from 'react';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },

    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export default function OrderT(props  ) {
    return (

        <TableContainer component={Paper}  >
            <Table sx={{ minWidth: 400 }} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="right">نام كالا </StyledTableCell>
                        <StyledTableCell align="center">قيمت</StyledTableCell>
                        <StyledTableCell align="right" sx={{paddingRight:"4rem"}}>تعداد</StyledTableCell>
                        <StyledTableCell align="right">قيمت نهايي</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {props.children}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
