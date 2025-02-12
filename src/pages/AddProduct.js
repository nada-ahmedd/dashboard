import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

function AddProduct() {
  const navigate = useNavigate();

  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    rating: { rate: 0 }, 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "rate") {
      setNewProduct({
        ...newProduct,
        rating: { ...newProduct.rating, rate: value },
      });
    } else {
      setNewProduct({ ...newProduct, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Success!", "Product added successfully.", "success");
        navigate("/products"); 
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  return (
    <Container className="mt-5">
      <h2>Add New Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={newProduct.title} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" value={newProduct.price} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" value={newProduct.category} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" name="image" value={newProduct.image} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Rating</Form.Label>
          <Form.Control
            type="number"
            name="rate"
            value={newProduct.rating.rate}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="5"
            required
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Add Product
        </Button>
      </Form>
    </Container>
  );
}

export default AddProduct;
