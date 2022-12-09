import React, { Component } from 'react';   // import the React class ( Default export) and Component class (named export) to this file.
import Input from '../common/input';        // import the input component wich contains all the html used to build an input

class PersonalDataForm extends Component {  // here we create the PersonalDataForm Component wich extends Component from React

    validateHeight = () => {
        // not ready
        return true;
    }

    render() {                                          // method that will render the content of the component
        const { data, errors, handleChange, handleSubmit, validate } = this.props;            // deconstruct the props objects to pass to childs
        return (
            <div>
                <form>
                    <Input                              // input component -> interface: name, label, value, onChange and error
                        name='height'                   // atributtes of the component
                        label='Height (cm)'
                        value={data.height}
                        onChange={handleChange}
                        error={errors.height}
                    />
                    <Input                              // input component -> interface: name, label, value, onChange and error
                        name='weight'                   // atributtes of the component
                        label='Weight (Kg)'
                        value={data.weight}
                        onChange={handleChange}
                        error={errors.weight}
                    />
                </form>
                <button
                    onClick={handleSubmit}
                    disabled={validate()}
                    className="btn btn-primary">
                    Insert Data
                </button>
            </div >
        );
    }
}

export default PersonalDataForm;                       // export this class to be used in other place