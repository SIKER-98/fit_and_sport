import React, {Component} from "react";

class TrainingPlanComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plan: props.location.state.plan,

            selectedExercise: 0,
            editingSeries: 0,
            editingRepetitions: 0,

            newStatistic: false,
            showStatistics: false,
        }

        this.handleChange = this.handleChange.bind(this)
        this.tableRowGenerate = this.tableRowGenerate.bind(this)
    }

    testExcercises = [
        {id: 1, exerciseName: 'exercise 1', isSelected: false},
        {id: 2, exerciseName: 'exercise 2', isSelected: false},
        {id: 3, exerciseName: 'exercise 3', isSelected: false},
        {id: 4, exerciseName: 'exercise 4', isSelected: false},
        {id: 5, exerciseName: 'exercise 5', isSelected: false},
        {id: 6, exerciseName: 'exercise 6', isSelected: false},
    ]

    // przechwytywanie zmian w inputach
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    // zmiany ilosc cwiczen
    updateItem(event, selectedExercises) {
        event.preventDefault();

        let exercises = this.state.plan.exercises;
        exercises.forEach(exercise => {
            exercise.isEditing = exercise.id === selectedExercises.id;
        });

        this.setState({
            editingSeries: selectedExercises.series,
            editingRepetitions: selectedExercises.repetitions,
            trainingPlans: exercises
        });
    }

    // zakonczenie edycji cwiczenia
    saveChange(event, selectedExercises) {
        let plan = this.state.plan;
        plan.exercises.forEach(exercise => {
            exercise.isEditing = false;

            //TODO: Update training plan item

            if (exercise.id === selectedExercises.id) {
                exercise.series = this.state.editingSeries;
                exercise.repetitions = this.state.editingRepetitions;
            }
        });


        this.setState({plan: plan});
    }

    deleteItem(event, id) {
        let plan = this.state.plan;
        plan.exercises = plan.exercises.filter(exercise => exercise.id !== id)

        //TODO: delete training plan item

        this.setState({plan: plan});
    }


    // generowanie wierszy tabeli
    tableRowGenerate() {
        return this.state.plan.exercises.map(exercise => {
                return (
                    <tr key={exercise.id}>
                        <td>{exercise.id}</td>
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
                                        onClick={(event) => this.deleteItem(event, exercise.id)}>
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
                                        onClick={(event) => this.deleteItem(event, exercise.id)}>
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

    addExerciseToPlan() {
        let plan = this.state.plan


        if (this.state.selectedExercise * 1 !== 0) {
            const exercise = this.testExcercises.filter(element => element.id === this.state.selectedExercise * 1
            )
            let newExercises = exercise[0]
            newExercises.description = 'new Element'
            newExercises.series = 0
            newExercises.repetitions = 0


            plan.exercises.push(newExercises)


            this.setState({plan: plan})
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
                            {this.testExcercises.map(item => (
                                <option value={item.id}
                                        key={item.id}
                                >
                                    {item.exerciseName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button className={'submit-button'}
                            onClick={() =>
                                this.setState({newStatistic: true})}
                    >
                        Add new
                        Statistic
                    </button>
                    <button className={'submit-button'}
                            onClick={() =>
                                this.setState({showStatistics: true})}
                    >
                        Show
                        statistic
                    </button>

                    {this.addNewStatistic()}
                    {this.showStatistics()}
                </div>
            </>
        )

    }
}

const TrainingPlanRow = (props) => {

}

export default TrainingPlanComponent;
