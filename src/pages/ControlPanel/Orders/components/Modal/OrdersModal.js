import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from '../../../../../asset/styles/Modal.Orders.module.css';
import * as moment from "jalali-moment";
import OrderTable from "../Table/OrderTable";
import * as api from "../../../../../api/user.api";
import {AiFillCloseCircle} from "react-icons/all";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "auto",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    direction:"rtl"
};

export default function OrdersModal(props) {
    let data=props.data;
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const chageOrderStatus = async (e) => {
        const date = new Date().setMilliseconds(0)
        data.DeliveryTime=date;
        data.OrderStatus="Delivered"
        try {
            const response = await api.put("/orders/"+data.id,data)
            props.func(false)
        }catch (e) {

        }
    }

    return (
        <div>
            <Button autoFocus onClick={handleOpen} align="right" >
                بررسي سفارش
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className={styles.header}><h3>سفارش</h3><span><AiFillCloseCircle onClick={handleClose}/></span></div>
                    <div className={styles.infoBox}>
                        <div className={styles.minInfoBox}>  <div className={styles.txtData}><span>نام مشتري : </span><span>{data.fristName+"_"+data.lastName}</span></div>
                            <div className={styles.txtData}><span>آدرس :</span><span>{data.Address}</span></div>
                            <div className={styles.txtData}><span>تلفن:</span><span>{data.phone}</span></div></div>
                        <div className={styles.minInfoBox}> <div className={styles.txtData}><span>پرداختي:</span><span>{data.TotalPrice}</span></div>
                            <div className={styles.txtData}><span>زمان تحويل : </span><span>{moment(data.DeliveryTime).locale('fa').format('YYYY/MM/DD')}</span></div>
                            <div className={styles.txtData}><span> زمان سفارش :</span><span>{moment(data.OrderTime).locale('fa').format('YYYY/MM/DD')}</span></div>
                        </div>


                        
                    </div>
                    <div className={styles.table} style={{maxHeight:"375px"}}><OrderTable valu={data.Basket}/></div>
                    <div style={{display: "flex",justifyContent:"center",marginTop:"1rem"}}>{data.OrderStatus=="Waiting"?<Button onClick={chageOrderStatus} variant="contained" color="success" align="center">تحويل شد</Button>:<><span>زمان تحويل : </span><span>{moment(data.DeliveryTime).locale('fa').format('YYYY/MM/DD')}</span></> }</div>

                </Box>
            </Modal>
        </div>
    );
}