import React, {Component} from 'react';
import Mapa from "./Map";
import {useFormik} from "formik";
import * as yup from 'yup';
import store from "../../redux/store";
import {BASKET, ORDER} from "../../configs/variables.config";
import {PAYMENT} from "../../configs/url.config";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import Box from '@mui/material/Box';
import {Button} from "@mui/material";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import {BiBasket, BsCardChecklist, MdPayment} from "react-icons/all";
import Radio from "@mui/material/Radio";
import style from '../../asset/styles/Shoping.module.css'





const theme = createTheme({
    direction: 'rtl',
});
const cacheRtl = createCache({
    key: 'muirtl',
});


const validationSchema = yup.object({
    phone: yup

        .string('شماره را وارد کنید')
        .matches("[0]{1}[9]{1}[0-9]{9}", 'شماره صحیح نیست ')
        // .min(11, 'شماره صحیح نیست ')
        .required('شماره اجباری میباشد'),
    city: yup
        .string('شهر را وارد کنید')
        .min(3, 'شهر باید بیشتر از 3 کارکتر باشد')
        .required('شهر اجباری میباشد'),
    state: yup
        .string('استان را وارد کنید')
        .required('استان را وارد کنید'),
    name: yup
        .string('اسم را وارد کنید')
        .min(3, 'اسم باید بیشتر از 3 کارکتر باشد')
        .required('اسم اجباری میباشد'),
    lastname: yup
        .string('نام خانوادگی را وارد کنید')
        .min(3, 'نام خانوادگی باید بیشتر از 3 کارکتر باشد')
        .required('نام خانوادگی اجباری میباشد'),
    postalCode: yup
        .string('کدپستی را وارد کنید')
        .min(6, 'کد پستی باید بیشتر از 6 رقم باشد')
        .required('کدپستی اجباری میباشد'),
});


function Shoping() {

    const [radio, setRadio] = React.useState("form")
    const [address, setAddress] = React.useState()
    const [city, setCity] = React.useState()
    const [stat, setStat] = React.useState()
    const [geo,setGeo]= React.useState()
    const handleChange = (e) => {
        setRadio(e.target.value)
    }
    const datahandeler = (e) => {
        setGeo(e.geom.coordinates)
        setAddress(e.postal_address)
        setStat(e.province)
        setCity(e.city)
        setRadio("form")
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        const form = new FormData(e.target);
        const data = Object.fromEntries(form);
        const date = new Date().setMilliseconds(0)
        let basket = localStorage.getItem(BASKET);
        window.location.href = PAYMENT
        let order = {
            "TotalPrice": store.getState().Add.price,
            "fristName": data.name,
            "lastName": data.lastname,
            "loc": data.state + "_" + data.city,
            "Address": data.Address,
            "phone": data.phone,
            "homePhone": data.phone2,
            "postalCode": data.postalCode,
            "DeliveryTtime": "",
            "OrderTime": date,
            "OrderStatus": "Waiting",
            "geom": geo ,
            "Basket": JSON.parse(basket)
        }
        localStorage.setItem(ORDER, JSON.stringify(order))
    }

    const formik = useFormik({
        initialValues: {
            phone: '',
            name: '',
            city: '',
            state: '',
            lastname: '',
            postalCode: '',
            Address:''
        },
        validationSchema: validationSchema,
        onSubmit: (e) => {

            handleSubmit(e)
        },
    });


    return (
        <>
            <CacheProvider value={cacheRtl}>
                <ThemeProvider theme={theme}>
                    <div className={style.hed}>
                        <div className={style.minBoxA}>
                            <BiBasket size={"50px"} color={"#a07042"}/>
                            <span>سبد خرید </span>
                        </div>

                        <hr className={style.line}/>
                        <div className={style.minBoxA}>
                            <BsCardChecklist size={"50px"} color={"#a07042"}/>
                            <span>اطلاعات ارسال </span>
                        </div>

                        <hr className={style.line}/>
                        <div className={style.minBox}>
                            <MdPayment size={"50px"} color={"#706f6f"}/>
                            <span>اطلاعات پرداخت </span>
                        </div>

                    </div>
                    <Box component={"form"} onSubmit={ handleSubmit} noValidate className={style.contain} dir="rtl">
                        <Box dir='rtl' className={style.right} sx={{'& > :not(style)': {m: 1, width: '45ch'},}}>
                            <h2>اطلاعات شخصی</h2>
                            <TextField name={"name"} fullWidth label="نام:" id="name" autoFocus={true}
                                       value={formik.values.name}
                                       onChange={formik.handleChange}
                                       error={formik.touched.name && Boolean(formik.errors.name)}
                                       helperText={formik.touched.name && formik.errors.name}/>
                            <TextField name={"lastname"} dir='rtl' fullWidth label="نام خانوادگی:" id="lastname"
                                       value={formik.values.lastname}
                                       onChange={formik.handleChange}
                                       error={formik.touched.lastname && Boolean(formik.errors.lastname)}
                                       helperText={formik.touched.lastname && formik.errors.lastname}/>
                            <TextField name={"phone"} dir='rtl' fullWidth label="تلفن همراه:" id="phone"
                                       value={formik.values.phone}
                                       onChange={formik.handleChange}
                                       error={formik.touched.phone && Boolean(formik.errors.phone)}
                                       helperText={formik.touched.phone && formik.errors.phone}/>
                            <TextField name={"phone2"} dir='rtl' fullWidth label="تلفن ثابت:" id="phone2"/>
                        </Box>
                        <Box dir='rtl' className={style.left}
                             sx={{'& > :not(style)': {m: 1, width: '45ch', overflowX: "hidden"},}}>
                            <h2>اطلاعات ارسال</h2>
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="controlled-radio-buttons-group"
                                value={radio}
                                onChange={handleChange}>

                                <FormControlLabel value="map" control={<Radio
                                    sx={{color: "#060638", '&.Mui-checked': {color: "#a07042"}}}/>} label="نقشه "/>
                                <FormControlLabel value="form" control={<Radio
                                    sx={{color: "#060638", '&.Mui-checked': {color: "#a07042"}}}/>} label="فرم"/>
                            </RadioGroup>
                            {radio === "form"
                                ? <>
                                    <TextField name={"state"} dir='rtl' fullWidth label="استان:" id="state" defaultValue={stat}/>
                                    <TextField name={"city"} dir='rtl' fullWidth label="شهر:" id="city" defaultValue={city}/>
                                    <TextField name={"postalCode"} fullWidth label="کدپستی:" id="postalCode"
                                               type={"number"}
                                               value={formik.values.postalCode}
                                               onChange={formik.handleChange}
                                               error={formik.touched.postalCode && Boolean(formik.errors.postalCode)}
                                               helperText={formik.touched.postalCode && formik.errors.postalCode}/>
                                    <TextField name={"Address"} fullWidth label="ادرس:" id="Address"
                                               defaultValue={address}/>
                                </>
                                : <Mapa func={[setRadio, datahandeler]}/>
                            }
                        </Box>
                        <Button type="submit"
                                sx={{margin: "2rem .7rem", width: "25rem", alignItems: "center"}}
                                variant="contained">پرداخت
                        </Button>
                    </Box>
                </ThemeProvider>
            </CacheProvider>
        </>
    );
}

export {Shoping};