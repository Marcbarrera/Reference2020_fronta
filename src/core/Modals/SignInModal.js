import React from 'react'
import Signin from '../../user/Signin'

const SignInModal = props => {
    let signinClasses = 'modal-signin ';

    if (props.show) {
        signinClasses = 'modal-signin open';
    }

    return (
        <section className={signinClasses}>
            <Signin/>
            <button onClick={() => props.close()}>close</button>
        </section>
    )
}

export default SignInModal