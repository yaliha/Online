import React, {Component} from 'react';
import * as api from "../../api/user.api";
import {CATEGORY, PRODUCTS} from "../../configs/url.config";
import Main from "./components/Main/Main";
import Sidebar from './components/Sidebar/Sidebar';
import style from "../../asset/styles/Shelvs.module.css"
class Shelvs extends Component {
    state={
        data:[],
        grop:[],
        flag:false
    }

    async componentDidMount() {

        let params = window.location.search.slice(6,window.location.search.length+1);

        try {
            const response3= await api.getData(CATEGORY);
            const response2 = await api.getData(PRODUCTS);
            if(params==0){
                this.setState({grop:0})

            }else {
                const response= await api.getData(`${CATEGORY}/${params}`);
                this.setState({grop:response})

            }

            this.setState({data:response2})
            this.setState({categoryes:response3} ,()=>{
                this.render()
            })
        } catch (e) {

        }
    }

    flagHandelr=async ()=>{
        let params = window.location.search.slice(6,window.location.search.length+1);

        try {
            const response3= await api.getData(CATEGORY);
            const response2 = await api.getData(PRODUCTS);

            const response= await api.getData(`${CATEGORY}/${params}`);
            this.setState({grop:response})
            this.setState({data:response2})
            this.setState({categoryes:response3} ,()=>{
                this.render()
                this.setState({flag:!this.state.flag})
            })
        } catch (e) {

        }


    }


    render() {
        return (
            <div className={style.contaner}>
                <Main data={[this.state.data,this.state.grop]}/>
                <Sidebar data={this.state.categoryes} func={this.flagHandelr} />
           </div>
        );
    }
}

export {Shelvs};
