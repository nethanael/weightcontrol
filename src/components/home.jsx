import React, { Component } from 'react';
import Joi from 'joi-browser';              // import Joi class, used to validate forms with the "schema" object
import PersonalData from './personalData';
import GraphData from './graphData';
import GraphData2 from './graphData2';

class Home extends Component {
    state = {                               // here´s the state of the component wich must be sincronized with the inputs
        personalData: {
            height: '',
            weight: ''
        },
        errorsPersonalData: {},                          // error object, this obj contains all errors if they exist
        graphData: [],
        count: 1,
        currentMeasure: {
            weight: 0,
            key: '',
            IMC: 0,
            number: 0
        }
    }

    schemaPersonalData = {                              // schema object used to validate
        height: Joi.number()
            .required()
            .min(130)
            .max(220)
            .label('Height'),
        weight: Joi.number()                  // using the JOI object we define how to validate each input
            .required()
            .min(20)
            .max(180)
            .label('Weight'),
    }

    getDateF = () => {
        const d = new Date();
        let datee = d.getFullYear() + " " + d.getMonth() + " " + d.getDay();;
        return datee;
    }

    // this method will validate the change from inputs in real time

    handleNewMeasure = (input) => {
        const newMeasure = {
            weight: parseFloat(input.value),
            key: Date.now(),
            IMC: this.imcCalculator(input.value, this.state.personalData.height),
            number: this.getDateF()
        }

        this.setState({ currentMeasure: newMeasure });
    }

    handleChange = ({ currentTarget: input }) => {              // deconstruct the e.currentTarget to input, input now contains the html 
        const errorsPersonalData = { ...this.state.errorsPersonalData };                // make a clone of the error obj from the state
        const errorMessage = this.validateProperty(input);      // get the error message based on the validateProperty function input goes as attribute
        if (errorMessage) errorsPersonalData[input.name] = errorMessage;    // if error exist from the field we set the errors object with the key and the message
        else delete errorsPersonalData[input.name];                         // if theres no error then delete that key value pair

        const personalData = { ...this.state.personalData };                    // clone from the data of the state
        personalData[input.name] = input.value;                         // refresh the clone data with the actual data 

        if (input.name === 'weight') {
            this.handleNewMeasure(input);
        }

        this.setState({ personalData, errorsPersonalData });                        // sets the state with the new data and the new errors

    }

    //this method will be called from the handleChange to validate just one field

    validateProperty = ({ name, value }) => {                   // deconstruct the name and value from the input
        const obj = { [name]: value };                          // create a new simple object looks like "age: 37" for a simple validation with joi
        const schema = { [name]: this.schemaPersonalData[name] };           // create new simple object schema looks like "age: Joi.string().required().label('Age')" for a simple validation with joi
        //console.log(schema[name]._flags.label);               //debug
        const { error } = Joi.validate(obj, schema);            // here we validate using Joi and pick the error property of the result; "abort early" as default
        return error ? error.details[0].message : null;         // ternary operator returns the error message
    }


    imcCalculator = (value, height) => {
        return (parseFloat(value) / ((parseFloat(height) / 100) * (parseFloat(height)) / 100)).toFixed(2);
    }

    validate = () => {
        const options = { abortEarly: false };
        const { error } = Joi.validate(this.state.personalData, this.schemaPersonalData, options);          // here we validate using Joi and pick the error property of the result; "abort early" as default
        if (!error) return null;

        const errors = {};
        for (let item of error.details)
            errors[item.path[0]] = item.message;
        return errors;
    }

    handleSubmit = e => {
        e.preventDefault();
        const errorsPersonalData = this.validate();
        this.setState({ errorsPersonalData: errorsPersonalData || {} });
        if (errorsPersonalData) return;

        const newData = [...this.state.graphData, this.state.currentMeasure];
        const newCount = this.state.count + 1;

        console.log("Data submited");
        this.setState({ graphData: newData, count: newCount });

    }

    render() {

        const { personalData, errorsPersonalData, graphData } = this.state;            // deconstruct the props objects to pass to childs

        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-12">
                        <PersonalData
                            data={personalData}
                            errors={errorsPersonalData}
                            handleChange={this.handleChange}
                            handleSubmit={this.handleSubmit}
                            validate={this.validate}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <GraphData
                            mainData={graphData}
                        />
                    </div>
                    <div className="col-6">
                        <GraphData2
                            mainData={graphData}
                        />
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Home;