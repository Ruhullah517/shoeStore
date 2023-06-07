import { BrowserRouter, Routes ,Route} from "react-router-dom";
import CreateAds from "../Components/createAd/createAd";
import Dashboard from "../Components/dashboard/dashboard";
import SideBar from "../Components/dashboard/sidebar";
import Users from "../Components/users/users";
import ProductsList from "../Components/productsList/productsList";
import ErrorPage from "../Components/errorPage/errorPage";
import Transactions from "../Components/transactions/transactions";
import EditForm from "../Components/productsList/editForm";

function Admin() {
    return <>
        <BrowserRouter>
        <SideBar />
            <Routes>
                <Route path ='/createAd' element={<CreateAds />} />
                <Route path ='/dashboard' element={<Dashboard />} />
                <Route path ='/users' element={<Users />} />
                <Route path ='/productsList' element={<ProductsList />} />
                <Route path ='/transactions' element={<Transactions />} />
                <Route path ='/editForm/:id' element={<EditForm />} />
                <Route path ='*' element={<ErrorPage />} />
            </Routes>
        </BrowserRouter></>
};



export default Admin;