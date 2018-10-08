import React, { Component } from 'react';
import test from '../data/test.json'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

 class SubThreadDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            PageAmount: 0,
            NextPage: 0,
            Topics  : []

        };

    }

    componentDidMount() {
        const tempArray = this.state.Topics.slice();
        let Topic = test.Topics.map((Topic) => {
                const newTopic  = {'id': Topic.Id, 'title': Topic.Title, 'view': Topic.View, 'ds': Topic.DateStart };
                tempArray.push(newTopic);
        })
        this.setState({PageAmount : test.PageAmount,
                    NextPage : test.NextPage,
                    Topics: tempArray});
    }
        render() {
            const columns = [{
                              header: 'Id',
                              accessor: 'id'
                            }, {
                              header: 'Title',
                              accessor: 'title',
                              Cell: props => <span className='number'>{props.value}</span>
                           }, {
                              header: 'View',
                              accessor: 'view',
                              Cell: props => <span className='number'>{props.value}</span>
                            }, {
                              header: 'Date Start',
                              accessor: 'ds',
                              Cell: props => <span className='number'>{props.value}</span>
                            }];

            return (

                <div>
                    <ReactTable
                        data={this.state.Topics}
                        columns={columns}
                        defaultPageSize={3}
                    />
                </div>

            );
        }

}

export default SubThreadDisplay;
