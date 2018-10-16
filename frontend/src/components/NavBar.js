import React, {Component} from "react";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import {withStyles} from '@material-ui/core/styles';
import {fade} from '@material-ui/core/styles/colorManipulator';
import './NavBar.css';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import {DropdownButton} from 'react-bootstrap';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// navigation bar with search bar UI and 2 button link to login page and register page
const styles = theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  grow: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: 200,
      },
    },
  },
});

class navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      user: props.user
    }

  };


  handleProfileMenuOpen = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleMenuClose = () => {
    this.setState({anchorEl: null});
  };


  render() {
    const {classes} = this.props;
    const isMenuOpen = Boolean(this.state.anchorEl);
    const renderUser = (
      <div>
        <IconButton color="inherit">
          <Badge className={classes.margin} badgeContent={17} color="secondary">
            <NotificationsIcon/>
          </Badge>
        </IconButton>
        <IconButton
          aria-owns={isMenuOpen ? 'material-appbar' : null}
          aria-haspopup="true"
          onClick={this.handleProfileMenuOpen}
          color="inherit"
        >
          <AccountCircle/>
        </IconButton>
      </div>
    )

    const renderForm = (
      <div>
        <Link to="/Login">
          <Button variant="contained" className={'Login'}>
            Login
          </Button>
        </Link>
        <Link to="/Register">
          <Button variant="contained" color="secondary" className={'SignUp'}>
            Sign Up
          </Button>
        </Link>
      </div>)

    const renderUserMenu = (
      <Menu
        anchorEl={this.state.anchorEl}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleClose}>My account</MenuItem>
      </Menu>
    );

    return (
      <header className="navbar">
        <nav className="navbar_navigation">
          <div className="navbar_logo"><span href="/">THE LOGO</span></div>
          <div className={"dropdownb"}>
            <DropdownButton className={"Button1"}
                            title={"Ducati"}
                            key={1}
                            id={`dropdown-basic-${1}`}
            >
              <MenuItem eventKey="1">Action</MenuItem>
              <MenuItem eventKey="2">Another action</MenuItem>
              <MenuItem eventKey="3" active>
                Active Item
              </MenuItem>
              <MenuItem divider/>
              <MenuItem eventKey="4">Separated link</MenuItem>
            </DropdownButton>
          </div>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon/>
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <div className={classes.grow}/>
          <div>
            {
              (localStorage.getItem('token') === null)
                ? renderForm
                : renderUser

            }
          </div>


        </nav>
        {renderUserMenu}
      </header>
    );
  }
}

export default withStyles(styles)(navbar)