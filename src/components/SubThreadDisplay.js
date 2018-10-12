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
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tooltip from "@material-ui/core/Tooltip";
import {lighten} from "@material-ui/core/styles/colorManipulator";
import test from '../data/test.json'
import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Pagination from "material-ui-flat-pagination";
import CssBaseline from "@material-ui/core/CssBaseline";


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
  {id: "view", numeric: true, disablePadding: false, label: "View"},
  {id: "ds", numeric: true, disablePadding: false, label: "Date Start"},
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
        fontSize: "2rem",
      },
      text: {
        fontSize: "2rem"
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
        fontSize: "4rem",
        color: 'black',

      },
      numeric: {
        color: 'blue',
        height: 100,
        fontSize: "2rem",
        textAlign: "left",
      },
      footer: {
        fontSize: "5rem",
      }
    },
  },
});


const toolbarStyles = theme => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    paddingRight: theme.spacing.unit,
    height: 100
  },
  highlight:
    theme.palette.type === "light"
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        fontSize: "10pt"

      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
        fontSize: "10pt"

      },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "100 0 auto",
    fontSize: "100px"

  }
});

let EnhancedTableToolbar = props => {
  const {numSelected, classes} = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="h1" id="tableTitle">
            Nutrition
          </Typography>
        )}
      </div>
      <div className={classes.spacer}/>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 4,
  },
  table: {
    minWidth: 1500,
    padding: "1000px",
  },
  tableWrapper: {
    overflowX: "auto",
  }
});


class EnhancedTable extends React.Component {
  state = {
    order: "asc",
    orderBy: "view",
    Topics: [],
    page: 0,
    rowsPerPage: 10
  };

  componentDidMount() {
    const tempArray = this.state.Topics.slice();
    let Topic = test.Topics.map((Topic) => {
      const newTopic = {'title': Topic.Title, 'view': Topic.View, 'ds': Topic.DateStart};
      tempArray.push(newTopic);
    })
    this.setState({Topics: tempArray});
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
    console.log(id)
  };

  handleChangePage = (event, page) => {
    this.setState({page});
  };


  render() {
    const {classes} = this.props;
    const {Topics, order, orderBy, rowsPerPage, page} = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, Topics.length - page * rowsPerPage);

    return (

      <Paper className={classes.root}>
        <EnhancedTableToolbar/>
        <div style={{
          width: 1500,
          margin: '0 auto',
          height: 1200
        }} className={classes.tableWrapper}>
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
              rowCount={Topics.length}
            />
            <TableBody>
              {stableSort(Topics, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(n => {
                  return (
                    <TableRow
                      onClick={event => this.handleClick(event, n.id)}
                      tabIndex={-1}
                      key={n.id}
                    >
                      <MuiThemeProvider theme={MultiCelltheme}>
                        <TableCell numeric>
                          <div><img src={require('./images/cross.png')}/></div>
                        </TableCell>
                        <TableCell numeric component="th" scope="row">
                          <div> {n.title} <br/></div>
                          <div style={{
                            fontSize: "1rem",
                          }}>  {n.ds} </div>
                        </TableCell>
                        <TableCell numeric>{n.view}</TableCell>
                        <TableCell numeric>{n.ds}</TableCell>
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
          <MuiThemeProvider theme={PaginationTheme}>

            <CssBaseline/>
            <Pagination
              limit={10}
              offset={this.state.offset}
              total={100}
              onClick={(e, offset) => this.handleClick(offset)}
              size={'large'}
            />
          </MuiThemeProvider>
        </div>

      </Paper>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);
