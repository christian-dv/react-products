import React, {Component} from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {login} from "../actions/auth";
import logo from '../login.png';

class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {
        nombreUsuario: '',
        password: '',
        loading: false,
        errors: {},
      };
    }
  
    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    };
  
    validateForm = () => {
      const { nombreUsuario, password } = this.state;
      const errors = {};
      if (!nombreUsuario) errors.nombreUsuario = 'El nombre de usuario es requerido';
      if (!password) errors.password = 'La contraseña es requerida';
      return errors;
    };
  
    handleLogin = (e) => {
      e.preventDefault();
  
      this.setState({ loading: true, errors: {} });
  
      const errors = this.validateForm();
      if (Object.keys(errors).length > 0) {
        this.setState({ loading: false, errors });
        return;
      }
  
      const { dispatch, history } = this.props;
  
      dispatch(login(this.state.nombreUsuario, this.state.password))
        .then(() => {
          history.push("/productos");
          window.location.reload();
        })
        .catch(() => {
          this.setState({ loading: false });
        });
    };
  
    render() {
      const { isLoggedIn, message } = this.props;
      const { nombreUsuario, password, loading, errors } = this.state;
  
      if (isLoggedIn) {
        return <Redirect to="/productos" />;
      }
  
      return (
        <div className="col-md-12">
          <div className="card bg-light text-dark">
            <h1><center>Login</center></h1>
  
            <img src={logo} width="150" height="150" alt="" className="text-center mx-auto" />
  
            <form onSubmit={this.handleLogin}>
              <div className="form-group mx-3 my-3">
                <label htmlFor="nombreUsuario">Usuario:</label>
                <input
                  type="text"
                  className={`form-control ${errors.nombreUsuario ? 'is-invalid' : ''}`}
                  name="nombreUsuario"
                  value={nombreUsuario}
                  onChange={this.handleChange}
                />
                {errors.nombreUsuario && <div className="invalid-feedback">{errors.nombreUsuario}</div>}
              </div>
  
              <div className="form-group mx-3 my-3">
                <label htmlFor="password">Password:</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
  
              <div className="form-group mx-3 my-3">
                <button className="btn btn-dark btn-block" disabled={loading}>
                  {loading && <span className="spinner-border spinner-border-sm"></span>}
                  <span>Login</span>
                </button>
              </div>
  
              {message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {message}
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      );
    }
  }

function mapStateToProps(state){
    const {isLoggedIn} = state.auth;
    const {message} = state.message;

    return {
        isLoggedIn,
        message
    };
}

export default connect(mapStateToProps)(Login);
