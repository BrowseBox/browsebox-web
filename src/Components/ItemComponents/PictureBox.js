import React, { useState } from 'react';
import styled from 'styled-components';
import { Box, IconButton } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
import Dropzone from 'react-dropzone';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledBox = styled(Box)`
  width: calc(25% - 16px);
  height: 200px;
  border: 1px dashed #c4c4c4;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 4px;
  right: 4px;
`;

const PictureBox = ({ onFileUpload }) => {
    const [files, setFiles] = useState([]);

    const handleFileDrop = (acceptedFiles) => {
        const validFiles = acceptedFiles.filter(file => (
            file.size <= 100000 && (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif')
        ));
        setFiles(validFiles);
        onFileUpload(validFiles);
    }

    const handleFileDelete = (fileIndex) => {
        const updatedFiles = [...files];
        updatedFiles.splice(fileIndex, 1);
        setFiles(updatedFiles);
        onFileUpload(updatedFiles);
    }

    return (
        <Container>
            {[...Array(4)].map((_, index) => {
                const file = files[index];
                return (
                    <Dropzone key={index} onDrop={handleFileDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <StyledBox {...getRootProps()}>
                                {file ? (
                                    <>
                                        <Image src={URL.createObjectURL(file)} alt={`Uploaded file ${index + 1}`} />
                                        <StyledIconButton onClick={() => handleFileDelete(index)}>
                                            {/*<Delete />*/}
                                        </StyledIconButton>
                                    </>
                                ) : (
                                    <div>
                                        <input {...getInputProps()} />
                                        <p>Drag and drop a JPG, PNG or GIF file (max 100KB)</p>
                                    </div>
                                )}
                            </StyledBox>
                        )}
                    </Dropzone>
                )
            })}
        </Container>
    );
};

export default PictureBox;
