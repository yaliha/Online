import * as React from 'react';
import {Link} from "react-router-dom";
import {PATHS} from "../../configs/routes.config";
import {SmalNumberBox} from "../SmalNumberBox/SmalNumberBox";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import style from "../../asset/styles/Cards.module.css"


export default function Cards(props) {
    const [img, setImg] = React.useState(props.data.category.icon);

    const hover = () => {

        if (props.data.image[1]) {
            setImg(props.data.image[1])
        }

    }
    const hoverOUt = () => {
        setImg(props.data.category.icon)
    }


    return (

        <Card className={style.card} dir="rtl" sx={{
            maxWidth: "20%",
            ":hover": { boxShadow: "0px 0px 10px 0px #000000"},
            minWidth: "20%",
            margin: 0.5,
            objectFit: "cover",
            height: "20rem"
        }}>
            <Link to={`${PATHS.COMMODITI}/?Card=${props.data.id}`}>
                <div className={style.img}>
                    {props.data.off ? <span className={style.tag}>{props.data.off}%</span> : ""}
                    <CardMedia
                        sx={{objectFit: "contain"}}
                        style={{WebkitUserSelect: "none"}}
                        component="img"
                        alt="green iguana"
                        height="170px"
                        image={`http://localhost:3002/files/${img}`}
                        onMouseEnter={hover}
                        onMouseOut={hoverOUt}
                    />

                </div>
            </Link>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {props.data.category.name}
                </Typography>
            </CardContent>
            <CardActions
                sx={{display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: ".4rem"}}>
                {!props.data.off ? <div className={style.price}><p> {props.data.price} </p><i> تومان </i></div> :
                    <div className={style.offBox}>
                        <del> {props.data.price}تومان</del>
                        <div className={style.price}><p> {(props.data.price / 100) * (100 - props.data.off)} </p>
                            <i> تومان </i>
                        </div>
                    </div>

                }


                {+props.data.count === 0 ? <p>موجود نميباشد</p> : <SmalNumberBox data={props.data}/>}
            </CardActions>
            {props.data.count < 10 && props.data.count > 0
                ? <div className={style.footar}>{`تعداد موجود : ${props.data.count}`}</div>
                : ""}
        </Card>
    );
}

