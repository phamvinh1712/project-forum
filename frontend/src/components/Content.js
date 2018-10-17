import React, {Component} from 'react';
import './screen.css';
const API = 'api/thread/';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.setState({list: data});
      })
  }

  render() {
    return (
      <div id="content">
        {this.state.list.map(value => (
          <div>
            <h4>{value.title}</h4>
            <dl>
              {value.sub_thread.map(value1 => (
                <div>
                  <dt>{value1.sub_thread_title}</dt>
                  <dd>
                    {value1.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>))}
      </div>
    )
  }
}


