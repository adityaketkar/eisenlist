import React from 'react';
import './Input.css';
import EdiText from 'react-editext';

const input = (props) => {

    let inputElement = null;
    switch (props.inputtype) {
        case ('input'):
            if(!props.editMode){
                inputElement = <input required={true} defaultValue={props.prefillvalue} className="InputElement" {...props} />
            } else {
                inputElement = <EdiText
                                    type="text"
                                    value={props.prefillvalue}
                                    onSave={props.onSubmit}
                                    showButtonsOnHover
                                    editOnViewClick={true}
                                    submitOnEnter
                                    cancelOnEscape
                                    submitOnUnfocus
                                />
            }

            break;
        case ('textarea'):
            if(!props.editMode){
                inputElement = <textarea defaultValue={props.prefillvalue} className="InputElement" {...props}/>
            } else {
                inputElement = <EdiText
                                    type="textarea"
                                    value={props.prefillvalue}
                                    onSave={props.onSubmit}
                                    showButtonsOnHover
                                    editOnViewClick={true}
                                    submitOnEnter
                                    cancelOnEscape
                                    submitOnUnfocus
                                />
            }
            break;
        case ('checkbox'):
            inputElement = <input className="InputElement" type="checkbox" {...props}/>
            break;
        case ('number'):
            if(!props.editMode){
                inputElement = <input defaultValue={props.prefillvalue} className="InputElement" type="number" {...props}/>
            } else {
            inputElement = <EdiText
                                type="number"
                                value={props.prefillvalue.toString()}
                                onSave={props.onSubmit}
                                showButtonsOnHover
                                editOnViewClick={true}
                                submitOnEnter
                                cancelOnEscape
                                submitOnUnfocus
                            />
            }
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