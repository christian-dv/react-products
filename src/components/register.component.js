import React, {Component} from "react";
import { connect } from "react-redux";
import {register} from "../actions/auth";
import Swal from "sweetalert2";

class Register extends Component {
    constructor(props) {
      super(props);
      this.state = {
        nombre: '',
        nombreUsuario: '',
        email: '',
        password: '',
        successful: false,
        errors: {},
      };
    }
  
    handleChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    };

    validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
  
    validateForm = () => {
      const { nombre, nombreUsuario, email, password } = this.state;
      const errors = {};
      if (!nombre) errors.nombre = 'El nombre es requerido';
      if (!nombreUsuario) errors.nombreUsuario = 'El nombre de usuario es requerido';
      if (!email) {
        errors.email = 'El email es requerido';
      } else if (!this.validateEmail(email)) {
        errors.email = 'El email no es válido';
      }
      if (!password) {
        errors.password = 'La contraseña es requerida';
      } else if (password.length < 6) {
        errors.password = 'La contraseña debe tener al menos 6 caracteres';
      }    
      return errors;
    };
  
    handleRegister = (e) => {
      e.preventDefault();
  
      this.setState({ successful: false, errors: {} });
  
      const errors = this.validateForm();
      if (Object.keys(errors).length > 0) {
        this.setState({ errors });
        return;
      }
  
      this.props.dispatch(register(this.state.nombre, this.state.nombreUsuario, this.state.email, this.state.password))
        .then(() => {
          this.setState({ successful: true });
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario registrado correctamente',
            showConfirmButton: false,
            timer: 1000,
          });
          setTimeout(() => this.props.history.push("/login"), 1000);
        })
        .catch(() => {
          this.setState({ successful: false });
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Ha surgido un problema!',
            showConfirmButton: false,
            timer: 1000,
          });
        });
    };
  
    render() {
      const { message } = this.props;
      const { nombre, nombreUsuario, email, password, successful, errors } = this.state;
  
      return (
        <div className="col-md-12">
          <div className="card bg-light text-dark">
            <h1><center>Registro de usuario</center></h1>
            <form onSubmit={this.handleRegister}>
              {!successful && (
                <div>
                  <div className="form-group mx-3 my-3">
                    <label htmlFor="nombre">Nombre:</label>
                    <input
                      type="text"
                      className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                      name="nombre"
                      value={nombre}
                      onChange={this.handleChange}
                    />
                    {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
                  </div>
                  <div className="form-group mx-3 my-3">
                    <label htmlFor="nombreUsuario">Nombre de usuario:</label>
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
                    <label htmlFor="email">Email:</label>
                    <input
                      type="text"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
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
                    <button className="btn btn-dark btn-block">Sign Up</button>
                  </div>
                </div>
              )}
  
              {message && (
                <div className="form-group">
                  <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
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
    const {message} = state.message;
    return {message, };
}

export default connect(mapStateToProps)(Register);



