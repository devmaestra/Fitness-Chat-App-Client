import React, { useRef, useState } from 'react';
import { Button, Form, Input } from 'reactstrap';
import { baseURL } from '../../utils';

function ProfilePic(props) {
  const imgInputRef = useRef();

  const handlePicUpload = async (e) => {
    e.preventDefault();

    const file = e.target[0].files[0];

    if (!props.userId) {
      console.error("User ID is not available.");
      return;
    }

    // Fetch pre-signed URL for S3 upload
    const awsURL = await fetch(`${baseURL}/geturl`).then(res => res.json()).catch(err => console.log(err));

    // Upload image to S3
    await fetch(awsURL, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });

    // Get the image URL from the S3 URL
    const imgURL = awsURL.split("?")[0];

    // Update user profile with the image URL
    await fetch(`${baseURL}/user/${props.userId}/edit`, {
      method: "PATCH",
      headers: new Headers({
        Authorization: props.token,
        "Content-Type": "application/json",
      }),
      body: JSON.stringify({
        userImage: imgURL,
      }),
    });


    // Update your server's database with the image link
    await fetch(`${baseURL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ imgURL }),
    });
  };

  return (
    <>
      <Form onSubmit={handlePicUpload} className="imgForm">
        <Input ref={imgInputRef} type="file" id="imgInput" accept="image/*"></Input>
        <br />
        <Button
        color="primary"
        type="submit"

        >Upload</Button>
      </Form>
    </>
  );
}

export default ProfilePic;