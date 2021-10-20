import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import ProgressBar from "@ramonak/react-progress-bar";
import { BsPlusLg } from "react-icons/bs"

import SelectColumn from './SelectColumn';

const UploadFile = () => {
    const [fileDetail, setFileDetail] = useState({});
    const [precentage, setPercentage] = useState(0);
    const [data, setData] = useState([])
    const [slide, setSlide] = useState(1);

    const onDrop = useCallback((acceptedFiles) => {
        setPercentage(0)
        const file = acceptedFiles[0];

        const reader = new FileReader()

        if (file !== undefined) {
            setFileDetail({ 'name': file.name, 'size': file.size })

            reader.onload = (e) => {
                const text = e.target.result;
                setData(text)
            }

            reader.onabort = () => alert('file reading was aborted')
            reader.onerror = () => alert('file reading has failed')

            reader.onprogress = (e) => {
                setPercentage(Math.round(e.loaded * 100 / e.total))
            }
            reader.readAsText(file);
        } else {
            alert("error uploading file")
        }
    }, [])

    const onDragEnter = useCallback(() => {
        setPercentage(0)
    }, [])

    const { getRootProps, getInputProps } = useDropzone(
        { onDrop, accept: '.csv, .xlsx, .xls', multiple: false, onDragEnter, noClick: true })

    const removeFile = () => {
        setPercentage(0)
        setFileDetail({})
    }

    return (
        <div className="file-upload">
            {slide === 1 && (
                <>
                    <div {...getRootProps()} className="file-upload__wrapper">
                        <input {...getInputProps()} />
                        <p className="file-upload__uploader">
                            <BsPlusLg />
                        </p>
                    </div>
                    <span>Upload your file</span>
                    <p className="file-upload__filename">{fileDetail.name}</p>

                    <div className="file-upload__progress">
                        <h2>File Upload Status</h2>
                        <ProgressBar completed={precentage} customLabel={`${precentage}% complete`}
                            height="44px" width="320px" borderRadius="5px" transitionDuration="1s" />
                        <div className="file-upload__option">
                            <p onClick={removeFile}>Remove file</p>
                            <p onClick={() => setSlide(2)}>Choose column</p>
                        </div>
                    </div>
                </>
            )}
            {slide === 2 && (
                <>
                    <SelectColumn data={data.slice(0, 100)} setSlide={setSlide} />
                </>
            )}
        </div>
    )
}

export default UploadFile;

