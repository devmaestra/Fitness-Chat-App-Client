import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'reactstrap';

function Logout({setSessionToken}) {

    const navigate = useNavigate();

    const signout = () => {
        localStorage.removeItem('token') // clears out localStorage
        setSessionToken('') // resets out state to an empty string
        navigate('/') // rouths us back to Auth
    }

    const style = {
        float: 'right',
        margin: '.5rem'
    }

  return (
    <>
        <Button
        color='info'
        outline
        style={style}
        onClick={signout}
        >Signout
        </Button>
    </>
  )
}

export default Logout