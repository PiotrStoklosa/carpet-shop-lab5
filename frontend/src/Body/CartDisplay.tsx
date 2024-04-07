import React, {useContext, useState} from 'react';

import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {CartCarpet, CartContext} from "./Cart";
import BackArrow from "./BackArrow";
import {Button, TextField} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import {NavLink} from 'react-router-dom';
import axios from "axios";

interface Order {
    shippingAddress: string;
    email: string;
    blik: string;
    cart: CartCarpet[];
}

const CartDisplay: React.FC = () => {
    const {carpets, removeFromCarpets, addToCarpets, resetCart} = useContext(CartContext);

    const [shippingAddress, setShippingAddress] = useState('');
    const [email, setEmail] = useState('');
    const [blik, setBlik] = useState('');


    function handleCart() {
        resetCart();
        const order: Order = {
            shippingAddress: shippingAddress,
            email: email,
            blik: blik,
            cart: carpets
        };

        axios.post('http://localhost:8080/carpets/order', order).then(response => {
            console.log('Response:', response.data);
        })
    }

    const calculateTotalPrice = (): number => {
        let totalPrice = 0;

        carpets.forEach((c) => {
            const {carpet, quantity} = c;
            const price = carpet.Price * quantity || 0;

            totalPrice += price;
        });

        return totalPrice;
    };

    return (

        <div>
            <BackArrow/>
            <Typography variant="h6" gutterBottom>
                Shopping Cart
            </Typography>

            {carpets.length === 0 ? (
                <Typography>Your cart is empty.</Typography>
            ) : (
                <List>
                    {carpets.map((carpet: CartCarpet) => (
                        <ListItem key={carpet.carpet.ID}>
                            <ListItemText
                                primary={`${carpet.carpet.Description}, Carpet ID: ${carpet.carpet.ID}`}
                                secondary={`Quantity: ${carpet.quantity}, ${carpet.quantity * carpet.carpet.Price} PLN`}
                            />
                            <IconButton
                                color="primary"
                                onClick={() => removeFromCarpets(carpet.carpet.ID)}
                                style={{color: '#684C38'}}
                            >
                                <RemoveIcon/>
                            </IconButton> <IconButton
                            color="primary"
                            onClick={() => addToCarpets(carpet.carpet)}
                            style={{color: '#684C38'}}
                        >
                            <AddIcon/>
                        </IconButton><img
                            src={`${process.env.PUBLIC_URL}/pictures/${carpet.carpet.Image}`}
                            alt={`Carpet ${carpet.carpet.ID}`}
                            style={{maxWidth: '100px', maxHeight: '100px'}}
                        />
                        </ListItem>

                    ))}
                </List>
            )
            }
            {carpets.length !== 0 && (
                <>
                    <p>{calculateTotalPrice()} PLN</p>
                    <TextField
                        label="Shipping Address"
                        variant="outlined"
                        fullWidth
                        value={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        style={{margin: '10px 0'}}
                    />

                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{margin: '10px 0'}}
                    />
                    <TextField
                        label="Blik"
                        variant="outlined"
                        fullWidth
                        value={blik}
                        onChange={(e) => setBlik(e.target.value)}
                        style={{margin: '10px 0'}}
                    />
                    <NavLink to={'/thankyou'} style={{textDecoration: 'none'}}>
                        <Button
                            variant="contained"
                            style={{backgroundColor: '#684C38'}}
                            onClick={handleCart}
                        >
                            KUP
                        </Button>
                    </NavLink>
                </>
            )}

        </div>
    )
        ;
};

export default CartDisplay;