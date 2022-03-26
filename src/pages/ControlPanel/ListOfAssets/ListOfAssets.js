import React, {Component} from 'react';

import * as api from "../../../api/user.api";
import {PATHS} from "../../../configs/routes.config";
import style from '../../../asset/styles/Commodities.page.module.css';
import { Button } from '@mui/material';
import EnhancedTable from "./component/Table/Table";
import {PRODUCTS} from "../../../configs/url.config";
import EditableLabel from "./component/Tagel/Tagel";










class ListOfAssets extends Component {
    state={
        data:[]
    }
    async componentDidMount() {
        try {
            const response = await api.getData(PRODUCTS);
            this.setState({data:response})
        } catch (e) {

        }
    }

    render() {
        return (
            <div className={style.contaner}>
                <div className={style.Topcontaner}>
                    <h3>مدیریت موجودی و قیمت ها</h3>
                    <Button variant="contained" color="success" size="small" style={{ height:"2rem" , width:"9rem" ,marginTop:"1rem",marginLeft:"-1.5rem",background:"#060638"}}>ذخیره</Button>
                </div>
                <div className={style.botmcontaner}>
                        <EnhancedTable prop={this.state}/>


                </div>
            </div>
        );
    }
}

export {ListOfAssets};





