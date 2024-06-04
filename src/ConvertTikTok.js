import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Checkbox, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { styled } from '@mui/system';
import React, { useState } from 'react';
import { NotificationContainer } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { editGG, getData, logout, redbubble, teepublic } from './features/slices';
import LoadingScreen from './Loading';
import Papa from "papaparse";
import { NotificationManager } from "react-notifications";
import { useEffect, useRef } from 'react';

const StyledFormControl = styled(FormControl)({
    width: 225,
});

const pageList = [
    { value: "teepublic.com" },
    { value: "redbubble.com" },
]

function ConvertTiktok() {
    const dispatch = useDispatch()
    const isLoading = useSelector((state) => state.user.isLoading);
    const test = useSelector((state) => state.user.test);
    const hash = useSelector((state) => state.user.hash);
    const time = useSelector((state) => state.user.time);
    const [checked, setChecked] = useState(false);
    const [page, setPage] = useState(pageList[0].value);
    const [link, setLink] = useState("");
    const [type, setType] = useState("link");
    const [file1, setFile1] = useState([]);
    const [from, setFrom] = useState(1);
    const [end, setEnd] = useState(1);
    const [cate, setCate] = useState("Classic T-Shirt|Premium T-Shirt");
    const handleChange = (event) => {
        setChecked(event.target.checked);
    };

    const handleCrawler = async () => {
        if (page == "teepublic.com") {
            console.log(test)
            if (test == true) {
                if ((parseInt(from) - parseInt(end)) != 0) {
                    NotificationManager.error('Tài khoản test chỉ cào được 1 page 1 lúc!', 'Error', 3000);
                    return
                }
            }
            const res = await dispatch(teepublic({ link, type, file: file1, from, end, time, checked, cate, hash }))
            if (res.payload.status == 0) {
                const response = await fetch(`${process.env?.REACT_APP_DOMAIN}/downloads`);
                const blob = await response.blob();

                // Tạo đường link tạm thời cho file
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'your-file.csv');
                document.body.appendChild(link);

                // Kích hoạt sự kiện nhấp để bắt đầu tải về
                link.click();
            }
        } else if (page == "redbubble.com") {
            const res = await dispatch(redbubble({ link, type, file: file1, from, end }))
            if (res.payload.status == 0) {
                const response = await fetch(`${process.env?.REACT_APP_DOMAIN}/downloads`);
                const blob = await response.blob();

                // Tạo đường link tạm thời cho file
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'your-file.csv');
                document.body.appendChild(link);

                // Kích hoạt sự kiện nhấp để bắt đầu tải về
                link.click();
            }
        }
    }

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target.result;
            Papa.parse(text, {
                header: false,
                skipEmptyLines: true,
                complete: function (results) {
                    const csvData = results.data;
                    const columnAData = csvData
                        .filter((row) => row[0] !== undefined && row[0] !== "")
                        .map((row) => row[0]);
                    setFile1(columnAData);
                },
            });
        };
        reader.readAsText(file);
    };

    return (<Box className="centered-box" >
        <Button style={{ position: "absolute", top: 0, right: 0, margin: 20 }} variant="contained" onClick={() => dispatch(logout())}>
            Log out
        </Button>
        <NotificationContainer />
        {isLoading && <LoadingScreen />}

        <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <StyledFormControl sx={{ margin: '10px' }}>
                <InputLabel id="dropdown-label">Trang</InputLabel>
                <Select
                    label="Trang"
                    value={page}
                    onChange={(event) => setPage(event.target.value)}>
                    {pageList.map((size, index) => (
                        <MenuItem key={index} value={size.value}>
                            {size.value}
                        </MenuItem>
                    ))}
                </Select>

            </StyledFormControl>
            <FormControlLabel
                control={<Checkbox checked={checked} onChange={handleChange} />}
                label="Chỉ lấy các Style chỉ định"
            />
        </Box>
        {checked ? <TextField
            label="Chỉ lấy các Style: (Ví dụ: Classic T-Shirt|Premium T-Shirt) Cách nhau dấu |"
            placeholder={"Cách nhau bằng dấu |"}
            sx={{ margin: '10px', width: 456 }}
            value={cate}
            onChange={(e) => setCate(e.target.value)}
        /> : null}
        <RadioGroup style={{ display: 'flex', flexDirection: "row" }} value={type} onChange={(event) => setType(event.target.value)}>
            <FormControlLabel value="link" control={<Radio />} label="Link Collection" />
            <FormControlLabel value="file" control={<Radio />} label="From File" />
        </RadioGroup>
        {type == "link" ? <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <TextField
                label="Link Collection"
                placeholder={page == "teepublic.com" ? "https://teepublic.com/t-shirts" : page == "redbubble.com" ? "https://redbubble.com/shop/womens-clothing" : ""}
                sx={{ margin: '10px', width: 456 }}
                value={link}
                onChange={(e) => setLink(e.target.value)}
            />
            <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <TextField
                    label="Từ Trang"
                    placeholder={1}
                    sx={{ margin: '10px', width: 218 }}
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                />
                <TextField
                    label="Đến Trang"
                    placeholder={1}
                    sx={{ margin: '10px', width: 218 }}
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                />
            </Box>
        </Box> : <input type="file" onChange={handleFileUpload} />}
        <Button variant="contained" onClick={handleCrawler}>
            Cào
        </Button>

    </Box >
    );
}
export default ConvertTiktok