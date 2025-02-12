import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

function ProductDetails() {
  const { id } = useParams(); 
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <Card.Img variant="top" src={product.image} style={{ width: "200px", margin: "auto" }} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>
            <strong>Price:</strong> ${product.price}
          </Card.Text>
          <Card.Text>
            <strong>Category:</strong> {product.category}
          </Card.Text>
          <Card.Text>
            <strong>Rating:</strong> {product.rating.rate} 
          </Card.Text>
          <Card.Text>
            <strong>Description:</strong> {product.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProductDetails;
