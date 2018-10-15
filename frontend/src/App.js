import React, { Component } from 'react';
const API = 'api/report/';
class App extends Component {
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
        this.setState({list : data});
          })
    }

  render() {
    return (
      <div>
        {this.state.list.map(item => (
          <div>
            <td>{item.id}</td>
            <td>{item.type}</td>
            <td>{item.status}</td>
            <td>{item.create_time}</td>
            <td>{item.user}</td>
            <td>{item.post}</td>
            <td>{item.comment}</td>
            <td>{item.reply}</td>
            <td>{item.hashtag}</td>
          </div>
          ))
        }
      </div>

    );
  }
}

export default App;