import {IS_LOGGED_IN} from "../../../configs/variables.config";
import {Navigate} from "react-router-dom";
import {PATHS} from "../../../configs/routes.config";
import {MainLayout} from "../../../layout/Main.layout";

const Protected = (props) => {
    const Page = props.page
    const haslogin = props.haslogin
    const isLoggedIn = localStorage.getItem(IS_LOGGED_IN) === 'true';
    if (isLoggedIn) {
        return <Navigate replace to={PATHS.COMMODITIES} />
    }

    return (
        <>
            {Page}
        </>
    );
}

export {Protected}