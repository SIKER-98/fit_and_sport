import React, {Component} from "react";

import '../../styles/formStyle.css';
import {addExerciseToTrainingPlan, createTrainingPlan, fetchExercises} from "../../api/index";

class CreatePlanComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            planName: '',
            description: '',
            selectedExercise: [],
            exerciseList: [],

            errorMessage: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }

    async componentDidMount() {
        const respond = await fetchExercises()

        if (respond.status === 200) {
            this.setState({exerciseList: respond.exercises})
        }
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleCheckbox(event) {
        const id = event.target.id
        const checked = event.target.checked

        let list = this.state.selectedExercise;

        if (checked) {
            list.push(id)
        } else {
            list = list.filter(element => (element !== id))
        }

        this.setState({selectedExercise: list});
    }

    async createPlan(event) {
        event.preventDefault();

        if (this.state.planName === '' || this.state.description === '') {
            this.setState({errorMessage: 'Please enter plan name and description!'})
            return
        }

        const response = await createTrainingPlan(this.state.planName, this.state.description,
            sessionStorage.getItem('userId'))

        if(response.status===200){
            const planId = response.planId

            this.state.selectedExercise.forEach( (exercise)=>{
                let response =  addExerciseToTrainingPlan(planId, exercise*1)

            })
        }
        this.props.history.push('/dashboard');
    }

    render() {
        return (
            <>
                <h2 className={'error-message'}>{this.state.errorMessage}</h2>
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
                        {this.state.exerciseList.map(exercise => {
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
            </>
        )
    }
}

export default CreatePlanComponent;
