import React, { Component } from 'react';
import './screen.css';
import React from "react";

const API = 'api/Thread/';

class ContentTable extends React.Component {
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
			this.setState({ list: data });
		})
	}

	render() {
		return(
			<div id="content">
				<h4>Thread 1</h4>
				<dl>
					<dt>Subthread 1</dt>
					<dd>
						Definition of subthread 1
					</dd>

					<dt>Subthread 2</dt>
					<dd>
						Definition of subthread 2
					</dd>

					<dt>Subthread 3</dt>
					<dd>
						Definition of subthread 3
					</dd>

					<dt>Subthread 4</dt>
					<dd>
						Definition of subthread 4
					</dd>

					<dt>Subthread 5</dt>
					<dd>
						Definition of subthread 5
					</dd>
				</dl> {/* END OF THREAD 1 */}
				
				<h4>Thread 2</h4>
				<dl>
					<dt>Subthread 1</dt>
					<dd>
						Definition of subthread 1
					</dd>

					<dt>Subthread 2</dt>
					<dd>
						Definition of subthread 2
					</dd>

					<dt>Subthread 3</dt>
					<dd>
						Definition of subthread 3
					</dd>

					<dt>Subthread 4</dt>
					<dd>
						Definition of subthread 4
					</dd>

					<dt>Subthread 5</dt>
					<dd>
						Definition of subthread 5
					</dd>
				</dl> {/* END OF THREAD 2 */}
				
			</div>
		)
	}
}


const content = props => (
	{this.state.list.map(function (value){
		<div id="content">
			<h4>{value[0].title}</h4>
			<dl>
				<dt>Subthread 1</dt>
				<dd>
					Definition of subthread 1
				</dd>

				<dt>Subthread 2</dt>
				<dd>
					Definition of subthread 2
				</dd>

				<dt>Subthread 3</dt>
				<dd>
					Definition of subthread 3
				</dd>

				<dt>Subthread 4</dt>
				<dd>
					Definition of subthread 4
				</dd>

				<dt>Subthread 5</dt>
				<dd>
					Definition of subthread 5
				</dd>
			</dl> {/* END OF THREAD 1 */}
			
			<h4>{value[1].title}</h4>
			<dl>
				<dt>Subthread 1</dt>
				<dd>
					Definition of subthread 1
				</dd>

				<dt>Subthread 2</dt>
				<dd>
					Definition of subthread 2
				</dd>

				<dt>Subthread 3</dt>
				<dd>
					Definition of subthread 3
				</dd>

				<dt>Subthread 4</dt>
				<dd>
					Definition of subthread 4
				</dd>

				<dt>Subthread 5</dt>
				<dd>
					Definition of subthread 5
				</dd>
			</dl> {/* END OF THREAD 2 */}
			
		</div>


	}
	
)

export default content;