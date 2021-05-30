import React, {Component} from "react";
import {
    addExerciseToTrainingPlan,
    deleteExerciseFromTrainingPlan,
    fetchExercises,
    getPlanExercises,
    loginUser, updateExerciseFromTrainingPlan
} from "../../../api";

class TrainingPlanComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plan: props.location.state.plan,

            exercises: [],
            availableExercises: [],

            selectedExercise: 0,
            editingSeries: 0,
            editingRepetitions: 0,

            newStatistic: false,
            showStatistics: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.tableRowGenerate = this.tableRowGenerate.bind(this)
    }

    async componentDidMount() {
        const plan = this.state.plan

        const response = await getPlanExercises(plan.id)
        response.exercises = response.exercises.sort(function (a, b) {
            return a.exerciseId - b.exerciseId
        })

        if (response.status === 200) {
            this.setState({exercises: response.exercises})
        }


        const exercises = await fetchExercises()
        if (exercises.status === 200) {
            exercises.exercises = exercises.exercises.filter(this.comparer(response.exercises))

            this.setState({availableExercises: exercises.exercises})
        }
    }

    // funkcja filtrujaca
    comparer(otherArray) {
        return function (current) {
            return otherArray.filter(function (other) {
                return other.exerciseId === current.id
            }).length === 0;
        }
    }

    // przechwytywanie zmian w inputach
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    // zmiany ilosc cwiczen
    updateItem(event, selectedExercises) {
        event.preventDefault();

        let exercises = this.state.exercises;
        exercises.forEach(exercise => {
            exercise.isEditing = exercise.id === selectedExercises.id;
        });

        this.setState({
            editingSeries: selectedExercises.series,
            editingRepetitions: selectedExercises.repetitions,
            exercises: exercises
        });
    }

    // zakonczenie edycji cwiczenia
    async saveChange(event, selectedExercises) {
        let exercises = this.state.exercises;
        const exerciseId = selectedExercises.planExerciseId

        const status = await updateExerciseFromTrainingPlan(exerciseId, this.state.editingRepetitions, this.state.editingSeries)

        if (status === 200) {
            exercises.forEach(exercise => {
                exercise.isEditing = false;

                //TODO: Update training plan item

                if (exercise.planExerciseId === selectedExercises.planExerciseId) {
                    exercise.series = this.state.editingSeries;
                    exercise.repetitions = this.state.editingRepetitions;
                }
            })

            this.setState({exercises: exercises});
        }
    }

    async deleteItem(event, exercise) {
        const id = exercise.planExerciseId
        console.log(id)
        console.log(this.state.exercises)

        const status = await deleteExerciseFromTrainingPlan(id)

        console.log(this.state.exercises)
        //TODO: usuwanie cwiczenia

        if (status === 200) {
            let exercises = this.state.exercises;
            exercises = exercises.filter(exercise => exercise.planExerciseId !== id)

            this.setState({exercises: exercises});
        }
    }


    // generowanie wierszy tabeli
    tableRowGenerate() {
        return this.state.exercises.map(exercise => {
                return (
                    <tr key={exercise.exerciseId}>
                        <td>{exercise.exerciseId}</td>
                        {!exercise.isEditing &&
                        <>
                            <td>{exercise.exerciseName}</td>
                            <td>{exercise.description}</td>
                            <td>{exercise.series}</td>
                            <td>{exercise.repetitions}</td>

                            <td className={'action'}>
                                <button className={'action-button button-orange'}
                                        onClick={(event) => this.updateItem(event, exercise)}>
                                    Update
                                </button>
                                <button className={'action-button button-red'}
                                        onClick={(event) => this.deleteItem(event, exercise)}>
                                    Delete
                                </button>
                            </td>
                        </>
                        }
                        {exercise.isEditing &&
                        <>
                            <td>{exercise.exerciseName}</td>
                            <td>{exercise.description}</td>
                            <td>
                                <input type={'text'}
                                       value={this.state.editingSeries}
                                       autoComplete={'off'}
                                       className={'table-input'}
                                       defaultValue={this.state.editingName}
                                       name={'editingSeries'}
                                       onChange={this.handleChange}
                                />
                            </td>
                            <td>
                                <input type={'text'}
                                       autoComplete={'off'}
                                       className={'table-input'}
                                       defaultValue={this.state.editingRepetitions}
                                       name={'editingRepetitions'}
                                       onChange={this.handleChange}
                                />
                            </td>

                            <td className={'action'}>
                                <button className={'action-button button-green'}
                                        onClick={(event) => this.saveChange(event, exercise)}>
                                    Save
                                </button>
                                <button className={'action-button button-red'}
                                        onClick={(event) => this.deleteItem(event, exercise)}>
                                    Delete
                                </button>
                            </td>
                        </>
                        }


                    </tr>
                )
            }
        )
    }

    selectExercise(event) {
        event.preventDefault()
        this.setState({selectedExercise: event.target.value})
    }

    async addExerciseToPlan() {
        let plan = this.state.plan

        if (this.state.selectedExercise !== 0) {
            const request = await addExerciseToTrainingPlan(plan.id, this.state.selectedExercise)

            if (request.status === 200) {
                let options = this.state.availableExercises
                let exercises = this.state.exercises

                // nowe cwiczenie
                // let newExercise = options.filter(option => option.id === this.state.selectedExercise * 1)[0]
                // newExercise.exerciseId = newExercise.id
                let newExercise = request.data

                // lista bez tego cwiczenia
                options = options.filter(option => option.id !== this.state.selectedExercise * 1)

                exercises.push(newExercise)
                exercises = exercises.sort(function (a, b) {
                    return a.exerciseId * 1 - b.exerciseId * 1
                })

                this.setState({
                    exercises: exercises,
                    availableExercises: options
                })
            }
        }

    }

    addStatistic() {

    }

    closeStatisticPopup() {

    }

    addNewStatistic() {
        const plan = this.state.plan;

        if (this.state.newStatistic)
            return (
                <div className={'popup'}>
                    <h1>New statistic window</h1>

                    <ul className={'statistic-list'}>
                        {plan.exercises.map(exercise => (
                            <li key={exercise.id}
                                className={'statistic-item'}>
                                <p>{exercise.exerciseName}</p>
                                <p>
                                    Series: <input/> Repetitions: <input/>
                                </p>
                            </li>
                        ))}
                    </ul>

                    <div className={'flex-split'}>
                        <button className={'flex-button button-green'}
                                onClick={() => this.addStatistic()}
                        >
                            Save
                        </button>
                        <button className={'flex-button button-red'}
                                onClick={() =>
                                    this.setState({newStatistic: false})}>
                            Cancel
                        </button>
                    </div>
                </div>

            )
        return null
    }

    showStatistics() {
        const statistic = this.state.plan.exercises

        if (this.state.showStatistics) {
            return (
                <div className={'popup'}>
                    <p>Statistics for this training plan:</p>
                    <ul className={'statistic-list'}>
                        {statistic.map(exercise => (
                            <li key={exercise.id}
                                className={'statistic-item'}
                            >
                                <p>{exercise.exerciseName}</p>
                                <p>Series: {exercise.series}, Repetitions: {exercise.repetitions}</p>
                            </li>
                        ))}
                    </ul>

                    <div className={'flex-split'}>
                        <button className={'flex-button button-red'}
                                onClick={() =>
                                    this.setState({showStatistics: false})}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )
        }
        return null;
    }


    render() {
        return (
            <>
                <div className={'dashboard'}>
                    <h1>Your training plans: <span>{this.state.plan.planName}</span></h1>
                    <h2>Description: <span>{this.state.plan.description}</span></h2>
                    <table className={'dashboard-table'}>
                        <thead className={'dashboard-table-head'}>
                        <tr className={'line-bottom'}>
                            <th width={'5%'}>Id:</th>
                            <th width={'15%'}>Excercise name:</th>
                            <th width={'40%'}>Description:</th>
                            <th width={'10%'}>Series:</th>
                            <th width={'10%'}>Repetitions</th>
                            <th width={'20%'}>Actions</th>
                        </tr>
                        </thead>
                        <tbody className={'dashboard-table-body'}>
                        {this.tableRowGenerate()}
                        </tbody>
                    </table>
                    <div>
                        <button className={'submit-button'}
                                onClick={() => this.addExerciseToPlan()}
                        >
                            Add new exercise
                        </button>

                        <select defaultValue={this.state.selectedExercise}
                                onChange={(event) =>
                                    this.selectExercise(event)}
                        >
                            <option value={0}>-Empty-</option>
                            {this.state.availableExercises.map(item => (
                                <option value={item.id}
                                        key={item.id}
                                >
                                    {item.exerciseName}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/*<button className={'submit-button'}*/}
                    {/*        onClick={() =>*/}
                    {/*            this.setState({newStatistic: true})}*/}
                    {/*>*/}
                    {/*    Add new*/}
                    {/*    Statistic*/}
                    {/*</button>*/}
                    {/*<button className={'submit-button'}*/}
                    {/*        onClick={() =>*/}
                    {/*            this.setState({showStatistics: true})}*/}
                    {/*>*/}
                    {/*    Show*/}
                    {/*    statistic*/}
                    {/*</button>*/}

                    {/*{this.addNewStatistic()}*/}
                    {/*{this.showStatistics()}*/}
                </div>
            </>
        )

    }
}

export default TrainingPlanComponent;
