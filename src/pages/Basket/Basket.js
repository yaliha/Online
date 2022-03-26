import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import store from "../../redux/store";
import {PATHS} from "../../configs/routes.config";
import OrderT from "./components/OrderT/OrderT";
import RowBasket from "./components/OrderT/RowBasket";
import {BiBasket, BsCardChecklist, MdPayment} from "react-icons/all";
import {BASKET,CN} from "../../configs/variables.config";
import style from "../../asset/styles/Basket.module.css";
import img from '../../asset/images/bass-removebg-preview.png'
import {Button} from "@mui/material";

class Basket extends Component {
    state = {
        isLoading: true,
        sum: 0,
        flag: false
    }

    componentDidMount() {
        this.setState({isLoading: true})
        let texts = localStorage.getItem(BASKET);
        let textObj;
        if (texts == null) {
            textObj = [];
        } else {
            textObj = JSON.parse(texts)
        }
        this.setState({data: textObj}, () => {
            this.setState({isLoading: false})
        })
    }

    flagHandeler = (e) => {
        this.setState({flag: !this.state.flag})
    }

    render() {
        if(localStorage.getItem(CN)==0){
            return (<div className={style.emptyBasket}>
                <div className={style.tooltip}>
                    <Link to={PATHS.HOME}>
                        <img src={img}/>
                    </Link>

                    <span className={style.tooltiptext}>بازگشت به صفحه اصلی</span>

                </div>

            </div>)
        }
        if (this.state.isLoading) {
            return (
                <div>
                    looddinnnnggggggg
                </div>
            );
        } else {
            return (
                <div className={style.basket}>
                    <div className={style.hed}>
                        <div className={style.minBoxA}>
                            <BiBasket size={"50px"} color={"#a07042"}/>
                            <span>سبد خرید </span>
                        </div>

                        <hr className={style.line}/>
                        <div className={style.minBox}>
                            <BsCardChecklist size={"50px"} color={"#706f6f"}/>
                            <span>اطلاعات ارسال </span>
                        </div>
                        <hr className={style.line}/>
                        <div className={style.minBox}>
                            <MdPayment size={"50px"} color={"#706f6f"}/>
                            <span>اطلاعات پرداخت </span>
                        </div>
                    </div>
                    <div className={style.table}>
                        <OrderT>
                            {
                                this.state.data.map(item => (
                                    <RowBasket valu={item} func={this.flagHandeler}/>
                                ))
                            }
                        </OrderT>
                    </div>
                    <div className={style.cost}>
                        <h1> جمع : {store.getState().Add.price} تومان </h1>
                        <Button variant="contained" color="success" className={style.botn} >
                        <Link to={PATHS.SHOPING}>
                            نهایی کردن سبد خرید
                        </Link>
                         </Button>
                    </div>
                </div>
            );
        }
    }
}

export {Basket};