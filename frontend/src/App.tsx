import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Footer from "./FooterBar/Footer";
import MenuAppBar from "./NavBar/NavigationBar";
import Body from "./Body/Body";
import CarpetItemView from "./Body/CarpetItemView";
import {CartContextProvider} from "./Body/Cart";
import CartDisplay from "./Body/CartDisplay";
import {ThankYouPage} from "./Body/Thankyoupage";


function App() {
    return (
        <CartContextProvider>
            <Router>
                <header>
                    <MenuAppBar/>
                </header>
                <div style={{background: '#ecf0f1'}}>
                    <div
                        style={{
                            minHeight: '85vh',
                            maxWidth: '50%',
                            margin: '0 auto',
                            padding: '30px'
                        }}
                    >

                        <Routes>
                            <Route path="/" element={<Body/>}/>
                            <Route
                                path="/item/:itemID"
                                element={<CarpetItemView/>}
                            />
                            <Route
                                path="/cart"
                                element={<CartDisplay/>}
                            />
                            <Route
                                path="/thankyou"
                                element={<ThankYouPage/>}
                            />
                        </Routes>

                    </div>
                </div>
            </Router>
            <footer style={{background: '#3498DB', bottom: '0', fontSize: '12px'}}>
                <Footer/>
            </footer>
        </CartContextProvider>
    );
}

export default App;
