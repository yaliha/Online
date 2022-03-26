import React, {Component} from 'react';
import Card from "../../../../components/Cards/Card";
import style from "../../../../asset/styles/Shelvs.Main.module.css"

class Main extends Component {
    render() {
        return (
            <div className={style.contain}>
                <div className={style.hed}>
                    {
                        this.props.data[1]==0?<h1>تخفيف پارتي </h1>:  <h1>{`كالاهاي گروه ${this.props.data[1].name}`}</h1>
                    }
                </div>
                <div className={style.roww}>
                    {this.props.data[0].map(item => {
                        if(this.props.data[1]==0 && item.off ){
                            return <Card data={item}/>
                        }else if (item.category.group === this.props.data[1].name) {
                            return <Card data={item}/>
                        }

                    })}
                </div>
            </div>

        );
    }
}

export default Main;