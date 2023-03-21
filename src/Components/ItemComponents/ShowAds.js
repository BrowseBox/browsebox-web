import React from 'react';
import Ad from './AdList';

const sampleData = [
    {
        id: 1,
        title: 'Car for Sale',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: 5000,
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 2,
        title: 'Bike for Sale',
        description: 'Nulla facilisi. Aenean sit amet dui at lacus porttitor faucibus.',
        price: 800,
        image: 'https://via.placeholder.com/150',
    },
    {
        id: 3,
        title: 'House for Sale',
        description: 'Vestibulum in enim in nisi euismod volutpat at at velit.',
        price: 300000,
        image: 'https://via.placeholder.com/150',
    },
];

const ShowAds = () => {
    return (
        <div>
            {sampleData.map((ad) => (
                <Ad key={ad.id} ad={ad} />
            ))}

            {/*<Ad ads={sampleData} />            */}

        </div>
    );

}

export default ShowAds;
