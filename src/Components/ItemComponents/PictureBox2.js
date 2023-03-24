import React from 'react';
import styled from 'styled-components';
import { Grid, Typography, Paper } from '@mui/material';

const Box = styled.div`
    height: 100px;
    width: 100px;
    background-color: lightgrey;
    margin-right: 8px;
`;

const Root = styled(Paper)`
  padding: 16px;
  margin: 16px;
`;

const PictureBox2 = () => {
    return (
        <Root>
            <Typography variant="h5" gutterBottom>
                Add photos to attract interest to your ad
            </Typography>
            <Grid container spacing={2}>
                {[1, 2, 3, 4, 5].map((box) => (
                    <Grid item key={box}>
                        <Box />
                    </Grid>
                ))}
            </Grid>
        </Root>
    );
};

export default PictureBox2;

