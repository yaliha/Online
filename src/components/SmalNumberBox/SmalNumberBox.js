import React, {Component} from 'react';
import store from "../../redux/store";
import {AddCost} from "../../redux/actions/add.action";
import {BsTrash} from "react-icons/all";
import {BASKET, CN} from '../../configs/variables.config';
import style from "../../asset/styles/Smal.NumberBox.module.css"




class SmalNumberBox extends Component {
    state={
        number:0,
        flag:true
    }


    componentDidMount() {
        this.localHandler(-1)
    }

    valuHandeler =(e)=>{
        if( e.target.innerHTML==="+"&&this.state.number+1>this.props.data.count){
            alert("موجود نيست")
        }else {
            e.target.innerHTML==="+" ? this.setState({number : this.state.number+1},()=>{
                this.localHandler(this.state.number)
            }) : this.setState({number : this.state.number-1},()=>{
                this.localHandler(this.state.number)
                if(this.state.number===0){
                    this.setState({number:1})
                    this.flagHandler()
                }

            })
        }

    }
    trashHandeler=()=>{
        this.localHandler(0)
        this.setState({number:0},()=>{})
        store.dispatch(AddCost(-1*this.state.number * ((this.state.data.price / 100) * (100 - (this.state.data.off ? this.state.data.off : 0)))))



    }

    localHandler=(n)=>{
        let flg=false
        let commoditisNum=0
        let texts = localStorage.getItem(BASKET);
        let textObj;
        if (texts == null) {
            textObj = [];
        } else {
            textObj = JSON.parse(texts)
        }
        textObj.forEach((item) => {
            if(item.id===this.props.data.id){
                if( n===-1){
                    this.setState({number:item.num})
                }else {
                    item.num=n;
                }
                flg=true
            }
            commoditisNum +=item.num

        })
        if (!flg && n !==-1){textObj.push(
            {
                id:this.props.data.id,num:1,
                name:this.props.data.category.name,
                Price:((this.props.data.price / 100) * (100 - (this.props.data.off ? this.props.data.off : 0)))
            })}
        localStorage.setItem(BASKET,JSON.stringify(textObj))
        localStorage.setItem(CN,commoditisNum)



    }


    flagHandler=()=>{

        this.localHandler(1)
        this.setState({number:1})
    }

    render() {
        if (this.state.number===0){
            return (
                <div className={style.fristBox} onClick={this.flagHandler}>افزودن </div>
            );
        }else {

            return (
                <div className={style.box}>
                    {this.state.number===1?<BsTrash onClick={this.trashHandeler}  color={"red"} size={"20px"} style={{marginTop:"2px"}}/>:<button className={style.but} onClick={this.valuHandeler}>-</button> }
                    <div className={style.inpu}>{this.state.number}</div>
                    <button className={style.but} onClick={this.valuHandeler}>+</button>
                </div>
            );
        }

    }
}

export {SmalNumberBox};