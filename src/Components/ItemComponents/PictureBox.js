import React, {useState, useCallback, useEffect} from 'react';
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';

const DropzoneContainer = styled.div`
    width: 300px;
    height: 300px;
    border: 2px dashed #666;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
`;

const DeleteButton = styled.button`
    margin-top: 16px;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const PictureBox = ({ initialImage, onImageChange }) => {
    const [image, setImage] = useState(null);

    useEffect(() => {
        setImage(initialImage);
    }, [initialImage]);

    const onDrop = useCallback((acceptedFiles) => {
        if (acceptedFiles.length === 0) return;
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
            setImage(reader.result);
            onImageChange(file);
        };
        reader.readAsDataURL(file);
    }, [onImageChange]);

    const maxSize = 2 * 1024 * 1024;
    const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
        onDrop,
        // accept: 'image/*',
        accept: 'image/jpeg, image/png, image/gif, image/bmp',
        minSize: 0,
        maxSize,
    });

    const deleteImage = () => {
        setImage(null);
        onImageChange(null);
    };

    return (
        <div>
            <DropzoneContainer {...getRootProps()}>
                <input {...getInputProps()} />
                {/*{isDragActive ? (*/}
                {/*    <p>Drop the image here...</p>*/}
                {/*) : isDragReject ? (*/}
                {/*    <p>File rejected. Please upload an image under 2MB.</p>*/}
                {/*) : (*/}
                {/*    <p>Drag and drop an image here, or click to select a file (max 2MB)</p>*/}
                {/*)}*/}
                {image && <ImagePreview src={image} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>}
            </DropzoneContainer>
            {image && (
                <DeleteButton onClick={deleteImage}>Delete Image</DeleteButton>
            )}
        </div>
    );
};

export default PictureBox;
