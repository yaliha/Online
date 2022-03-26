import React, {Component} from 'react'
import style from '../../../../asset/styles/Resulte.module.css'
import {AiFillCheckCircle} from "react-icons/all";
import * as api from "../../../../api/user.api";
import {BASKET, ORDER} from "../../../../configs/variables.config";
import {ORDERS, PRODUCTS} from "../../../../configs/url.config";

class Succes extends Component {

    async componentDidMount() {
        let order = localStorage.getItem(ORDER)
        try {
            const response = await api.post(ORDERS, JSON.parse(order));
            localStorage.removeItem(ORDER)
            let basket = JSON.parse(localStorage.getItem(BASKET))
            await Promise.all(basket.map(async (item) => {
                const contents = await api.getData(`${PRODUCTS}/${item.id}`)
                let New = contents;
                New.count = New.count - item.num
                const contentsPut = await api.put(`${PRODUCTS}/${item.id}`, New)
            }));
            localStorage.removeItem(BASKET)
        } catch (e) {

        }
    }


    render() {
        return (
            <div className={style.contain}>
                <div>
                    <AiFillCheckCircle color="green" size='50px'/>
                </div>
                <div className={style.direction}>
                    <p>باتشکر از پرداخت شما،سفارش ثبت
                     <br/> شده و جهت هماهنگی ارسال با شما تماس گرفته خواهد شد
                    </p>
                </div>
            </div>
        )
    }
}

export {Succes}