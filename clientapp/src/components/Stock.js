import React, { Component } from 'react';
import '../styles/Stock.css';

export class Stock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      category: '',
      description: '',
      price: '',
      image: null,
      imagePreviewUrl: '',
      items: []
    };
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems() {
    fetch('/api/item')
      .then(response => response.json())
      .then(data => this.setState({ items: data }))
      .catch(error => console.error('Error fetching items:', error));
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleImageChange = (event) => {
    const file = event.target.files[0];
    this.setState({ image: file });

    const reader = new FileReader();
    reader.onloadend = () => {
      this.setState({ imagePreviewUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, category, description, price, image } = this.state;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('image', image);

    fetch('/api/item', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        this.setState(prevState => ({
          items: [...prevState.items, data],
          name: '',
          category: '',
          description: '',
          price: '',
          image: null,
          imagePreviewUrl: ''
        }));
      })
      .catch(error => console.error('Error adding item:', error));
  };

  handleDeleteItem = (id) => {
    fetch(`/api/item/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        this.setState(prevState => ({
          items: prevState.items.filter(item => item.id !== id)
        }));
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  render() {
    const { name, category, description, price, imagePreviewUrl, items } = this.state;
    return (
      <div className="stock-page">
        <h1>Add New Item</h1>
        <div className="form-container">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="category">Category:</label>
              <select
                id="category"
                name="category"
                value={category}
                onChange={this.handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Album">Album</option>
                <option value="Lightstick">Lightstick</option>
                <option value="Poster">Poster</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={price}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="image">Upload Image:</label>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={this.handleImageChange}
                required
              />
            </div>
            <button type="submit">Add Item</button>
          </form>
          <div className="image-preview">
            {imagePreviewUrl && <img src={imagePreviewUrl} alt="Album Cover" />}
          </div>
        </div>
        <h2>Existing Items</h2>
        <div className="items-list">
          {items.map(item => (
            <div key={item.id} className="item">
              <h3>{item.name}</h3>
              <p>Category: {item.category}</p>
              <p>Description: {item.description}</p>
              <p>Price: ${item.price}</p>
              <button onClick={() => this.handleDeleteItem(item.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
