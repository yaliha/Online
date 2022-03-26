import * as React from 'react';
import {useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import * as yup from 'yup';
import {useFormik} from "formik";
import * as api from '../../api/user.api';
import {PATHS} from '../../configs/routes.config';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import logo from '../../asset/images/logo-removebg-preview.png';
import style from '../../asset/styles/Login.page.module.css'


const validationSchema = yup.object({
    username: yup
        .string('نام کاربری را وارد کنید')
        .min(4, 'نام کاربری باید بیشتر از 4 کارکتر باشد')
        .required('نام کاربری اجباری میباشد'),
    password: yup
        .string('رمزعبور را وارد کنید')
        .min(4, 'رمزعبور باید بیشتر از 4 کارکتر باشد')
        .required('رمزعبور اجباری میباشد'),
});

const Login = (props) => {
    const formRef = useRef();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try {
            const response = await api.login(e);
            navigate(PATHS.COMMODITIES);
        } catch (e) {
            alert("اکانت وجود ندارد")
        }

    };
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: (e) => {
            handleSubmit(e)
        },
    });


    return (
        <div className={style.login}>
            <Container component="main" maxWidth="xs" className={style.container} dir="rtl" align="right">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <img src={logo} className={style.logoPic}/>
                    <Typography component="h1" variant="h5">
                        ورود به پنل مدیریت
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            dir="rtl"
                            align="right"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="نام کاربری"
                            autoComplete="username"
                            name="username"
                            autoFocus
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="رمز عبور"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            ورود
                        </Button>
                    </Box>
                    <Link top={PATHS.HOME}>بازگشت</Link>
                </Box>
            </Container>
        </div>
    );
}


export {Login};

















