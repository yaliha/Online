import React, { useState, useRef } from "react";
import Button from '@mui/material/Button';
import * as api from "../../../../../api/user.api";
import {toast} from "react-toastify";

const ImageUpload = (props) => {
    const [image, setImage] = useState("");
    const [imageBox,setImageBox]=useState([])
    const inputFile = useRef(null);
    const inputFileBlock = useRef(null);

    const handleFileUpload = async (e) => {
        const { files } = e.target;
        if (files && files.length) {
            let imgeFile = new FormData();
            imgeFile.append("image", e.target.files[0])
            try {
                const response = await api.post("/upload", imgeFile);
                let box=imageBox
                box.push(response.filename)
                setImageBox(box)
                props.func(box)
            } catch (e) {
                toast.error("عكس اپلود نشد");
            }
            const filename = files[0].name;
            var parts = filename.split(".");
            const fileType = parts[parts.length - 1];
            setImage(files[0]);
            inputFileBlock.current.value += " " + filename +" "

        }
    };

    const onButtonClick = () => {
        inputFile.current.click();
    };

    return (
        <div>
            <input
                name={"image"}
                style={{ display: "none" }}
                // accept=".zip,.rar"
                ref={inputFile}
                onChange={handleFileUpload}
                type="file"
            />
            <div style={{ display: "flex",flexDirection:"column" }}>
                <label htmlFor={"inputFileBlock"}>تصوير كالا:</label>
                <div>
                    <input value={props.value} ref={inputFileBlock} id={"inputFileBlock"} style={{ width:"73%",marginLeft:"1rem" }}/>
                    <Button onClick={onButtonClick} style={{ height:"1.7rem" , width:"5rem" ,background:"#060638",color:"white",left:"0"}} >Browse</Button>
                </div>
                <div>
                    {
                        imageBox.map((item)=>{
                        return <img width={"60px"} height={"60px"} style={{margin:"1rem"}} src={`http://localhost:3002/files/${item}`}/>

                        })
                    }
                </div>

            </div>

        </div>
    );
};

export default ImageUpload;
