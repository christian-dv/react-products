import React, {Component} from "react";
import {connect} from "react-redux";
import {Modal, Button, Form} from "react-bootstrap";
import {getProducts, addProduct, deleteProduct, editProduct} from "../actions/product";
import Swal from "sweetalert2";

class Products extends Component {
    constructor(props) {
      super(props);
      this.state = {
        show: false,
        editShow: false,
        nombre: '',
        precio: '',
        editProducto: {},
        arrProductos: [], 
      };
    }
  
    componentDidMount() {
      this.fetchProducts();
    }
  
    fetchProducts = async () => {
      try {
        const productsArray = await this.props.getProducts();
        this.setState({ arrProductos: productsArray });
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    };
  
    handleClose = () => this.setState({ show: false });
    handleShow = () => this.setState({ show: true });
  
    handleSubmit = (e) => {
      e.preventDefault();
      const { nombre, precio } = this.state;
      
      this.props.addProduct(nombre, precio).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto agregado correctamente',
          showConfirmButton: false,
          timer: 1000,
        });
        this.handleClose();
        this.setState({
          nombre: '',
          precio: ''
        });
        this.fetchProducts();
      });
    };
  
    handleDelete = (id) => {
      Swal.fire({
        title: 'Estas seguro?',
        text: 'No podrás revertir esta acción!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar!',
      }).then((result) => {
        if (result.isConfirmed) {
          this.props.deleteProduct(id).then(() => {
            Swal.fire({
              position: 'center',
              title: 'Eliminado!',
              text: 'El producto ha sido eliminado con éxito.',
              icon: 'success',
              timer: 1000,
              showConfirmButton: false,
            });
            this.fetchProducts(); // Actualiza la lista después de eliminar
          });
        }
      });
    };
  
    handleEditShow = (producto) => {
      this.setState({ editProducto: producto, editShow: true });
    };
  
    handleEditClose = () => this.setState({ editShow: false });
  
    handleEditSubmit = (e) => {
      e.preventDefault();
      const { editProducto } = this.state;
  
      this.props.editProduct(editProducto.id, editProducto.nombre, editProducto.precio).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Producto actualizado',
          showConfirmButton: false,
          timer: 1000,
        });
        this.handleEditClose();
        this.fetchProducts();
      });
    };
  
    handleInputChange = (e) => {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    };
  
    handleEditInputChange = (e) => {
      const { name, value } = e.target;
      this.setState(prevState => ({
        editProducto: {
          ...prevState.editProducto,
          [name]: value,
        },
      }));
    };
  
    render() {
      const { show, editShow, arrProductos, editProducto } = this.state;
  
      return (
        <div>
          <Button variant="primary" onClick={this.handleShow} className="mb-4">
            Nuevo producto
          </Button>
  
          <Modal show={show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Agregar producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre:</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={this.state.nombre}
                    onChange={this.handleInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Precio:</Form.Label>
                  <Form.Control
                    type="text"
                    name="precio"
                    value={this.state.precio}
                    onChange={this.handleInputChange}
                    required
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button variant="success" type="submit">
                    Guardar
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
  
          <Modal show={editShow} onHide={this.handleEditClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar producto</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={this.handleEditSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={editProducto.nombre}
                    onChange={this.handleEditInputChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Precio</Form.Label>
                  <Form.Control
                    type="text"
                    name="precio"
                    value={editProducto.precio}
                    onChange={this.handleEditInputChange}
                    required
                  />
                </Form.Group>
                <div className="d-grid gap-2">
                  <Button variant="primary" type="submit">
                    Actualizar
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
  
          <div className="container mt-4">
            <h2 className="text-center mb-4">Lista de productos</h2>
            <div className="d-flex justify-content-center">
              <table className="table table-hover w-75">
                <thead className="table-light">
                  <tr>
                    <th className="bg-warning">ID</th>
                    <th className="bg-warning">Nombre</th>
                    <th className="bg-warning">Precio</th>
                    <th className="text-center bg-warning">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {arrProductos.map((producto, index) => (
                    <tr key={producto.id}>
                      <td>{index + 1}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.precio}</td>
                      <td className="text-center">
                        <Button variant="success" className="me-2" onClick={() => this.handleEditShow(producto)}>Editar</Button>
                        <Button variant="danger" onClick={() => this.handleDelete(producto.id)}>Eliminar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      );
    }
  }

  const mapStateToProps = (state) => {
    return {
      productos: state.product,
    };
  };
  
  export default connect(mapStateToProps, { getProducts, addProduct, editProduct, deleteProduct })(Products);