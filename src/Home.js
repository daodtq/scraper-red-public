import { Button } from '@mui/material';
import React, { useEffect } from 'react';
import ConvertTiktok from './ConvertTikTok';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
function Home() {
    const dispatch = useDispatch()
    const email = useSelector((state) => state.user.email);
    const productList = useSelector(state => state.user.list)
    const [activeTab, setActiveTab] = useState('Option1');
    return (
        <div>
            {/* {email == "trong.quang.dao@gmail.com" ? <div className='box-center'><div className="tabs">
                <Button sx={{ margin: "5px", border: "2px solid #000", borderRadius: "8px", background: "white" }} variant="outlined" onClick={() => setActiveTab('Option1')}>Convert TikTok</Button>
            </div>
                {activeTab === 'Option1' ? <ConvertTiktok /> : null}</div> :
                <ConvertTiktok />} */}
                <ConvertTiktok />
        </div>
    );
}

export default Home;
