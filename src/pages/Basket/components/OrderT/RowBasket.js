import React, {Component} from 'react';
import store from "../../../../redux/store";
import {AddCost} from "../../../../redux/actions/add.action";
import * as api from "../../../../api/user.api";
import {BASKET, CN} from "../../../../configs/variables.config";
import {PRODUCTS, SERVER} from "../../../../configs/url.config";
import {styled} from '@mui/material/styles';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import {IoMdCloseCircle} from "react-icons/io";
import {BsTrash} from "react-icons/all";
import style from '../../../../asset/styles/RowBasket.module.css'

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },

    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


class RowBasket extends Component {

    state = {
        isLoading: true,
        number: 1,
        flag: true

    }

    async componentDidMount() {

        this.setState({isLoading: true})

        try {
            const response = await api.getData(`${PRODUCTS}/${this.props.valu.id}`);
            this.setState({data: response}, () => {
                this.setState({number: this.props.valu.num})
                store.dispatch(AddCost(this.props.valu.num * ((this.state.data.price / 100) * (100 - (this.state.data.off ? this.state.data.off : 0)))))
                this.setState({isLoading: false})
            })
            this.props.func()
        } catch (e) {
            return e
        }
    }

    valuHandeler = (e) => {
        if (e.target.innerHTML === "+" && this.state.number + 1 > this.state.data.count) {
            alert("موجود نيست")
        } else {
            if (e.target.innerHTML === "+") {
                store.dispatch(AddCost(((this.state.data.price / 100) * (100 - (this.state.data.off ? this.state.data.off : 0)))))
                this.props.func()
                this.setState({number: this.state.number + 1}, () => {
                    this.localHandler(this.state.number)
                })
            } else {
                store.dispatch(AddCost(-1 * ((this.state.data.price / 100) * (100 - (this.state.data.off ? this.state.data.off : 0)))))
                this.props.func()
                this.setState({number: this.state.number - 1}, () => {
                    this.localHandler(this.state.number)
                    if (this.state.number === 0) {
                        this.setState({number: 1})
                        this.flagHandler()
                    }
                })
            }
        }

    }

    localHandler = (n) => {
        let flg = false
        let commoditisNum = 0
        let texts = localStorage.getItem(BASKET);
        let textObj;
        if (texts == null) {
            textObj = [];
        } else {
            textObj = JSON.parse(texts)
        }
        textObj.forEach((item) => {
            if (item.id === this.state.data.id) {
                if (n === -1) {
                    this.setState({number: item.num})
                } else {
                    item.num = n;
                }
                flg = true
            }
            commoditisNum += item.num
        })
        if (!flg && n !== -1) {
            textObj.push({id: this.state.data.id, num: 1})
        }
        localStorage.setItem(BASKET, JSON.stringify(textObj))
        localStorage.setItem(CN, commoditisNum)


    }
    trashHandeler = () => {
        store.dispatch(AddCost(-1 * this.state.number * ((this.state.data.price / 100) * (100 - (this.state.data.off ? this.state.data.off : 0)))))
        this.props.func()
        this.localHandler(0)
        this.setState({number: 0})
    }


    flagHandler = () => {
        if (this.state.flag) {
            this.localHandler(1)
        }
        this.setState({flag: !this.state.flag})
    }


    render() {
        if (this.props.valu.num === 0 || this.state.number === 0) {
            return (
                <></>
            );
        }
        if (this.state.isLoading) {
            return (
                <div>
                    looddinnnnggggggg
                </div>
            );

        } else {
            return (
                <StyledTableRow>
                    <StyledTableCell component="th" scope="row" align="right" sx={{width: "35%", marginLeft: "0"}}>
                        <div className={style.Fbox}>
                            <div className={style.img}>
                                <div className={style.deletIcon} onClick={this.trashHandeler}><IoMdCloseCircle
                                    size={30}/></div>
                                <img src={`${SERVER}/${this.state.data.category.icon}`} width={150} height={150}/>
                            </div>
                            <div className={style.info}>
                                <div>
                                    {this.state.data.category.name}
                                </div>
                                <p>{this.state.data.brand}</p>
                            </div>
                        </div>
                    </StyledTableCell>
                    <StyledTableCell align="center" sx={{width: "20%"}}>{this.state.data.off
                        ? <div className={style.offbox}>
                            <del> {this.state.data.price}تومان</del>
                            <div className={style.price}>
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    <span className={style.tag}>
                                        {this.state.data.off}%
                                    </span>
                                    <p>تخفیف</p>
                                </div>
                                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                                    <p> {(this.state.data.price / 100) * (100 - this.state.data.off)} </p>
                                    <i> تومان </i>
                                </div>
                            </div>
                        </div>
                        : <p>{this.state.data.price} تومان</p>}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                        <div className={style.box}>
                            {this.state.number === 1
                                ? <BsTrash onClick={this.trashHandeler} color={"red"} size={"20px"} style={{marginTop: "2px"}}/>
                                : <button className={style.but} onClick={this.valuHandeler}>-</button>
                            }
                            <div className={style.inpu}>{this.state.number}</div>
                            <button className={style.but} onClick={this.valuHandeler}>+</button>
                        </div>
                    </StyledTableCell>
                    <StyledTableCell
                        align="right">{this.state.number * ((this.state.data.price / 100) * (100 - (this.state.data.off ? this.state.data.off : 0)))}
                    </StyledTableCell>
                </StyledTableRow>
            );
        }
    }
}

export default RowBasket;