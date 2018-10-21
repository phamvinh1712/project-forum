import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";
import './SubThread.css';
import Chip from "@material-ui/core/Chip/Chip";

function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}


function getSorting(order, orderBy) {
  return order === "desc"
    ? (a, b) => desc(a, b, orderBy)
    : (a, b) => -desc(a, b, orderBy);
}

const rows = [
  {
    id: "picture",
    numeric: false,
    disablePadding: true,
    label: ""
  },
  {
    id: "title",
    numeric: true,
    disablePadding: false,
    label: "Topic Title"
  },
  {id: "count_view", numeric: true, disablePadding: false, label: "View"},
  {id: "create_time", numeric: true, disablePadding: false, label: "Date Start"},
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      order,
      orderBy
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          {rows.map(row => {
            return (
              <MuiThemeProvider theme={MultiCelltheme}>

                <TableCell key={row.id}
                           sortDirection={orderBy === row.id ? order : false}
                >
                  <Tooltip
                    title="Sort"
                    enterDelay={300}
                    placement={"bottom-end"}
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={this.createSortHandler(row.id)}
                    >
                      {row.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              </MuiThemeProvider>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const PaginationTheme = createMuiTheme({
  overrides: {
    MuiFlatPagination: {
      root: {
        fontSize: "15px",
      },
      text: {
        fontSize: "15px"
      }
    }
  }
});


const MultiCelltheme = createMuiTheme({
  overrides: {
    // Name of the component ️ / style sheet
    MuiTableCell: {

      // Name of the rule
      head: {
        fontSize: "25px",
        height: 70,
        color: 'black',

      },
      numeric: {
        color: 'black',
        height: 70,
        fontSize: "16px",
        textAlign: "left",
      },
      footer: {
        fontSize: "20px",
      }
    },
  },
});


const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 4,
    margin: 'auto'
  },
  table: {
    maxWidth: "100%",
    padding: "20px",
  },
  tableWrapper: {
    overflowX: "auto",
  }
});


class PostList extends React.Component {
  state = {
    order: "asc",
    orderBy: "count_view",
    Posts: [],
    page: 0,
    rowsPerPage: 10,
    thread: [],
    nextpage: '/api/posts?search=',
    offset: 0,
    total: 0,
  };

  componentDidMount() {
    this.handleSearch(this.props.match.params.param)

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.param !== this.props.match.params.param) {
      this.handleSearch(nextProps.match.params.param)
    }
  }

  handleSearch = (param) => {
    if (!param) param = ''
    let url = '/api/posts?search=' + param

    fetch(url, {
      method: 'GET',
    })
      .then(res => {
        return res.json();
      }).then(json => {
      this.setState({Posts: json.results, nextpage: json.next, total: json.count})
    })
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    this.setState({order, orderBy});
  };

  handleClick = (event, id) => {
    let temp = "/posts/" + id;
    this.props.history.push(temp);
  };
  handleClickHashtag = (event, id) => {
    let temp = "/hashtag/" + id;
    this.props.history.push(temp);
  }

  handleChangePage(offset) {
    let param = (this.props.match.params.param) ? this.props.match.params.param.toString() : ""
    let page = (offset / 10 + 1).toString()
    let url = '/api/posts?page=' + page + '&search=' + param
    fetch(url, {
      method: 'GET',
    })
      .then(res => {
        return res.json();
      }).then(json => {
      this.setState({Posts: json.results, nextpage: json.next, offset})
    });
  }


  render() {
    const {classes} = this.props;
    const {Posts, order, orderBy, rowsPerPage, page} = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, Posts.length - page * rowsPerPage);

    return (

      <Paper className={classes.root}>

        <div style={{
          width: "90%",
          margin: '0 auto',
          height: 1000
        }} className={classes.tableWrapper}>
          <h2>{this.state.total} result(s) found</h2>
          <Table className={classes.table} aria-labelledby="tableTitle">

            <colgroup>
              <col style={{width: '1%'}}/>
              <col style={{width: '50%'}}/>
              <col style={{width: '20%'}}/>
              <col style={{width: '20%'}}/>
            </colgroup>
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={this.handleRequestSort}
              rowCount={Posts.length}
            />
            <TableBody>
              {stableSort(Posts, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow


                      tabIndex={-1}
                      key={n.id}
                    >
                      <MuiThemeProvider theme={MultiCelltheme}>
                        <TableCell numeric>
                          <div><img src={n.user.profile.avatar} width="40" height="40"/></div>
                        </TableCell>
                        <TableCell numeric component="th" scope="row">
                          <div onClick={event => this.handleClick(event, n.id)}> {n.title} <br/></div>
                          <div style={{
                            fontSize: "1rem",
                          }}>  {n.user.username} {n.hashtags.map(value =>
                            <Chip
                              label={value.name}
                              className={classes.chip}
                              onClick={event => this.handleClickHashtag(event, value.id)}/>
                          )}</div>
                        </TableCell>
                        <TableCell numeric>{n.view_count}</TableCell>
                        <TableCell numeric>{n.create_time}</TableCell>
                      </MuiThemeProvider>
                    </TableRow>
                  )
                    ;
                })}
              <TableFooter>
                <TableRow>

                </TableRow>

              </TableFooter>
            </TableBody>
          </Table>
          <div className={"pagination"}>
            <MuiThemeProvider theme={PaginationTheme}>

              <CssBaseline/>
              <Pagination
                limit={10}
                offset={this.state.offset}
                total={this.state.total}
                onClick={(e, offset) => this.handleChangePage(offset)}
                size={'large'}
              />
            </MuiThemeProvider>
          </div>

        </div>

      </Paper>
    );
  }
}

PostList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PostList);