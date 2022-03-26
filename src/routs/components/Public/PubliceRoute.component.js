import { MainLayout } from "../../../layout/Main.layout";

const PublicRoute = (props) => {
    const Page = props.page
    const haslogin = props.haslogin

    return ( 
        <>

        {/*{haslogin ? (*/}
            <MainLayout haslogin={1}>{Page}</MainLayout>
        {/*) : Page*/}
        {/*}*/}
            
            
        </>
     );
}
 
export  {PublicRoute};