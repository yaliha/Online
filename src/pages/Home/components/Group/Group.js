import React, {useRef} from 'react'
import {Link} from "react-router-dom";
import useDraggableScroll from 'use-draggable-scroll';
import Card from '../../../../components/Cards/Card'
import {PATHS} from "../../../../configs/routes.config";
import {GROP} from "../../../../configs/variables.config";
import style from '../../../../asset/styles/Group.module.css'

const Group = (props) => {
    const ref = useRef(null);
    const {onMouseDown} = useDraggableScroll(ref);
    let num = 0;
    return (
        <div className={style.contain}>
            <div className={style.roww} ref={ref} onMouseDown={onMouseDown}>
                <div className={style.hed}>
                    <Link to={`${PATHS.SHELVS}/?${GROP}=${props.hOne[1]}`}>
                        <h1>{`${props.hOne[0]}`}</h1>
                    </Link>
                </div>
                {
                    props.data.map((item, index) => {
                        if(props.hOne[1]===0 &&  num < 6 && item.off){
                            num += 1
                            return <Card data={item}/>
                        }else if (item.category.group === props.hOne[0] && num < 6) {
                            num += 1
                            return <Card data={item}/>
                        }

                    })}
                <div className={style.hed} style={{backgroundColor: "white "}}>
                    <Link to={`${PATHS.SHELVS}/?${GROP}=${props.hOne[1]}`}>
                        <h3 style={{coler: "blue "}} color={"red !important"}>مشاهده بيشتر</h3>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Group