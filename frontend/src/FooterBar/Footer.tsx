import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import {Container} from '@mui/system';
import {Link} from '@mui/material';

const linkHover = {
    '&:hover': {
        color: '#987C68',
    },
};

export default function Footer() {
    return (
        <Box
            px={{xs: 3, sm: 4}}
            py={{xs: 5, sm: 4}}
            bgcolor="684C38"
            color="white"
        >
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={2} sx={{borderColor: '#482C18'}}>
                            Help
                        </Box>
                        <Box>
                            <Link
                                href="/contact"
                                color="inherit"
                                underline="none"
                                sx={linkHover}
                            >
                                Contact
                            </Link>
                        </Box>
                        <Box>
                            <Link
                                href="/support"
                                color="inherit"
                                underline="none"
                                sx={linkHover}
                            >
                                Support
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={2} sx={{borderColor: '#482C18'}}>
                            Collaboration
                        </Box>
                        <Box>
                            <Link
                                href="/colaboration/information"
                                color="inherit"
                                underline="none"
                                sx={linkHover}
                            >
                                Information
                            </Link>
                        </Box>
                        <Box>
                            <Link
                                href="/contact#collaboration"
                                color="inherit"
                                underline="none"
                                sx={linkHover}
                            >
                                Contact
                            </Link>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Box borderBottom={2} sx={{borderColor: '#482C18'}}>
                            Report a problem
                        </Box>
                        <Box>
                            <Link
                                href="/contact#problem"
                                color="inherit"
                                underline="none"
                                sx={linkHover}
                            >
                                Contact
                            </Link>
                        </Box>
                    </Grid>
                </Grid>
                <Box textAlign="center" pt={{xs: 5, sm: 2}} pb={{xs: 5, sm: 0}}>
                    Carpet shop &reg; {new Date().getFullYear()}
                </Box>
            </Container>
        </Box>
    );
}
