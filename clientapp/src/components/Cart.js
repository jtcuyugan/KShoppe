    import React, { Component } from 'react';
    import '../styles/Cart.css';
    import deleteIcon from '../assets/trash.png';

    export class Cart extends Component {
    static displayName = Cart.name;

    constructor(props) {
        super(props);
        this.state = {
        cartItems: []
        };
    }

    componentDidMount() {
        this.fetchCartItems();
    }

    fetchCartItems() {
        fetch('/cart')
        .then(response => response.json())
        .then(data => this.setState({ cartItems: data }))
        .catch(error => console.error('Error fetching cart items:', error));
    }

    handleDeleteItem(index) {
        fetch(`/cart/${index}`, {
        method: 'DELETE'
        })
        .then(response => response.json())
        .then(data => this.setState({ cartItems: data }))
        .catch(error => console.error('Error deleting cart item:', error));
    }

    render() {
        const { cartItems } = this.state;

        return (
        <div className="cart-page">
            <h1>Your Shopping Cart</h1>
            <div className="cart-items">
            {cartItems.map((item, index) => (
                <div className="cart-item" key={index}>
                <img src={item.image} alt={item.name} />
                <div className="item-details">
                    <h2>{item.name}</h2>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ${item.price}</p>
                </div>
                <img
                    src={deleteIcon}
                    alt="Delete"
                    className="delete-button"
                    onClick={() => this.handleDeleteItem(index)}
                />
                </div>
            ))}
            </div>
            <div className="cart-total">
            <h2>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</h2>
            <button className="checkout-button">Proceed to Checkout</button>
            </div>
        </div>
        );
    }
    }
