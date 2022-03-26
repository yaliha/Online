import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';

import {useRef} from "react";
import {useNavigate} from "react-router-dom";

import styles from '../../../../../asset/styles/Modal.Commodities.module.css';
import ImageUpload from "../ImageUpload/ImageUpload";
import SelectAutoWidth from "../Selctor/Selctor";
import MinHeightTextarea from "../Textarea/TextArea";
import * as api from "../../../../../api/user.api";
import store from "../../../../../redux/store";
import {getCommoditis} from "../../../../../redux/actions/add.action";
import {put} from "../../../../../api/user.api";
import {AiFillCloseCircle} from "react-icons/all";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    // height:"30rem",
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 1,

};

export default function EditModal(props) {
    const [openedit, setOpenedit] = React.useState(false);
    const handleOpen = () => setOpenedit(true);
    const handleClose = () => setOpenedit(false);
    const formRef = useRef();
    const navigate = useNavigate();
    const addHandelear = async (e) => {
        e.preventDefault()
        let imgeFile = new FormData();
        imgeFile.append("image", e.target.image.files[0])
        const date = new Date(0)
        let image = ""

        try {
            const response = await api.post("/upload", imgeFile);
            image = response.filename;

        } catch (e) {
            alert("عكس اپلود نشد")
            // image = "5b231eda24525225722b92103daeae00"
        }

        if(!image){
            image=props.data.image;
        }
        const form = new FormData(e.target);
        const data = Object.fromEntries(form);


        let commoditi = {
            "brand": data.brand,
            "image": [
                image
            ],
            "thumbnail": image,
            "price": data.price,
            "count": data.count,
            "createdAt": date,
            "tozih":data.tozih,
            "off":data.off,

            "category": {
                "group": data.group,
                "name": data.name,
                "icon": image
            }
        }





        try {
            const response = await api.put("/products/"+props.data.id, commoditi);
            store.dispatch(getCommoditis(commoditi))
        } catch (e) {
            alert("كالا ثبت نشد")


        }

        props.func(false)
        handleClose()


    }


    return (
        <div >

            <Button onClick={handleOpen} variant="contained" color="success" size="small" style={{ height:"1rem" , width:"2rem",background:"#031b3a"}}>ويرايش</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openedit}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}

            >
                <Fade in={openedit}>
                    <Box sx={style}>
                        <div className={styles.modalContaner}>
                            <div className={styles.header}><h5>ويرايش</h5><span><AiFillCloseCircle onClick={handleClose}/></span></div>
                            <form className={styles.main} onSubmit={addHandelear}>
                                <ImageUpload value={props.data.category.icon}/>
                                <div style={{ display: "flex",flexDirection:"column",margin:"0.5rem 0" }}>
                                    <label htmlFor={"commoditiNam"}>نام كالا:</label>
                                    <input name={"name"} id={"commoditiNam"}  defaultValue={props.data.category.name} />
                                </div>
                                <SelectAutoWidth value={props.data.category.group}/>
                                <div style={{display: "flex", flexDirection: "column", margin: "0.5rem 0"}}>
                                    <label htmlFor={"brand"}>شركت:</label>
                                    <input name={"brand"} id={"brand"} defaultValue={props.data.brand}/>
                                </div>

                                <div className={styles.rowInpu}>
                                    <div className={styles.rowInputs}>
                                        <label htmlFor={"price"}>قيمت :</label>
                                        <input id={"price"}  type="number" name="price" min="1" defaultValue={props.data.price}  />
                                    </div>

                                    <div className={styles.rowInputs}>
                                        <label htmlFor={"count"}>تعداد:</label>
                                        <input id={"count"}  type="number" name="count" min="1"  defaultValue={props.data.count}/>
                                    </div>

                                    <div className={styles.rowInputs}>
                                        <label htmlFor={"off"}>تخفيف:</label>
                                        <input id={"off"}  type="number" name="off" min="0" max="100"/>
                                    </div>

                                </div>

                                <MinHeightTextarea/>
                                <Button type={"submit"} variant="contained" color="success" size="small" style={{ height:"2rem" , width:"9rem" ,marginTop:"1rem",marginLeft:"-1.5rem",background:"#060638"}}>ذخيره</Button>
                            </form>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}