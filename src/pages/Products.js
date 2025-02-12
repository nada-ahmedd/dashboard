import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Table } from "react-bootstrap";
import Swal from "sweetalert2";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setProducts(data);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/products/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Failed to delete product");
            }
            return res.json();
          })
          .then(() => {
            setProducts(products.filter((product) => product.id !== id));

            Swal.fire("Deleted!", "Your product has been deleted.", "success");
          })
          .catch((error) => console.error("Error deleting product:", error));
      }
    });
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Products List</h2>
      <Link to={"/products/add"} className="btn btn-success mb-4">
        Add New Product
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Price ($)</th>
            <th>Category</th>
            <th>Image</th>
            <th>Rate</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
              <td>
                <img src={product.image} alt={product.title} width="50" height="50" />
              </td>
              <td>{product.rating.rate}</td>
              <td className="p-2">
                <button
                  className="btn btn-danger btn-sm mx-1"
                  onClick={() => handleDelete(product.id)} 
                >
                  Delete
                </button>
                <Link to={`/products/edit/${product.id}`} className="btn btn-primary btn-sm mx-1">
             Edit
                </Link>
                <Link to={`/products/${product.id}`} className="btn btn-info btn-sm mx-1">
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default Products;
