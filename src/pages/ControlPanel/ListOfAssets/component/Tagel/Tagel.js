
import React, {Component} from 'react';
import * as api from "../../../../../api/user.api";
import {PATHS} from "../../../../../configs/routes.config";





class EditableLabel extends Component {

    state = {
        text: this.props.value[0],
        firstTxt:this.props.value[0],
        editing: false
    }

    initEditor=  (e)=> {

        return(<input type="text" style={{width:"60px"}}  onFocus={this.selectText}  defaultValue={this.state.text} onBlur={(event) => {
            const key = event.which || event.keyCode;
            this.save(event.target.value)

        }} autoFocus={true}/>)
    }

    edit=()=> {
        this.setState({
            editing: true
        })
    };
    selectText=(e)=>{
        e.target.select()
    }

    save= async (value)=> {

        if(value!=this.state.firstTxt){
            if(!value){
                this.setState({
                    text: this.state.firstTxt,
                    editing: false
                })
            }else {
                let row=this.props.value[2]
                const kay = this.props.value[1]
                kay=="count"?row.count= value:row.price= value
                try {
                    const response = await api.put(`/products/${row.id}`, row);

                    this.setState({
                        text: value,
                        editing: false
                    })


                } catch (e) {
                    alert("نشد")
                    this.setState({
                        text: this.state.firstTxt,
                        editing: false
                    })

                }
            }



        }else {
            this.setState({
                text: this.state.firstTxt,
                editing: false
            })
        }




    };



    render() {
        return this.state.editing ?
            this.initEditor()
            : <p  onClick={this.edit}  >{this.state.text}</p>
    }
}

export default EditableLabel