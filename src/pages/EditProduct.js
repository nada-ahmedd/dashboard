import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";
import Swal from "sweetalert2";

function EditProduct() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
    rating: { rate: 0 },
  });

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then(() => {
        Swal.fire("Updated!", "Product has been updated successfully.", "success");
        navigate("/products"); 
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <Container className="mt-5">
      <h2>Edit Product</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" name="title" value={product.title} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control type="number" name="price" value={product.price} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" name="category" value={product.category} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control type="text" name="image" value={product.image} onChange={handleChange} required />
              </Form.Group>
               <Form.Group className="mb-3">
    <Form.Label>Rating</Form.Label>
    <Form.Control
      type="number"
      name="rate"
      value={product.rating.rate}
      onChange={(e) =>
        setProduct({
          ...product,
          rating: { ...product.rating, rate: e.target.value },
        })
      }
      step="0.1"
      min="0"
      max="5"
      required
    />
  </Form.Group>

        <Button variant="primary" type="submit">
          Update Product
        </Button>
      </Form>
    </Container>
  );
}

export default EditProduct;
