const API = '/api/report/';

function use() {
    fetch(API,
    {
      method: 'GET',
    }
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })
  }
use();