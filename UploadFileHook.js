import React, {useState} from "react";
import FileService from "../../../services/FileService";

//   Example to upload files to the back-end with @blob
//REACT HOOK
export default function UploadFile() {
    const [image, setImage] = useState({preview: "", raw: ""}), handleChange = e => {

            if (e.target.files.length) {

                setImage({
                    preview: URL.createObjectURL(e.target.files[0]),
                    raw: e.target.files[0]
                });
            }

        },
        handleUpload = async e => {
            e.preventDefault();
            const formData = new FormData();
            formData.append('file', image.raw);
            await FileService.upload
            try {
                FileService.upload(formData)
                    .then(response => {
                        console.log(response.data.raw);
                        window.alert("File uploaded successfully.")
                       // needed to clear the preview state
                        // clearState();
                    })

            } catch (err) {
                if (err.response.status === 500) {
                    alert('There was a problem with the server');
                } else {

                    alert(err.response.data.msg);
                }
            }

        };
    //clears the preview of uploaded file/image
    /*const clearState = () => {
        setImage({
            preview: '',
            raw: ''
        })
    }*/


    return (
        <div>
            <label htmlFor="upload-button">
                {image.preview ? (
                    <img src={image.preview} alt="dummy" width="600" height="400" />
                ) : (
                    <>
            <span className="fa-stack fa-2x mt-3 mb-2">
              <i className="fas fa-circle fa-stack-2x"/>
              <i className="fas fa-store fa-stack-1x fa-inverse"/>
            </span>
                        <h5 className="text-center">Upload your photo</h5>
                    </>
                )}
            </label>
            <input
                type="file"
                id="upload-button"
                style={{display: "none"}}
                onChange={handleChange}
            />
            <br/>
            <button onClick={handleUpload}>Upload</button>


        </div>

    );
}
