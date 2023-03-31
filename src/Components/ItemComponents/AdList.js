import React, {useState} from 'react';
import { Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import Congratulations from "./Congratulations";
import EditItemModal from "./EditItemModal";

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
    const [showCongratulations, setShowCongratulations] = useState(false);
    const [showEditModalOpen, setIsEditModalOpen] = useState(false);

    const handleDeleteButtonClick = () => {
        setShowCongratulations(true);
    };

    const handleCloseCongratulations = () => {
        setShowCongratulations(false);
        window.location.reload();
    };

    const handleIsEditModalOpen = () => {
        setIsEditModalOpen(true);
    };

    const handleCloseEditModalOpen = () => {
        setIsEditModalOpen(false);
        window.location.reload();
    };

    const placeholderImage = "https://via.placeholder.com/150";
    return (
        <AdList>
            <AdImage src={ad.sales_image ? ad.sales_image : placeholderImage} alt="Ad" />
            <AdContent>
                <div>
                    <AdTitle variant="h6">{ad.sale_name}</AdTitle>
                    <AdDescription variant="body1">{ad.sale_description}</AdDescription>
                </div>
                <AdPrice variant="h6">${ad.sale_price}</AdPrice>
            </AdContent>
            <AdActions>
                <EditButton variant="contained" color="primary" onClick={handleIsEditModalOpen}>
                    Edit
                </EditButton>
                <DeleteButton variant="text" onClick={handleDeleteButtonClick}>Delete</DeleteButton>
                <Congratulations trigger={showCongratulations} onClose={handleCloseCongratulations} id={ad.sale_id} />
                <EditItemModal trigger={showEditModalOpen} onClose={handleCloseEditModalOpen} id={ad.sale_id} />
            </AdActions>
        </AdList>
    );
};

export default Ad;
