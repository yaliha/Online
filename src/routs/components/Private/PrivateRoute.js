import { MainLayout } from "../../../layout/Main.layout";
import {IS_LOGGED_IN} from '../../../configs/variables.config';
import {Navigate} from "react-router-dom";
import {PATHS} from '../../../configs/routes.config';


const PrivateRoteute = (props) => {
    const Page = props.page
    const haslogin = props.haslogin
    const isLoggedIn = localStorage.getItem(IS_LOGGED_IN) === 'true';
    if (!isLoggedIn) {
        return <Navigate replace to={PATHS.LOGIN} />
    }

    return (
        <>
                <MainLayout haslogin={haslogin}>{Page}</MainLayout>
        </>
    );
}

export {PrivateRoteute}