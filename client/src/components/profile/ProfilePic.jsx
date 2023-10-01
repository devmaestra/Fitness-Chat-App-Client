import React, { useRef } from 'react';
import { Button, Form, Input } from 'reactstrap';


function ProfilePic(props) {

    const imgInputRef = useRef();

    const handleSubmit = async (e) => {
      e.preventDefault();
      console.log(e);
      const file = e.target[0].files[0];
      console.log(file);
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