import React, {Component} from 'react';

import * as api from "../../../api/user.api";
import {PATHS} from "../../../configs/routes.config";
import style from '../../../asset/styles/Commodities.page.module.css';
import { Button } from '@mui/material';
import CollapsibleTable from "./components/Table/OrdersTable";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {ORDERS} from "../../../configs/url.config";
import CustomizedTables from "./components/Table/OrdersTable";
import TablePagination from "@mui/material/TablePagination";



class Orders extends Component {


    state={
        data:[],
        value:'Waiting'
    }
    async componentDidMount() {
        try {
            const response = await api.getData(ORDERS);

            this.setState({data:response})
        } catch (e) {

        }
    }

    handleChange = (event) => {

        this.setState({value:event.target.value})
    };

    render() {
        return (
            <div className={style.contaner}>
                <div className={style.Topcontaner}>
                    <h3>مديريت سفارش ها</h3>
                    {/*<Button variant="contained" color="success" size="small" style={{ height:"2rem" , width:"9rem" ,marginTop:"1rem",marginLeft:"-1.5rem",background:"#060638"}}>افزودن كالا</Button>*/}
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={this.state.value}
                        onChange={this.handleChange}

                    >
                        <FormControlLabel value="Waiting" control={<Radio sx={{ color: "#060638",'&.Mui-checked': {color: "#a07042"}}} />} label="سفارش های در انتظار ارسال" />
                        <FormControlLabel value="Delivered" control={<Radio sx={{ color: "#060638",'&.Mui-checked': {color: "#a07042"}}} />} label="سفارش های تحویل شده" />
                    </RadioGroup>
                </div>
                <div className={style.botmcontaner}>

                    <CustomizedTables prop={this.state}/>


                </div>
            </div>
        );
    }
}

export {Orders};




