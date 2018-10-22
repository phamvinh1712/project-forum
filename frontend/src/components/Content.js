import React, {Component} from 'react';
import './screen.css';
import {Link} from 'react-router-dom';
const API = '/api/threads/';

export default class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
  }

  componentDidMount() {
    fetch(API)
      .then(function (response) {
        if (response.ok)
          return response.json()
        else {
          throw new Error('Something went wrong');
        }
      })
      .then(data => {
        this.setState({list: data});
      })
      .catch((error) => {
        console.log(error)
      });
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
                  <Link to={"/Subthread/" + value1.id.toString()}>
                    <dt>{value1.sub_thread_title}</dt>
                  </Link>
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


