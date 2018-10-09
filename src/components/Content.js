import React, { Component } from 'react';
import './screen.css';

const content = props => (
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

export default content;