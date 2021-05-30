import React, {Component} from "react";

import '../../styles/dashboardStyle.css'
import {deleteTrainingPlan, editTrainingPlan, getUserTrainingPlans} from "../../api";

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

    async componentDidMount() {
        // const response = await fetchTrainingPlans()
        const response = await getUserTrainingPlans(sessionStorage.getItem('userId'))

        if (response.status === 200)
            this.setState({trainingPlans: response.plans})
    }

    // przechwytywanie zmian w inputach
    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

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
    async saveChange(event, p) {
        let plans = this.state.trainingPlans;

        let updatedPlan = null

        plans.forEach(plan => {
            plan.isEditing = false;

            if (plan.id === p.id) {
                plan.planName = this.state.editingName;
                plan.description = this.state.editingDescription;
                updatedPlan = plan
            }
        });

        let response = await editTrainingPlan(updatedPlan)

        if (response === 200)
            this.setState({trainingPlans: plans});
    }

    // usuwanie planu
    async deleteItem(event, id) {
        event.preventDefault()

        let plans = this.state.trainingPlans
        let deleted = plans.filter(plan => plan.id === id)[0]

        //TODO: usuwanie planu - usuwanie cwiczen
        const status = await deleteTrainingPlan(deleted.id)

        if (status === 200) {
            plans = plans.filter(plan => plan.id !== id)
            this.setState({trainingPlans: plans})
        }
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
