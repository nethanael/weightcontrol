import React, { Component } from 'react';
import PersonalDataForm from './personalDataForm';

class PersonalData extends Component {
    render() {

        const { data, errors, handleChange, handleSubmit, validate } = this.props;            // deconstruct the props objects to pass to childs

        return (
            <div className="container">
                <PersonalDataForm
                    data={data}
                    errors={errors}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    validate={validate}
                />
            </div >
        );
    }
}

export default PersonalData;