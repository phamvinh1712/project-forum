import React, { Component } from 'react';

const avatar = props => (
<div>
  $(document).ready(function() {'{'}
  var readURL = function(input) {'{'}
  if (input.files &amp;&amp; input.files[0]) {'{'}
  var reader = new FileReader();
  reader.onload = function (e) {'{'}
  $('.avatar').attr('src', e.target.result);
  {'}'}
  reader.readAsDataURL(input.files[0]);
  {'}'}
  {'}'}
  $(".file-upload").on('change', function(){'{'}
  readURL(this);
  {'}'});
  {'}'});
</div>
);

export default avatar;