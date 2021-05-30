import React, {Component} from 'react'
import '../../styles/statisticStyle.css'
import {addRun, deleteRun, getAnalize, getUserRuns} from "../../api";

class RunningStatisticComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // date: null,
            distance: 0,
            hour: 0,
            min: 0,
            sec: 0,

            statistics: [],
        }

        this.handleChange = this.handleChange.bind(this)
    }

    async componentDidMount() {
        const response = await getUserRuns(sessionStorage.getItem('userId'))

        if (response.status === 200) {
            response.data = response.data.sort((a, b) => a.id - b.id)

            const userId = sessionStorage.getItem('userId')

            for (const item of response.data) {
                const response = await getAnalize(userId, item.id)
                item.comment = response.comment
            }

            this.setState({statistics: response.data})
        }
    }

    handleChange(event) {
        this.setState({[event.target.id]: event.target.value})
    }

    async addStatistic(event) {
        event.preventDefault()

        const time = this.state.hour * 3600 + this.state.min * 60 + this.state.sec * 1

        const response = await addRun(sessionStorage.getItem('userId'), this.state.distance, time)

        if (response.status === 200) {
            let statistics = this.state.statistics

            response.data.comment = (await getAnalize(sessionStorage.getItem('userId'), response.data.id)).comment

            statistics.push(response.data)
            this.setState({statistics: statistics})
        }
    }

    secToTime(time) {
        let s = time % 60;
        if (s < 10) s = `0${s}`

        time = Math.floor(time / 60)
        let m = time % 60
        if (m < 10) m = `0${m}`

        time = Math.floor(time / 60)
        let h = time

        return `${h}h:${m}m:${s}s`
    }

    async deleteStat(event, stat) {
        event.preventDefault()

        const status = await deleteRun(stat.id)

        if (status === 200) {
            let statistics = this.state.statistics
            statistics = statistics.filter(statistic => statistic.id !== stat.id)

            this.setState({statistics})
        }
    }

    render() {
        return (
            <div className={'content-box'}>
                <div className={'statistic-box'}>
                    <h1 className={'statistic-header'}>Add new result</h1>
                    <div>
                        <form onSubmit={(event) => this.addStatistic(event)}>
                            {/*<label htmlFor={'date'}*/}
                            {/*>Date</label>*/}
                            {/*<input id={'date'}*/}
                            {/*       type={'date'}*/}
                            {/*       onChange={this.handleChange}*/}
                            {/*/>*/}

                            <label htmlFor={'distance'}
                            >Distance</label>
                            <input type={'number'}
                                   id={'distance'}
                                   onChange={this.handleChange}
                            />

                            <label htmlFor={''}
                            >Time</label>
                            <input type="number"
                                   id={'hour'}
                                   onChange={this.handleChange}
                            /><span>h: </span>
                            <input type="number"
                                   id={'min'}
                                   onChange={this.handleChange}
                            /><span>m: </span>
                            <input type="number"
                                   id={'sec'}
                                   onChange={this.handleChange}
                            /><span>s</span>

                            <button className={'submit-button large-button'}
                                    type={'submit'}
                            >Add statistic
                            </button>
                        </form>
                    </div>
                </div>

                <div className={'statistic-box'}>
                    <h1 className={'statistic-header'}>Previous results</h1>
                    <div>
                        <table className={'statistic-table'}>
                            <thead className={'dashboard-table-head'}>
                            <tr className={'line-bottom'}>
                                <th>Id</th>
                                {/*<th>Date</th>*/}
                                <th>Distance</th>
                                <th>Time</th>
                                <th>Comment</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody className={'dashboard-table-body'}>
                            {this.state.statistics.map((stat, index) => (
                                <tr key={stat.id}>
                                    <td>{index}</td>
                                    {/*<td>{stat.date}</td>*/}
                                    <td>{stat.distance}m.</td>
                                    <td>{this.secToTime(stat.time)}</td>
                                    <td>{stat.comment}</td>
                                    <td>
                                        <button className={'action-button button-red large-button'}
                                                onClick={(event) => this.deleteStat(event, stat)}
                                        >Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <div>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RunningStatisticComponent
