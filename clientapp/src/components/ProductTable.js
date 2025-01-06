import React, { Component } from "react";
import "../styles/ProductTable.css";
import axios from "axios";
import { Modal, Button, Form, Table, Pagination, Dropdown } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";

export class ProductTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      currentPage: 1,
      itemsPerPage: 5,
      showModal: false,
      editingProduct: null,
      formData: { name: "", artist: "", category: "Album", price: 0, stock: 0, description: "", imageUrl: "" },
      searchQuery: "",
      filterCategory: "All",
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = () => {
    axios
      .get("/api/product")
      .then((response) => {
        this.setState({ products: response.data });
      })
      .catch((error) => console.error(error));
  };

  handleOpenModal = (product = null) => {
    this.setState({
      editingProduct: product,
      formData: product || { name: "", artist: "", category: "Album", price: 0, stock: 0, description: "", imageUrl: "" },
      showModal: true,
    });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState((prevState) => ({
      formData: { ...prevState.formData, [name]: value },
    }));
  };

  handleSubmit = () => {
    const { editingProduct, formData } = this.state;
    const apiEndpoint = editingProduct ? `/api/product/${editingProduct.id}` : "/api/product";
    const method = editingProduct ? "put" : "post";

    axios[method](apiEndpoint, formData)
      .then(() => {
        this.fetchProducts();
        this.handleCloseModal();
      })
      .catch((error) => console.error(error));
  };

  handleDelete = (id) => {
    axios
      .delete(`/api/product/${id}`)
      .then(() => {
        this.fetchProducts();
      })
      .catch((error) => console.error(error));
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearchChange = (e) => {
    this.setState({ searchQuery: e.target.value });
  };

  handleFilterChange = (category) => {
    this.setState({ filterCategory: category });
  };

  getFilteredProducts = () => {
    const { products, searchQuery, filterCategory } = this.state;
    return products.filter(product => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.price.toString().includes(searchQuery.toLowerCase()) ||
        product.stock.toString().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = filterCategory === "All" || product.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  };

  render() {
    const { currentPage, itemsPerPage, showModal, formData, editingProduct, searchQuery, filterCategory } = this.state;

    const filteredProducts = this.getFilteredProducts();
    const paginatedProducts = filteredProducts.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-between mb-3">
          <div id='search' style={{ flex: 1, marginRight: '10px' }}>
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={this.handleSearchChange}
            />
          </div>
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              <FaFilter />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.handleFilterChange("All")}>All</Dropdown.Item>
              <Dropdown.Item onClick={() => this.handleFilterChange("Album")}>Album</Dropdown.Item>
              <Dropdown.Item onClick={() => this.handleFilterChange("Lightstick")}>Lightstick</Dropdown.Item>
              <Dropdown.Item onClick={() => this.handleFilterChange("Merch")}>Merch</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button id='add' onClick={() => this.handleOpenModal()} style={{ marginLeft: '10px' }}>
            Add New Product
          </Button>
        </div>

        <Table striped bordered hover>
          <thead className="table-header">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Artist</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Description</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody className="body">
            {paginatedProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.artist}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>{product.stock}</td>
                <td>{product.description}</td>
                <td className="image-cell">
                  <img src={product.imageUrl} alt={product.name} onError={(e) => { e.target.onerror = null; e.target.src = 'default-image-url.jpg'; }} />
                </td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => this.handleOpenModal(product)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => this.handleDelete(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination>
          {[...Array(totalPages).keys()].map((page) => (
            <Pagination.Item
              key={page + 1}
              active={page + 1 === currentPage}
              onClick={() => this.handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          ))}
        </Pagination>

        <Modal show={showModal} onHide={this.handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingProduct ? "Edit Product" : "Add Product"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Artist</Form.Label>
                <Form.Control
                  type="text"
                  name="artist"
                  value={formData.artist}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  as="select"
                  name="category"
                  value={formData.category}
                  onChange={this.handleChange}
                >
                  <option value="Album">Album</option>
                  <option value="Lightstick">Lightstick</option>
                  <option value="Merch">Merch</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="description"
                  value={formData.description}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button id='close' variant="secondary" onClick={this.handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSubmit}>
              {editingProduct ? "Save Changes" : "Add Product"}
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ProductTable;
