import React from 'react';
import './Input.css';

const input = (props) => {

    let inputElement = null;
    switch (props.inputtype) {
        case ('input'):
            inputElement = <input defaultValue={props.prefillvalue} className="InputElement" {...props} />
            break;
        case ('textarea'):
            inputElement = <textarea defaultValue={props.prefillvalue} className="InputElement" {...props}/>
            break;
        case ('checkbox'):
            inputElement = <input className="InputElement" type="checkbox" {...props}/>
            break;
        case ('number'):
            inputElement = <input defaultValue={props.prefillvalue} className="InputElement" type="number" {...props}/>
            break;
        default:
            inputElement = <input className="InputElement" {...props}/>
            break;
    }
    return (
        <div className="Input">
            <label className="Label">{props.label}</label>
            {inputElement}
        </div>
    );
} ;

export default input;