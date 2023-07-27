import React from "react";
import Login from "./components/Login/Login";
import SignUpForm from "./components/SignupPage/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomerPage from "./components/Customer/customer";
import VendorPage from "./components/Vendorpage/Vendor";
import AdminPage from "./components/Admin/Adminpage";
import PendingPage from "./components/Admin/pendingpage";
import VendorProductPage from "./components/Vendorpage/VendorProduct";
import Productdetail from "./components/ProductDetail/productpage";
import Profile from "./components/Profile/profile";
import OrderHistory from "./components/Historyorder/Historyorder";
import "./App.css";
import { Navigate } from "react-router-dom";
import OrdersPage from "./components/Orders/Orders";
import CartPage from "./components/Cart/Cartpage";
import ProfileList from "./components/Vendorlist/Vendorlist";
import { Provider } from "react-redux"; // Import the Provider
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import { Store, persistor } from "./store";
import { Toaster } from "sonner";
import { connectStorageEmulator } from "firebase/storage";
const isLoggedIn = localStorage.getItem("loggedin");
function App() {
  console.log(isLoggedIn);

  return (
    
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
      <Toaster/>
        <div className="app">
         
          <BrowserRouter>
            <Routes>   
              <Route element={<SignUpForm />} path="/"></Route>
              <Route element={<Login />} path="/login"></Route>
              <Route
                element={
                  isLoggedIn == "true" ? (
                    <CustomerPage />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
                path="/customer"
              />
              <Route
                element={
                  isLoggedIn == "true" ? (
                    <VendorPage />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
                path="/vendor"
              />
              <Route
                element={
                  isLoggedIn == "true" ? (
                    <AdminPage />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
                path="/admin"
              />
              <Route
                element={
                  isLoggedIn == "true" ? (
                    <PendingPage />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
                path="/pending"
              />
              <Route
                element={
                  isLoggedIn == "true" ? (
                    <VendorProductPage />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
                path="/myproducts"
              />
              <Route
                element={
                  isLoggedIn == "true" ? (
                    <Productdetail />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
                path="/productdetail"
              />
              <Route
                element={
                  isLoggedIn == "true" ? <Profile /> : <Navigate to="/login" />
                }
                path="/profile"
              />
              <Route
                element={
                  isLoggedIn == "true" ? (
                    <OrdersPage />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
                path="/orders"
              />
              <Route
                element={
                  isLoggedIn == "true" ? <CartPage /> : <Navigate to="/login" />
                }
                path="/cart"
              />
              <Route
                element={
                  isLoggedIn == "true" ? (
                    <OrderHistory />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
                path="/orderhistory"
              />
              <Route
                element={
                  isLoggedIn == "true" ? (
                    <ProfileList />
                  ) : (
                    <Navigate to="/login" />
                  )
                }
                path="/vendorprofile"
              />
            </Routes>
          </BrowserRouter>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
