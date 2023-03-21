import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';

const AdList = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
`;

const AdImage = styled.img`
  width: 120px;
  height: 120px;
  margin-right: 16px;
`;

const AdContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const AdTitle = styled(Typography)`
  font-weight: bold;
  margin-bottom: 8px;
`;

const AdDescription = styled(Typography)`
  margin-bottom: 8px;
`;

const AdPrice = styled(Typography)`
  font-weight: bold;
`;

const AdActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const EditButton = styled(Button)`
  margin-bottom: 8px;
`;

const DeleteButton = styled(Button)`
  color: red;
`;

const Ad = ({ ad }) => {
    return (
        <AdList>
            <AdImage src={ad.image} alt={ad.title} />
            <AdContent>
                <div>
                    <AdTitle variant="h6">{ad.title}</AdTitle>
                    <AdDescription variant="body1">{ad.description}</AdDescription>
                </div>
                <AdPrice variant="h6">${ad.price}</AdPrice>
            </AdContent>
            <AdActions>
                <EditButton variant="contained" color="primary">
                    Edit
                </EditButton>
                <DeleteButton variant="text">Delete</DeleteButton>
            </AdActions>
        </AdList>
    );
};

export default Ad;
