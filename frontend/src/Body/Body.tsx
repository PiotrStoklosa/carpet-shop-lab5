import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {Card, CardContent, CardMedia, Grid} from "@mui/material";
import Typography from "@mui/material/Typography";
import {NavLink} from "react-router-dom";

export interface Carpet {
    ID: string,
    Shape: string,
    Color: string,
    Material: string,
    Image: string,
    Description: string,
    Price: number
}


const Body: React.FC = () => {

    const [data, setData] = useState<Carpet[]>([]);
    const [carpetURL] = useState<string>('http://localhost:8080/carpets');

    useEffect(() => {
        (async () => {
            try {
                setData((await axios.get(carpetURL)).data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [carpetURL]);
    return (
        <>
            <Grid container spacing={3} style={{paddingTop: '40px'}}>
                {data.map((card) => (
                    <Grid item key={card.ID as React.Key} xs={12} sm={4} md={3}>
                        <NavLink to={'/item/' + card.ID} style={{textDecoration: 'none'}}>
                            <Card className="card">
                                <CardMedia
                                    component="img"
                                    height="140"
                                    width="120"
                                    image={`pictures/${card.Image}`}
                                    alt={`${card.Description}`}
                                />
                                <CardContent>
                                    <Typography variant="h4" component="div">
                                        {card.Description}
                                    </Typography>
                                    <Typography variant="h6" component="div">
                                        {card.Price} PLN
                                    </Typography>
                                </CardContent>
                            </Card>
                        </NavLink>
                    </Grid>
                ))}
            </Grid>
        </>
    )
        ;
};

export default Body;