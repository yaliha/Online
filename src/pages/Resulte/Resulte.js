import React, {Component} from 'react';
import {Link} from 'react-router-dom'
import {Succes} from "./components/Succes/Succes";
import {Failed} from "./components/Failed/Failed";
import {BiBasket, BsCardChecklist, MdPayment} from "react-icons/all";
import {PATHS} from "../../configs/routes.config";
import style from "../../asset/styles/Basket.module.css";

class Resulte extends Component {

    state = {
        isLoading: true

    }

    componentDidMount() {
        this.setState({isLoading: true})
        let params = window.location.search[1]
        this.setState({params: params}, () => {
            this.setState({isLoading: false})
        })
    }


    render() {
        if (this.state.isLoading) {
            return (
                <div>
                    loddinnngg
                </div>
            );

        } else if (this.state.params == 1) {
            return (
                <div>
                    <div className={style.hed}>
                        <div className={style.minBoxA}>
                            <Link to={PATHS.BASKET}>
                                <BiBasket size={"50px"} color={"#a07042"}/>
                                <span>سبد خرید </span>
                            </Link>
                        </div>
                        <hr className={style.line}/>
                        <div className={style.minBoxA}>
                            <Link to={PATHS.SHOPING}>
                                <BsCardChecklist size={"50px"} color={"#a07042"}/>
                                <span>اطلاعات ارسال </span>
                            </Link>
                        </div>
                        <hr className={style.line}/>
                        <div className={style.minBoxA}>
                            <MdPayment size={"50px"} color={"#a07042"}/>
                            <span>اطلاعات پرداخت </span>
                        </div>
                    </div>
                    <Succes/>
                </div>
            );
        } else {
            return (
                <div>
                    <div className={style.hed}>
                        <div className={style.minBoxA}>
                            <Link to={PATHS.BASKET}>
                                <BiBasket size={"50px"} color={"#a07042"}/>
                                <span>سبد خرید </span>
                            </Link>
                        </div>
                        <hr className={style.line}/>
                        <div className={style.minBoxA}>
                            <Link to={PATHS.SHOPING}>
                                <BsCardChecklist size={"50px"} color={"#a07042"}/>
                                <span>اطلاعات ارسال </span>
                            </Link>
                        </div>
                        <hr className={style.line}/>
                        <div className={style.minBoxA}>
                            <MdPayment size={"50px"} color={"#a07042"}/>
                            <span>اطلاعات پرداخت </span>
                        </div>
                    </div>
                    <Failed/>
                </div>
            );

        }


    }
}

export {Resulte};