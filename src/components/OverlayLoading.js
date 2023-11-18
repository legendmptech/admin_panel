import React from 'react'
import { useSelector } from 'react-redux';
import { getUILoading } from '../store/ui';

const OverlayLoading = () => {
    const ispageLoading = useSelector(getUILoading)
    return (
        <div class="">
            {ispageLoading && <div className='w-full h-screen flex flex-col absolute top-0 left-0 z-50 bg-transparent'>
            </div>}
        </div>
    );
};

export default OverlayLoading;