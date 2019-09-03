import React, { Component } from 'react';
import Signin from '../Functional/Signin';

export default class Wrapper extends Component {


    googleSignInFunc () {
        console.log('clicked');
        
        fetch('/auth/google/callback').then((response) => {
            console.log(response)
        })

    }

    render() {
        return (
            <div>
                <Signin clicky={this.googleSignInFunc} />
            </div>
        )
    }
}