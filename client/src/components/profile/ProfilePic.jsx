import React, { useRef } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { baseURL } from '../../utils';

function ProfilePic(props) {

    const imgInputRef = useRef();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const file = e.target[0].files[0];
      console.log(file);

      // fetch to server endpoint to get the link (from s3)

      // const url = await fetch("http://127.0.0.1:4001")
      
      const awsURL = await fetch (`${baseURL}/geturl`).then(res => res.json()).catch(err => console.log(err))

      // fetch to s3 to upload the image (PUT)
      await fetch (awsURL, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: file
      })

      const imgURL = awsURL.split("?")[0];

      // fetch to our servers db to post the link
      await fetch(`${baseURL}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({imgURL})
      })

    //  const img = document.createElement("img")
    //  img.src = imgURL
    //  console.log(imgURL);
    //  document.body.appendChild(img)
    };

  return (

    <>
      <Form onSubmit={handleSubmit} className="imgForm">
        <Input ref={imgInputRef} type="file" id="imgInput" accept="image/*"></Input>
        <Button type="submit">Upload</Button>
      </Form>
    </>
  )
}

export default ProfilePic