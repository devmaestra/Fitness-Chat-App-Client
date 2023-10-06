import React, { useRef } from 'react'
import FullButton from '../../buttons/FullButton';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

function Login({updateToken}) {

    const emailRef = useRef();
    const passwordRef = useRef();
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        

        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        

        //needs to match postman body
        let body = JSON.stringify({
            email, password
        })

        const url = 'http://localhost:4001/user/login'

        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: new Headers({
                    "Content-Type": 'application/json' // thing to append to
                }),
                body: body
            })

            const data = await res.json();
            console.log(data);
           

            if(data.message === 'Success!') {
                updateToken(data.token)
                navigate('/') // navigate to all rooms
            } else {
                alert(data.message)
            }
            
        } catch (err) {
            console.log(err.message);
        }
    }

  return (
    <>
    <h2>Login</h2>
    <Form onSubmit={handleSubmit}>
    <FormGroup>
        <Label>Email</Label>
            <Input
            innerRef={emailRef}
            type='email'
            placeholder='email'
            />
    </FormGroup>

    <FormGroup>
        <Label>Password</Label>
            <Input
            innerRef={passwordRef}
            type='password'
            placeholder='Enter Password'
            />
    </FormGroup>
    <FullButton>
    <Button type='submit'>Login</Button>
    </FullButton>
    </Form>
    </>
  )
}

export default Login