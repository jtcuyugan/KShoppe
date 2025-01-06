import React, { Component } from 'react';
import '../styles/ItemList.css'; // Ensure this file exists and is correctly named
import axios from "axios";

export class ItemList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      currentPage: 1,
      itemsPerPage: 5,
      showModal: false,
      editingProduct: null,
      formData: { name: "", artist: "", category: "Album", price: 0, stock: 0, description: "", image: "" },
      expandedItemId: null,
      loading: true
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = () => {
    axios
      .get("https://localhost:7205/api/product")
      .then((response) => {
        this.setState({ products: response.data, loading: false });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ loading: false });
      });
  };

  handleItemClick(itemId) {
    this.setState({ expandedItemId: this.state.expandedItemId === itemId ? null : itemId });
  }

  static renderItems(items, expandedItemId, handleItemClick) {
    return (
      <div className="items">
        {items.map(item =>
          <div className="item" key={item.id} onClick={() => handleItemClick(item.id)}>
            <img src={item.imageUrl} alt={item.name} onError={(e) => { e.target.onerror = null;}} /> {/* Ensure imageUrl is a valid URL */}
            <h3>{item.name}</h3>
            <p>Price: ${item.price ? item.price.toFixed(2) : 'N/A'}</p>
            {expandedItemId === item.id && (
              <div className="item-details">
                <p>Artist: {item.artist}</p>
                <p>Category: {item.category}</p>
                <p>Stock: {item.stock}</p>
                <p>Description: {item.description}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : ItemList.renderItems(this.state.products, this.state.expandedItemId, this.handleItemClick.bind(this));

    return (
      <div className="item-list-page">
        <h1>Shop Items</h1>
        {contents}
      </div>
    );
  }
}
