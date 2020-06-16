import React, {Component} from 'react';
import Api from '../Components/Model';

class Table extends Component {
    constructor(props) {
        super(props);

        this.state = {
            peoples: [],
            nextPage: '',
            previousPage: ''
        };
    }

    async componentDidMount(page = 1) {
        let peoples = await Api.getPeoples(page);
        let nextPage = peoples.next ? new URL(peoples.next).searchParams.get("page") : '';
        let previousPage = peoples.previous ? new URL(peoples.previous).searchParams.get("page") : '';
        peoples = peoples.results;
        this.setState({
            peoples,
            nextPage,
            previousPage
        });

    }

    sortBy(name) {
        let unsortArr = this.state.peoples.slice();
        this.state.peoples.sort((a, b) => a[name] > b[name] ? 1 : -1);
        if ((unsortArr.map((m) => m[name])).toString() === (this.state.peoples.map((m) => m[name])).toString()) {
            this.state.peoples.reverse();
        }
        this.setState({
            peoples: this.state.peoples
        });
    }

    sortByInt(name) {
        let unsortArr = this.state.peoples.slice()

        this.state.peoples.sort((a, b) => {
            if (b[name] === 'unknown') {

                return -1
            } else if (a[name] === 'unknown') {

                return 1
            }

            return b[name] - a[name]
        })
        if ((unsortArr.map((m) => m[name])).toString() === (this.state.peoples.map((m) => m[name])).toString()) {
            this.state.peoples.reverse()
        }

        this.setState({
            peoples: this.state.peoples
        });
    }

    sortByYear(name) {
        let unsortArr = this.state.peoples.slice()

        this.state.peoples.sort((a, b) => {
            if (b[name] === 'unknown') {
                return -1
            } else if (a[name] === 'unknown') {
                return 1
            }

            let temporaryA = a[name].replace('BBY', '')
            let temporaryB = b[name].replace('BBY', '')

            return temporaryB - temporaryA
        })

        if ((unsortArr.map((m) => m[name])).toString() === (this.state.peoples.map((m) => m[name])).toString()) {
            this.state.peoples.reverse()
        }

        this.setState({
            peoples: this.state.peoples
        });
    }

    render() {
        let next = this.state.nextPage ? <a href="#" class="navigation" onClick={() => {
            this.componentDidMount(this.state.nextPage)
        }}>next</a> : '';
        let back = this.state.previousPage ?
            <a href="#" class="navigation" onClick={() => {
                this.componentDidMount(this.state.previousPage)
            }}>back</a> : '';

        return (
            <div>
                <table border="1">
                    <tr>
                        <th onClick={() => this.sortBy('name')}>Name</th>
                        <th onClick={() => this.sortByInt('height')}>Height</th>
                        <th onClick={() => this.sortByInt('mass')}>Mass</th>
                        <th onClick={() => this.sortByYear('birth_year')}>Birth year</th>
                        <th onClick={() => this.sortBy('gender')}>Gender</th>
                    </tr>
                    {
                        this.state.peoples.map(per => (
                            <tr>
                                <td class="column_name">{per.name}</td>
                                <td class="column_height">{per.height}</td>
                                <td class="column_mass">{per.mass}</td>
                                <td class="column_birthYear">{per.birth_year}</td>
                                <td class="column_gender">{per.gender}</td>
                            </tr>
                        ))}
                </table>
                <div>{back} {next}</div>
            </div>
        );
    }
}

export default Table;