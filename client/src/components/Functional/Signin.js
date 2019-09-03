import React from 'react'
import Image from './../images/btn_google_signin_light_pressed_web.png'

const Signin = (props) => {
    let signIn = {
        'backgroundImage': 'url('+Image+')',
        'width': '191px',
        'height': '46px',
        'display': 'block',
        'position': 'relative',
        'cursor': 'pointer'
    }
    return (
        <div>
            <div style={signIn} onClick={props.clicky}></div>
        </div>
    )
}

export default Signin
