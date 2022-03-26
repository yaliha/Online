import React, {Component} from 'react';
import * as api from "../../api/user.api";
import {PRODUCTS,SERVER} from "../../configs/url.config";
import ImageBox from "./components/ImageBox/ImageBox";
import InfoBox from "./components/InfoBox/InfoBox";
import style from "../../asset/styles/Commoditi.module.css"



class Commoditi extends Component {
    state={
        isLoading:true
    }
    async componentDidMount() {

        this.setState({isLoading:true})
        let params = window.location.search.slice(6,window.location.search.length+1);

        try {
            const response = await api.getData(`${PRODUCTS}/${params}`);
            this.setState({data:response})
            this.setState({isLoading:false})

        } catch (e) {

        }
    }

    render() {
        if(this.state.isLoading){
            return (
                <div>
                    looddinnnnggggggg
                </div>
            );
        }else {
            return (
                <div className={style.main}>
                    <InfoBox data={this.state.data}/>
                    <ImageBox data={this.state.data}/>
                </div>
            );
        }
    }

}

export {Commoditi};