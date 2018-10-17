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
          <li className="active">
          <Link to={"/admin"}>
             <i className="fa fa-home" />
              <span className="cur" />
              Home <span className="arrow" />
          </Link>
          </li>
         <li  className="dropdown" style = {{cursor:"pointer"}}>
            <a className="button" onClick={this.showDropdownMenu}>
                 <i className="fa fa-info-circle" />
                 <span className="cur" />
             About
                <span className="arrow1">
                                <i className="fa fa-angle-down" />
                </span>
            </a>
             {this.state.displayMenu ? (
                     <ul>
                         <li><a className="active" href="#Create Page">Purpose</a></li>
                         <li><Link to={"/admin"}>Terms</Link></li>
                     </ul>
                 ):
                 (
                     null
                 )
             }
         </li>

          <li className="dropdown" style={{cursor:"pointer"}}>
            <a className="button" onClick={this.showDropdownMenu2}>
                <i className="fa fa-forumbee" />
                <span className="cur" />
                Forum
                <span className="arrow2">
                    <i className="fa fa-angle-down" />
                </span>
            </a>
              {this.state.displayMenu2 ? (
                  <ul>
              <li>
                     <Link to={"/admin"}>Top</Link>
              </li>
              <li>
                     <Link to={"/admin"}>Hot</Link>
              </li>
              <li>
                     <Link to={"/admin"}>Transport</Link>
              </li>
            </ul>
              ):
                  (
                      null
                  )

              }
          </li>
          <li>
            <Link to={"/admin"}>
              <i className="fa fa-comment" />
              <span className="cur" />
              Livechat
            </Link>
          </li>
          <li>
            <Link to={"/admin"}>
              <i className="fa fa-phone-square" />
              <span className="cur" />
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    );
  }
}

export default sidebarMenu;