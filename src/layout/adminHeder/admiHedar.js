import React, {Component} from 'react';
import {Link} from "react-router-dom";
import style from '../../asset/styles/AdmiHedar.module.css';
import {PATHS} from "../../configs/routes.config";
import {IS_LOGGED_IN} from "../../configs/variables.config";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

class AdmiHedar extends Component {
    state={
            page:0
    }
    activHandeler=(e)=>{
       this.setState({page:e.target.parentNode.id})
    }

    click=()=>{
        localStorage.setItem(IS_LOGGED_IN, false.toString());
    }
    render() {
        return (
            <div className={style.hedearBox}>
                <div className={style.hedearContainer}>
                    <h1 > مديريت  </h1>
                    <ul >
                        <li id={"0"} onClick={this.activHandeler}><Link className={this.state.page===0?style.active:""} to={PATHS.COMMODITIES} > كالاها </Link></li>
                        <li><div className={style.line}></div></li>
                        <li id={"1"} onClick={this.activHandeler}><Link className={this.state.page===1?style.active:""} to={PATHS.LISTOFASSETS}>موجودي و قيمت ها </Link></li>
                        <li><div className={style.line}></div></li>
                        <li id={"2"} onClick={this.activHandeler}><Link className={this.state.page===2?style.active:""} to={PATHS.ORDERS}>سفارش ها</Link></li>
                    </ul>
                    <Link to={PATHS.HOME} onClick={this.click} ><ExitToAppIcon sx={{ fontSize: 44,color: "#a07042" }} /></Link>
                </div>
            </div>
        );
    }
}

export default AdmiHedar;