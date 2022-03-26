import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {PATHS} from '../../configs/routes.config'
import {CN} from "../../configs/variables.config";
import logo from '../../asset/images/logo-removebg-preview.png'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import style from '../../asset/styles/CustomerHedar.module.css';


class CustomerHedar extends Component {
    state = {
        isLoading: true
    }

    componentDidMount() {
        this.setState({isLoading: true})
        let basket = localStorage.getItem(CN)
        this.setState({basket: basket})
        this.setState({isLoading: false})
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div>lod</div>
            )
        }

        return (
            <div className={style.headerContainer}>
                <div className={style.leftHedear}>
                    <div className={style.basket}>
                        <Link to={PATHS.BASKET}> <ShoppingCartIcon sx={{fontSize: 40, color: "#a07042"}}/></Link>
                        {/*{*/}
                        {/*    store.getState().Add.number ? <span className={style.circle}>{store.getState().Add.number}</span>:<></>*/}
                        {/*}*/}
                    </div>
                    <div className={style.admin}>
                        <Link to={PATHS.LOGIN}> <SupervisorAccountIcon sx={{fontSize: 44, color: "#a07042"}}/></Link>
                    </div>
                </div>
                <Link to={PATHS.HOME}>
                    <div className={style.rightHedear}>
                        <h1>فروشگاه پويا</h1>
                        <img className={style.logoPic} src={logo}/>
                    </div>
                </Link>
            </div>
        );
    }
}

export default CustomerHedar;