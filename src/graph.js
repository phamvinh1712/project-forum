var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var TimeFormatter = function () {function TimeFormatter() {_classCallCheck(this, TimeFormatter);}_createClass(TimeFormatter, null, [{ key: 'getDefault', value: function getDefault()

    {
      return d3.time.format.multi([
      // See https://github.com/mbostock/d3/wiki/Time-Formatting#format_multi
      // which is required for a time.scale()
      ['.%L', function (d) {return d.getMilliseconds();}],
      [':%S', function (d) {return d.getSeconds();}],
      ['%I:%M', function (d) {return d.getMinutes();}],
      ['%I %p', function (d) {return d.getHours();}],
      ['%a %d', function (d) {return d.getDay() && d.getDate() != 1;}],
      ['%b %d', function (d) {return d.getDate() != 1;}],
      ['%B', function (d) {return d.getMonth();}],
      ['%Y', function () {return true;}]]);

    } }]);return TimeFormatter;}();


var formatDate = d3.time.format('%Y-%m-%d');

function drawLineGraph(options, data) {
  var description = 'Visualisation using d3.js';

  /** Make it less verbose to access default margin values */
  var margin = Object.assign(options.chart.margin);

  /** Use @mbostock's margin convention - https://bl.ocks.org/mbostock/3019563 */
  var width = options.chart.width - margin.left - margin.right;
  var height = options.chart.height - margin.top - margin.bottom;

  var allDates = [];
  var allValues = [];

  var xScale = void 0;
  var yScale = void 0;
  var xAxis = void 0;
  var yAxis = void 0;
  var lineData = void 0;

  function prepareData(data) {
    data.forEach(function (entry) {
      allDates.push(formatDate.parse(entry[0]));
      allValues.push(entry[1]);
    });
  }

  function defineScales() {
    xScale = d3.time.scale().range([0, width]);
    yScale = d3.scale.linear().range([height, 0]);
  }

  function defineAxes() {
    xAxis = d3.svg.axis().
    scale(xScale).
    orient('bottom').
    tickPadding(10) // move tick text further away from tick lines
    .tickSize(10, 0).
    ticks(5).
    tickFormat(TimeFormatter.getDefault());
    yAxis = d3.svg.axis().
    scale(yScale).
    orient('left').
    tickPadding(10) // move tick text further away from tick lines
    .tickSize(20, 0) // add space to the right of the y axis grid line (before the first marker)
    .ticks(6).
    tickFormat(function (d) {return d + '%';});
  }

  function defineLineData() {
    lineData = d3.svg.line().
    x(function (d) {
      var date = formatDate.parse(d[0]);
      return xScale(date);
    }).
    y(function (d) {
      return yScale(d[1]);
    });
  }

  function defineScaleDomains(x, y) {
    /** Set the domain of the axes using min/max values */
    x.domain(d3.extent(allDates));
    /** Given it's a percentage value from 0% to 100%, we can directly set min/max */
    y.domain([0, 100]);
  }

  function renderGraph(options, data) {
    /**
                                        * Start rendering to the view
                                        * Note:
                                        *  - The styles set below are set as default. Styles should live in the graph stylesheet
                                        *  - Visual order is determined by the order an element gets drawn to the 'canvas'
                                        */
    var svg = d3.select('#' + options.chart.id).
    append('svg').
    attr({
      'width': options.chart.width,
      'height': options.chart.height,
      'xmlns': 'http://www.w3.org/2000/svg',
      'version': '1.1' });


    /** Roll the credits */
    svg.append('desc').html(description);

    var visualisation = svg.append('g').
    attr({
      'id': 'visualisation',
      'transform': 'translate(' + margin.left + ', ' + margin.top + ')' });


    var xAxisGroup = visualisation.append('g').
    attr({
      'class': 'axis x',
      'transform': 'translate(0, ' + height + ')' }).

    call(xAxis);

    xAxisGroup.selectAll('line').
    attr({ 'stroke': '#ccc' });

    visualisation.append('g').
    attr({ 'class': 'axis y' }).
    call(yAxis);

    /** Add horizontal lines to the graph as reference points */
    visualisation.append('g').
    attr({ 'class': 'grid' }).
    call(yAxis.tickSize(-width - margin.right, 0, 0).tickFormat('')).
    selectAll('line').
    attr({ 'stroke': '#ccc' });

    visualisation.append('path').
    datum(data).
    attr({
      'id': 'visualisation-line',
      'stroke-linejoin': 'round',
      'fill': 'none',
      'stroke-width': '1px',
      'stroke': '#000',
      'd': lineData });


    visualisation.selectAll('circle').
    data(data).
    enter().
    append('circle').
    attr({
      'class': 'marker',
      'r': options.chart.markerRadius,
      'cx': function cx(d) {
        var date = formatDate.parse(d[0]);
        return xScale(date);
      },
      'cy': function cy(d) {
        return yScale(d[1]);
      } });

  }

  prepareData(data);
  defineScales();
  defineAxes();
  defineLineData();
  defineScaleDomains(xScale, yScale);
  renderGraph(options, data);
}

var graphOptions = {
  chart: {
    margin: {
      top: 20,
      right: 30,
      bottom: 30,
      left: 70 },

    width: 620,
    height: 280,
    id: 'Graph',
    markerRadius: 5 } };



var graphData = new Array();
for (var i = 0; i < 3; i++) {
  for (var y = 0; y < 11; y++) {
    graphData.push(['2016-' + (i + 1) + '-' + (y + 1), Math.round(Math.random() * 100 / 10) * 10]);
  }
}

drawLineGraph(graphOptions, graphData);