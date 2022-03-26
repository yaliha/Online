import React, { Component } from 'react'
import style from '../../../../asset/styles/Resulte.module.css'
import {AiFillCloseCircle} from "react-icons/all";

function Failed() {
  
    return (
      <div className={style.contain}>
          <div >
              <AiFillCloseCircle size="50px" color='red'   />
          </div>
          <div  className={style.direction}>
            <p>پرداخت موفقیت امیز نبود، سفارش شما در انتظار پرداخت است</p>
          </div>
      </div>
    )
  
}

export {Failed}