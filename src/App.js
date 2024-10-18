import React, {Component} from "react";
import { connect } from "react-redux";
import {Router, Switch, Route, Link} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Profile from "./components/profile.component";
import Products from "./components/product.component";
import User from "./components/user.component";
import { logout } from "./actions/auth";
import {clearMessage} from "./actions/message";
import {history} from "./helpers/history";
import EventBus from "./common/EventBus";

class App extends Component{
  constructor(props){
    super(props);
    this.state = {currentUser: undefined,};

    history.listen((location)=>{
      props.dispatch(clearMessage());
    });
  }

  componentDidMount(){
    const user = this.props.user;
    if(user){
      this.setState({currentUser: user});
    }
    EventBus.on("logout", ()=>{this.logOut();});
  }

  componentWillUnmount(){
    EventBus.remove("logout");
  }

  logOut = () =>{
    this.props.dispatch(logout());
    this.setState({currentUser: undefined,});
  }

  render(){
    const {currentUser} = this.state;

    return(
      <Router history={history}>
        <div>
          <nav className="navbar navbar-expand navbar-dark" style={{backgroundColor:"#5ee3c9"}}>
            <Link to={"/"} className="navbar-brand"></Link>
            <div className="navbar-nav mr-auto">
            </div>

            {currentUser ? (
              <div className="navbar-nav ml-auto">
                <li className="nav-item"><Link to={"/productos"} className="nav-link">Productos</Link></li>
                <li className="nav-item"><Link to={"/profile"} className="nav-link">Profile</Link></li>
                <li className="nav-item"><a href="/login" className="nav-link" onClick={this.logOut}>Logout</a></li>
              </div>
            ):(
              <div className="navbar-nav ml-auto">
                <li className="nav-item"><Link to={"/login"} className="nav-link">Login</Link></li>
                <li className="nav-item"><Link to={"/register"} className="nav-link">Sign Up</Link></li>
              </div>
            )}
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/","/register"]} component={Register}/>
              <Route exact path={["/login"]} component={Login}/>
              <Route exact path={["/register"]} component={Register}/>
              <Route exact path={["/profile"]} component={Profile}/>
              <Route exact path={["/user"]} component={User}/>
              <Route exact path={["/productos"]} component={Products}/>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state){
  const {user} = state.auth;
  return {user, };
}

export default connect(mapStateToProps)(App);
