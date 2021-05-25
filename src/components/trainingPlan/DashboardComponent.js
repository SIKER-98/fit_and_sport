import React, {Component} from "react";

import '../../styles/dashboardStyle.css'

class DashboardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            trainingPlans: [],

            editingName: '',
            editingDescription: '',
        }

        this.handleChange = this.handleChange.bind(this);
    }

    //TODO: do wyjebania
    componentDidMount() {
        this.setState({trainingPlans: this.testItems})
    }

    // przechwytywanie zmian w inputach
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    testItems = [
        {
            id: 1, planName: 'test1', description: 'description1', isEditing: false, exercises: [
                {
                    id: 1,
                    exerciseName: 'excercise1',
                    description: 'description1',
                    series: 1,
                    repetitions: 15,
                    isEditing: false
                },
                {
                    id: 2,
                    exerciseName: 'excercise2',
                    description: 'description2',
                    series: 2,
                    repetitions: 30,
                    isEditing: false
                },
                {
                    id: 3,
                    exerciseName: 'excercise3',
                    description: 'description3',
                    series: 3,
                    repetitions: 45,
                    isEditing: false
                },
                {
                    id: 4,
                    exerciseName: 'excercise4',
                    description: 'description4',
                    series: 4,
                    repetitions: 60,
                    isEditing: false
                },
            ]
        },
        {
            id: 2, planName: 'test2', description: 'description2', isEditing: false, exercises: [
                {
                    id: 1,
                    exerciseName: 'excercise1',
                    description: 'description1',
                    series: 1,
                    repetitions: 15,
                    isEditing: false
                },
                {
                    id: 2,
                    exerciseName: 'excercise2',
                    description: 'description2',
                    series: 2,
                    repetitions: 30,
                    isEditing: false
                },
                {
                    id: 3,
                    exerciseName: 'excercise3',
                    description: 'description3',
                    series: 3,
                    repetitions: 45,
                    isEditing: false
                },
                {
                    id: 4,
                    exerciseName: 'excercise4',
                    description: 'description4',
                    series: 4,
                    repetitions: 60,
                    isEditing: false
                },
            ]
        },
        {
            id: 3, planName: 'test3', description: 'description3', isEditing: false, exercises: [
                {
                    id: 1,
                    exerciseName: 'excercise1',
                    description: 'description1',
                    series: 1,
                    repetitions: 15,
                    isEditing: false
                },
                {
                    id: 2,
                    exerciseName: 'excercise2',
                    description: 'description2',
                    series: 2,
                    repetitions: 30,
                    isEditing: false
                },
                {
                    id: 3,
                    exerciseName: 'excercise3',
                    description: 'description3',
                    series: 3,
                    repetitions: 45,
                    isEditing: false
                },
                {
                    id: 4,
                    exerciseName: 'excercise4',
                    description: 'description4',
                    series: 4,
                    repetitions: 60,
                    isEditing: false
                },
            ]
        },
        {
            id: 4, planName: 'test4', description: 'description4', isEditing: false, exercises: [
                {
                    id: 1,
                    exerciseName: 'excercise1',
                    description: 'description1',
                    series: 1,
                    repetitions: 15,
                    isEditing: false
                },
                {
                    id: 2,
                    exerciseName: 'excercise2',
                    description: 'description2',
                    series: 2,
                    repetitions: 30,
                    isEditing: false
                },
                {
                    id: 3,
                    exerciseName: 'excercise3',
                    description: 'description3',
                    series: 3,
                    repetitions: 45,
                    isEditing: false
                },
                {
                    id: 4,
                    exerciseName: 'excercise4',
                    description: 'description4',
                    series: 4,
                    repetitions: 60,
                    isEditing: false
                },
            ]
        },
    ]

    // wybranie planu treningowego
    selectItem(event, plan) {
        event.preventDefault();

        this.props.history.push({
            pathname: '/plan',
            state: {plan: plan},
        })
    }

    // rozpoczecie edycji planu
    editItem(event, p) {
        event.preventDefault();

        let plans = this.state.trainingPlans;
        plans.forEach(plan => {
            plan.isEditing = plan.id === p.id;
        });

        this.setState({
            editingName: p.planName,
            editingDescription: p.description,
            trainingPlans: plans
        });
    }

    // zakonczenie edycji planu
    saveChange(event, p) {
        let plans = this.state.trainingPlans;
        plans.forEach(plan => {
            plan.isEditing = false;

            if (plan.id === p.id) {
                plan.planName = this.state.editingName;
                plan.description = this.state.editingDescription;
            }
        });

        //TODO: Edycja planu

        this.setState({trainingPlans: plans});
    }

    // usuwanie planu
    deleteItem(event, id) {
        event.preventDefault()

        let plans = this.state.trainingPlans
        plans = plans.filter(plan => plan.id !== id)

        //TODO:usuniecie planu

        this.setState({trainingPlans: plans})
    }

    // generowanie wierszy tabeli
    tableRowGenerate() {
        return this.state.trainingPlans.map(plan => {
                return (
                    <tr key={plan.id}>
                        <td>{plan.id}</td>
                        {!plan.isEditing &&
                        <>
                            <td>{plan.planName}</td>
                            <td>{plan.description}</td>
                            <td className={'action'}>
                                <button className={'action-button button-green'}
                                        onClick={(event) =>
                                            this.selectItem(event, plan)}
                                >
                                    Select
                                </button>
                                <button className={'action-button button-orange'}
                                        onClick={(event) =>
                                            this.editItem(event, plan)}
                                >
                                    Edit
                                </button>
                                <button className={'action-button button-red'}
                                        onClick={(event) =>
                                            this.deleteItem(event, plan.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </>
                        }
                        {plan.isEditing &&
                        <>
                            <td><input type={'text'}
                                       className={'table-input'}
                                       defaultValue={this.state.editingName}
                                       name={'editingName'}
                                       autoComplete={'off'}
                                       onChange={this.handleChange}
                            />
                            </td>
                            <td>
                                <input type={'text'}
                                       className={'table-input'}
                                       autoComplete={'off'}
                                       defaultValue={this.state.editingDescription}
                                       name={'editingDescription'}
                                       onChange={this.handleChange}/>

                            </td>

                            <td className={'action'}>
                                <button className={'action-button button-green'}
                                        onClick={(event) =>
                                            this.selectItem(event, plan)}
                                >
                                    Select
                                </button>
                                <button className={'action-button button-green'}
                                        onClick={(event) =>
                                            this.saveChange(event, plan)}
                                >
                                    Save
                                </button>
                                <button className={'action-button button-red'}
                                        onClick={(event) =>
                                            this.deleteItem(event, plan.id)}
                                >
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

    render() {
        return (
            <div className={'dashboard'}>
                <h1>Your training plans:</h1>
                <table className={'dashboard-table'}>
                    <thead className={'dashboard-table-head'}>
                    <tr className={'line-bottom'}>
                        <th width={'5%'}>Id:</th>
                        <th width={'25%'}>Training plan name:</th>
                        <th width={'50%'}>Description:</th>
                        <th width={'20%'}>Actions</th>
                    </tr>
                    </thead>
                    <tbody className={'dashboard-table-body'}>
                    {this.tableRowGenerate()}
                    </tbody>
                </table>
            </div>
        )
    }
}


export default DashboardComponent;
