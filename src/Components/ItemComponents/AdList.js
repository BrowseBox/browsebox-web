import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import styled from 'styled-components';
import Congratulations from './Congratulations';
import EditItemModal from './EditItemModal';
import ViewAdModal from "./ViewAdModal";
import No_image_available from '../../Media/No_Image_Available.jpg';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`;

const AdList = styled.div`
    display: flex;
    align-items: center;
    padding: 16px;
    background-color: #f7f7f7;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-bottom: 24px;
    width: 60%
`;

const AdImage = styled.img`
    width: 120px;
    height: 120px;
    margin-right: 24px;
    border-radius: 8px;
    object-fit: cover;
`;

const AdContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    cursor: pointer;
`;

const AdTitle = styled(Typography)`
    font-weight: 600;
    font-size: 1.1rem;
    margin-bottom: 8px;
`;

const AdDescription = styled(Typography)`
    font-size: 0.9rem;
    margin-bottom: 12px;
    color: #555;
`;

const AdPrice = styled(Typography)`
    font-weight: 600;
    font-size: 1.1rem;
    color: #4caf50;
`;

const AdActions = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const EditButton = styled(Button)`
    margin-bottom: 8px;
    &:hover {
        background-color: #1976d2;
    }
`;

const DeleteButton = styled(Button)`
    color: #f44336;
    &:hover {
        color: #d32f2f;
    }
`;

const Ad = ({ad}) => {

    const [showCongratulations, setShowCongratulations] = useState(false);
    const [showEditModalOpen, setIsEditModalOpen] = useState(false);
    const [showViewAdModalOpen, setIsViewAdModalOpen] = useState(false);

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

    const handleIsViewAdModalOpen = () => {
        setIsViewAdModalOpen(true);
    }

    const handleCloseViewAdModal = () => {
        setIsViewAdModalOpen(false);
    }

    // const placeholderImage = 'https://via.placeholder.com/150';
    return (
        <PageContainer>
        <AdList>
            {/*<AdImage src={ad.sales_image ? ad.sales_image : placeholderImage} alt="Ad" />*/}
            {/*<AdImage src={image ? image : placeholderImage} alt="Ad" />*/}
            <AdImage src={ad.sale_image ? ad.sale_image : No_image_available } alt="Ad"  />
            <AdContent onClick={handleIsViewAdModalOpen}>
                <div>
                    <AdTitle variant="h6" >{ad.sale_name}</AdTitle>
                    <AdDescription variant="body1">{ad.sale_description}</AdDescription>
                </div>
                <AdPrice variant="h6">${ad.sale_price}</AdPrice>
            </AdContent>
            <AdActions>
                <EditButton variant="contained" color="primary" onClick={handleIsEditModalOpen}>
                    Edit
                </EditButton>
                <DeleteButton variant="text" onClick={handleDeleteButtonClick}>
                    Delete
                </DeleteButton>
                <Congratulations trigger={showCongratulations} onClose={handleCloseCongratulations} id={ad.sale_id} />
                <EditItemModal trigger={showEditModalOpen} onClose={handleCloseEditModalOpen} id={ad.sale_id} />
                <ViewAdModal trigger={showViewAdModalOpen} onClose={handleCloseViewAdModal} id={ad.sale_id} />
            </AdActions>
        </AdList>
        </PageContainer>
    );
};

export default Ad;
