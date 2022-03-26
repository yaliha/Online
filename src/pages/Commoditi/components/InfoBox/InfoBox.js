import React, {Component} from 'react';
import {NumberBox} from "../../../../components/NumberBox/NumberBox";
import style from "../../../../asset/styles/Commoditi.module.css";

class InfoBox extends Component {
    render() {
        return (
            <div className={style.infoBox}>
                <p>
                    <span>پوياماركت </span> > <span>{this.props.data.category.group}</span> > <span>{this.props.data.category.name}</span>
                </p>
                <h1> {this.props.data.category.name}</h1>
                <i> برند <h4> : {this.props.data.brand} </h4></i>


                {!this.props.data.off ? <h2>{`    ${this.props.data.price}        تومان   `}</h2> :
                    <div className={style.offBox}>
                        <div className={style.of}>
                            <del> {this.props.data.price}تومان</del>
                            <div className={style.offnum}>
                                <h3>تخفيف شما : </h3>
                                <div>{this.props.data.off}%</div>
                            </div>


                        </div>

                        <div className={style.price}>
                            <p> {(this.props.data.price / 100) * (100 - this.props.data.off)} </p>
                            <i> تومان </i>
                        </div>
                    </div>

                }

                <hr/>
                <div className={style.orderBox}>
                    <NumberBox data={this.props.data}/>
                </div>
                <div className={style.tozih}>
                    {this.props.data.tozih}
                </div>
            </div>
        );
    }
}

export default InfoBox;