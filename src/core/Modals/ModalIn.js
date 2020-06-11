import React from 'react'

const ModalIn = props => (

    <div className="modal__in">
        {props.children}  

        {props.canCancel && <button onClick={props.onCancel}>Close</button>}   

    </div>
);
export default ModalIn