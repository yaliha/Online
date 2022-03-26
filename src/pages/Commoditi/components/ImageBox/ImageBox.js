import React, {useState, useEffect, useRef} from 'react';
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import style from "../../../../asset/styles/Commoditi.module.css";
import {SERVER} from "../../../../configs/url.config";
import ImageZoom from 'react-image-zooom';

const ImageBox = (props) => {
    const image = useRef()
    const [num, setNum] = useState(3)

    const changeImageHandeler = (e) => {
        image.current.src = e.target.src
    }
    const numberHandler = (e) => {
        if (e.target.value === 1) {
            setNum((num + 1))
        } else {
            if (num > 3) {
                setNum((num - 1))
            }
        }
    }
    return (
        <div className={style.imageBox}>
            <div className={style.imgLi}>
                <IoIosArrowUp style={{marginRight: "2rem"}} value={0} onClick={numberHandler}/>
                <ul>
                    {
                        props.data.image.slice(num - 3, num).map(item => {
                            return <li onClick={changeImageHandeler}>
                                <img src={`${SERVER}/${item}`} width={"100%"} height={"100%"}/>
                            </li>
                        })
                    }
                </ul>
                <IoIosArrowDown style={{marginRight: "2rem"}} value={1} onClick={numberHandler}/>
            </div>
            <div className={style.imgHome}>
                <ImageZoom
                    src={`${SERVER}/${props.data.category.icon}`}
                    width={"450px"}/>
            </div>
        </div>
    );
}

export default ImageBox;