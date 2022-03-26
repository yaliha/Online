import * as React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function MinHeightTextarea(props) {
    // console.log("styyyy",props.styl)
    return (
        <>
            <label htmlFor={"textArea"}>توضيحات:</label>
            <TextareaAutosize
                name={"tozih"}
                id={"textArea"}
                aria-label="minimum height"
                minRows={3}

                style={{ width: "98.5%", }}
            />

        </>

    );
}
