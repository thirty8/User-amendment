import React from 'react';
import { Modal } from '@mantine/core';
import Button from './Button';

const CustomModal = ({ opened, onClose, title, children, actionButtonLabel, preview, previewchange, withCloseButton, onAction, headerDescription, handleClose, size, style}) => {
  return (
    <Modal 
      opened={opened} 
      onClose={handleClose} // Changed from onClose to handleClose since that's the prop being used
      title={title} 
      withCloseButton={withCloseButton} 
      centered 
      size={size} 
      style={style}
      closeOnClickOutside={true}
    > 
        <div className="flex bg-blue-900 items-center justify-between mb-6 rounded-md">
          <div className=" text-white font-bold p-2 px-2 rounded-md uppercase">
            {/* STATIC DATA AMENDMENT */}
            {headerDescription}
          </div>
          <div
            className=" text-white font-bold p-2 px-2 rounded-md uppercase cursor-pointer rounded-full"
            onClick={handleClose}
          >
            x
          </div>
        </div>
      <div>{children}</div>
      <div style={{ marginTop: 20, textAlign: 'right' }} className='flex items-center justify-between'>
        <Button onClick={preview} variant="outline" style={{ marginRight: 10 }}>{previewchange}</Button>
        {/* <Button onClick={onAction}>{actionButtonLabel}</Button> */}
      </div>
    </Modal>
  );
};

export default CustomModal;
