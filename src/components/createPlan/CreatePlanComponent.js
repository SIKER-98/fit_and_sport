import React, {Component} from "react";

import '../../styles/formStyle.css';

class CreatePlanComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            planName: '',
            description: '',
            exerciseList: [],
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    testExcercises = [
        {id: 1, exerciseName: 'exercise 1', isSelected: false},
        {id: 2, exerciseName: 'exercise 2', isSelected: false},
        {id: 3, exerciseName: 'exercise 3', isSelected: false},
        {id: 4, exerciseName: 'exercise 4', isSelected: false},
        {id: 5, exerciseName: 'exercise 5', isSelected: false},
        {id: 6, exerciseName: 'exercise 6', isSelected: false},
    ]

    handleCheckbox(event) {
        const id = event.target.id
        const checked = event.target.checked

        let list = this.state.exerciseList;

        if (checked) {
            list.push(id)
        } else {
            list = list.filter(element => (element !== id))
        }

        this.setState({exerciseList: list});
    }

    createPlan(event) {
        event.preventDefault();

        //TODO: tworzenie planu
        console.log(this.state)

        this.props.history.push('/dashboard');
    }

    render() {
        return (
            <form className={'new-product-form'}>
                <label className={'form-label'}
                       htmlFor={'planName'}
                >
                    Plan name:
                </label>
                <input className={'form-input'}
                       id={'planName'}
                       name={'planName'}
                       onChange={this.handleChange}
                />

                <label className={'form-label'}
                       htmlFor={'description'}
                >
                    Description:
                </label>
                <textarea className={'form-textarea'}
                          id={'description'}
                          name={'description'}
                          onChange={this.handleChange}
                />


                <label className={'form-label'}>
                    Exercises:
                </label>

                <ul className={'form-exercises'}>
                    {this.testExcercises.map(exercise => {
                        return (
                            <li className={'form-exercise'}
                                key={exercise.id}
                            >
                                <input className={'form-checkbox'}
                                       type={'checkbox'}
                                       onChange={this.handleCheckbox}
                                       id={exercise.id}
                                />
                                <label className={'form-checkbox'}
                                       htmlFor={exercise.id}
                                >
                                    {exercise.exerciseName}
                                </label>
                            </li>
                        )
                    })}

                </ul>

                <button className={'submit-button'}
                        onClick={(event) => this.createPlan(event)}
                >
                    Create training plan
                </button>
            </form>
        )
    }
}

export default CreatePlanComponent;
