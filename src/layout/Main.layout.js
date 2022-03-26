import CustomerHedar from "./customerHedar/customerHedar";
import AdmiHedar from "./adminHeder/admiHedar";
const MainLayout = (props) => {
    return ( 
        <>
            {props.haslogin==1?<CustomerHedar/>: <AdmiHedar/>   }
            {props.children}
        </>
     );
}
 
export {MainLayout};