import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import {PATHS} from "../../../../../configs/routes.config";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";
import * as api from "../../../../../api/user.api";
import styles from '../../../../../asset/styles/Modal.Commodities.module.css';
import ImageUpload from "../ImageUpload/ImageUpload";
import SelectAutoWidth from "../Selctor/Selctor";
import MinHeightTextarea from "../Textarea/TextArea";
import store from "../../../../../redux/store";
import {getCommoditis} from "../../../../../redux/actions/add.action";
import {toast} from "react-toastify";
import {AiFillCloseCircle} from "react-icons/all";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 1,

};

export default function AddModal(props) {
    const [open, setOpen] = React.useState(false);
    const [images,setImages]=React.useState([])
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const formRef = useRef();
    const navigate = useNavigate();


    const addCatgory = async (e) => {

        if(e.target.value){
            if(window.confirm(`    دسته ${e.target.value}  اضافه شود؟ `)){
                try {
                    let catgory ={"name":e.target.value}
                    const response = await api.post("/category",catgory);
                } catch (e) {
                    toast.error("دسته بندي اضافه نشد");
                }
            }else {
                e.target.value=""
            }
        }
    }







    const addHandelear = async (e) => {
        e.preventDefault()
        const date = new Date(0)
        const form = new FormData(e.target);
        const data = Object.fromEntries(form);

        let commoditi = {
            "brand": data.brand,
            "image":images,
            "thumbnail": images[0],
            "price": data.price,
            "count": data.count,
            "createdAt": date,
            "tozih":data.tozih,
            "off":data.off,
            "category": {
                "group": data.group,
                "name": data.name,
                "icon": images[0]
            }
        }
        try {
            const response = await api.post("/products", commoditi);
            toast.success("کالا با موفقیت اضافه شد");
            store.dispatch(getCommoditis(commoditi))
        } catch (e) {
            toast.error("کالا اضافه نشد");
        }
        props.func()
        handleClose()
    }
    const handleSubmit = async (e) => {
        try {
            const response = await api.login(e);
            navigate(PATHS.COMMODITIES)
        } catch (e) {
            alert("اکانت وجود ندارد")
        }
    };
    return (
        <div>
            <Button onClick={handleOpen} variant="contained" color="success" size="small" style={{
                height: "2rem",
                width: "9rem",
                marginTop: "1rem",
                marginLeft: "-1.5rem",
                background: "#060638"
            }}>افزودن كالا</Button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <div className={styles.modalContaner}>
                            <div className={styles.header}><h5>افزودن</h5><span><AiFillCloseCircle onClick={handleClose}/></span></div>
                            <form className={styles.main} onSubmit={addHandelear}>
                                <ImageUpload func={setImages}/>
                                <div style={{display: "flex", flexDirection: "column", margin: "0.5rem 0"}}>
                                    <label htmlFor={"commoditiName"}>نام كالا:</label>
                                    <input name={"name"} id={"commoditiName"}/>
                                </div>
                                <SelectAutoWidth func={addCatgory}/>
                                <div style={{display: "flex", flexDirection: "column", margin: "0.5rem 0"}}>
                                    <label htmlFor={"brand"}>شركت:</label>
                                    <input name={"brand"} id={"brand"}/>
                                </div>

                                <div className={styles.rowInpu}>
                                    <div className={styles.rowInputs}>
                                        <label htmlFor={"price"}>قيمت :</label>
                                        <input id={"price"}  type="number" name="price" min="1"  />
                                    </div>

                                    <div className={styles.rowInputs}>
                                        <label htmlFor={"count"}>تعداد:</label>
                                        <input id={"count"}  type="number" name="count" min="1" />
                                    </div>

                                    <div className={styles.rowInputs}>
                                        <label htmlFor={"off"}>تخفيف:</label>
                                        <input id={"off"}  type="number" name="off" min="0" max="100"/>
                                    </div>

                                </div>
                                <MinHeightTextarea/>
                                <Button type={"submit"} variant="contained" color="success" size="small" style={{
                                    height: "2rem",
                                    width: "9rem",
                                    marginTop: "1rem",
                                    marginLeft: "-1.5rem",
                                    background: "#060638"
                                }}>ذخيره</Button>
                            </form>
                        </div>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}