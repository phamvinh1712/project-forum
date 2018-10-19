import React from "react";
import './sidebar-menu.css';
import {Link} from 'react-router-dom';
class sidebarMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMenu: false,
            displayMenu2: false,
        };
        this.showDropdownMenu2 = this.showDropdownMenu2.bind(this);
        this.hideDropdownMenu2 = this.hideDropdownMenu2.bind(this);
        this.showDropdownMenu = this.showDropdownMenu.bind(this);
        this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
    };
 

    showDropdownMenu2(event2){
        event2.preventDefault();
         this.setState({displayMenu2: true}, () => {
            document.addEventListener('click', this.hideDropdownMenu2);
        });
    }
    hideDropdownMenu2() {
        this.setState({displayMenu2: false}, () => {
            document.removeEventListener('click', this.hideDropdownMenu2);
        });

    }
    showDropdownMenu(event) {
        event.preventDefault();
        this.setState({displayMenu: true}, () => {
            document.addEventListener('click', this.hideDropdownMenu);
        });
    }

    hideDropdownMenu() {
        this.setState({displayMenu: false}, () => {
            document.removeEventListener('click', this.hideDropdownMenu);
        });
    }
  render(){
    return (
      <nav id="sidebar">
        <div className="sidebar-header">
          <h3>Header</h3>
        </div>
        <ul className=" components">

          <li>
            <Link to={"/admin/report/"}>
              <i className="fa fa-comment" />
              <span className="cur" />
              Report
            </Link>
          </li>
          <li>
            <Link to={"/admin/threads/"}>
              <i className="fa fa-phone-square" />
              <span className="cur" />
              Thread management
            </Link>
          </li>
          <li>
            <Link to={"/admin/users"}>
              <i className="fa fa-phone-square" />
              <span className="cur" />
              User management
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default sidebarMenu;