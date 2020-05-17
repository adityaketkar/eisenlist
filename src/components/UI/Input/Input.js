import React from 'react';
import classes from './Input.css';

const input = (props) => {

    let inputElement = null;
    switch (props.inputtype) {
        case ('input'):
            inputElement = <input className={classes.InputElement} {...props} />
            break;
        case ('textarea'):
            inputElement = <textarea className={classes.InputElement} {...props}/>
            break;
        case ('checkbox'):
            inputElement = <input className={classes.InputElement} type="checkbox" {...props}/>
            break;
        case ('number'):
            inputElement = <input className={classes.InputElement} type="number" {...props}/>
            break;
        default:
            inputElement = <input className={classes.InputElement} {...props}/>
            break;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
} ;

export default input;