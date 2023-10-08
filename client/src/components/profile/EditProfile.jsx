import React, { useRef } from 'react';
import { Button, Form, FormGroup, Label, FormText, Input } from 'reactstrap';
import { baseURL } from '../../utils';

function EditProfile(props) {

/*     const emailRef = useRef();
    const passwordRef = useRef();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()

        const url = 'http://localhost:4001/user/profile'
    } */

    return (

        <Form /* onSubmit={handleSubmit} */>
            <FormGroup>
                <Label for="exampleEmail">
                    Email
                </Label>
                <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="with a placeholder"
                    type="email"
                />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">
                    Password
                </Label>
                <Input
                    id="examplePassword"
                    name="password"
                    placeholder="password placeholder"
                    type="password"
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelect">
                    Select
                </Label>
                <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                >
                    <option>
                        1
                    </option>
                    <option>
                        2
                    </option>
                    <option>
                        3
                    </option>
                    <option>
                        4
                    </option>
                    <option>
                        5
                    </option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelectMulti">
                    Select Multiple
                </Label>
                <Input
                    id="exampleSelectMulti"
                    multiple
                    name="selectMulti"
                    type="select"
                >
                    <option>
                        1
                    </option>
                    <option>
                        2
                    </option>
                    <option>
                        3
                    </option>
                    <option>
                        4
                    </option>
                    <option>
                        5
                    </option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="exampleText">
                    Text Area
                </Label>
                <Input
                    id="exampleText"
                    name="text"
                    type="textarea"
                />
            </FormGroup>
            <FormGroup>
                <Label for="exampleFile">
                    File
                </Label>
                <Input
                    id="exampleFile"
                    name="file"
                    type="file"
                />
                <FormText>
                    This is some placeholder block-level help text for the above input. It‘s a bit lighter and easily wraps to a new line.
                </FormText>
            </FormGroup>
            <FormGroup tag="fieldset">
                <legend>
                    Radio Buttons
                </legend>
                <FormGroup check>
                    <Input
                        name="radio1"
                        type="radio"
                    />
                    {' '}
                    <Label check>
                        Option one is this and that—be sure to include why it‘s great
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Input
                        name="radio1"
                        type="radio"
                    />
                    {' '}
                    <Label check>
                        Option two can be something else and selecting it will deselect option one
                    </Label>
                </FormGroup>
                <FormGroup
                    check
                    disabled
                >
                    <Input
                        disabled
                        name="radio1"
                        type="radio"
                    />
                    {' '}
                    <Label check>
                        Option three is disabled
                    </Label>
                </FormGroup>
            </FormGroup>
            <FormGroup check>
                <Input type="checkbox" />
                {' '}
                <Label check>
                    Check me out
                </Label>
            </FormGroup>
            <Button>
                Submit
            </Button>
        </Form>
    )
}

export default EditProfile