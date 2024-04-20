import React, {useContext, useEffect, useState} from 'react';
import {CartContext} from "./Cart";
import {Card, CardContent, CardMedia} from "@mui/material";
import Typography from "@mui/material/Typography";
import axios from "axios";
import {Carpet} from "./Body";
import {useParams} from 'react-router-dom';
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import BackArrow from "./BackArrow";

const defaultCarpet: Carpet = {
    ID: "",
    Shape: "",
    Color: "",
    Material: "",
    Image: "",
    Description: "",
    Price: 0
}

const CarpetItemView: React.FC = () => {


    const {itemID} = useParams();
    const item: string = itemID!;
    const {addToCarpets} = useContext(CartContext);
    const [carpet, setCarpet] = useState<Carpet>(defaultCarpet);

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get('http://localhost:8080/carpets/' + item);
                setCarpet(response.data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [item]);

    return (
        <div>
            <BackArrow/>

            <Card className="card">
                <CardMedia
                    component="img"
                    height="250"
                    width="120"
                    image={`${process.env.PUBLIC_URL}/pictures/${carpet.Image}`}
                    style={{objectFit: 'contain'}}
                />
                <CardContent>
                    <Typography variant="h4" color="div">
                        {carpet.Description}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {carpet.Material}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {carpet.Shape}
                    </Typography>
                    <Typography variant="h6" component="div">
                        {carpet.Price} PLN
                    </Typography>
                    <Typography style={{textAlign: 'right'}}>
                        <IconButton
                            size="large"
                            color="inherit"
                            onClick={() => {
                                addToCarpets(carpet);
                            }}
                        ><ShoppingCartIcon/>
                        </IconButton>
                    </Typography>

                </CardContent>
            </Card>
        </div>
    );
};

export default CarpetItemView;