import React, {Component} from 'react';
import store from "../../redux/store";
import {getCommoditis} from "../../redux/actions/add.action";
import Group from './components/Group/Group';
import * as api from "../../api/user.api";
import {CATEGORY, PRODUCTS} from "../../configs/url.config";
import style from '../../asset/styles/Home.module.css'

class Home extends Component {
    state={
        data:[],
        commoditis:[]
    }
    async componentDidMount() {

        try {
            const response = await api.getData(CATEGORY);
            const response2 = await api.getData(PRODUCTS);
            this.setState({commoditis:response2})
            this.setState({data:response})
            store.dispatch(getCommoditis(response2))
        } catch (e) {

        }
    }
    render() {
        return (
            <div style={{  overflowX: "hidden",width:"95%",margin:"0 auto"}}>
                <Group hOne={["تخفيف پارتي",0]} data={this.state.commoditis} />
                <div className={style.line}>  <h1 className={style.botm} >دسته بندي ها</h1> </div>
                {  this.state.data .map(item=>{
                    return <Group hOne={[item.name,item.id]} data={this.state.commoditis}/>
                })}
            </div>
        );
    }
}

export {Home};