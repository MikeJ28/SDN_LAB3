import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";

export default function ProductCreate() {
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState('');
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState([]);
  const [imageTitles, setImageTitles] = useState([]);
  const [imageSize, setImageSize] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:9999/category").then((resp) => {
        setCategories(resp.data);
    });
  }, []);

  const convertImageToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const base64 = event.target.result;
        setImage([...image, base64]);
        setImageSize(() => [...imageSize, file.size])
        resolve(base64);
      };
      fileReader.onerror = (error) => {
        reject(error.toString());
      };
      fileReader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!(name && price > 0 && category)) {
      setMessage("Some fields are incorrect. Please check again!");
      return;
    }

    const formData = {
      name: name,
      price: price,
      description: description,
      category: category,
    };
    formData.images = [];
    if (image.length) {
      image.forEach((img) =>
        formData.images.push({
          "url": img,
          "caption": imageTitles[image.indexOf(img)] ? imageTitles[image.indexOf(img)] : "",
          "size": imageSize[image.indexOf(img)] ? imageSize[image.indexOf(img)] : 0,
        })
      );
    }
    await axios.post("http://localhost:9999/products", formData)
        .then((respone) => {
            setMessage("Product created successfully!")
            }
        ).catch(
            (error) => {
              error.response && error.response.data && error.response.data.message ?
                setMessage(error.response.data.message):
                setMessage("File sending is to large. Please try again or contact to IT for Support!")
                console.error("Error creating product:", error);
              }
        );
  };

  const handleFileChange = (e) => {
    const img = e.target.files;
    if (!img[0]) return;

    const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!validImageTypes.includes(img[0].type)) {
      setMessage("File type is incorrect!");
      return;
    }

    // Check size
    if (img[0].size > 2048000) {
      setMessage("File size is larger than 2mb!");
      return;
    }

    // convert img
    try {
      convertImageToBase64(img[0]);
    } catch (error) {
      console.error("Error converting image to base64:", error);
      setMessage("Error converting image to base64");
    }
  };

  const handleImageTitleChange = (index, title) => {
    const newImageTitles = [...imageTitles];
    newImageTitles[index] = title;
    setImageTitles(newImageTitles);
  };

  const handleDelete = (index) => {
        if (index < 0 || index >= image.length) {
            setMessage("Index out of bound!");
            return;
        }
        let updatedImage = [...image];
        let updatedImageTitles = [...imageTitles];
        let updatedImageSize = [...imageSize];
        updatedImage.splice(index, 1);
        updatedImageTitles.splice(index, 1);
        updatedImageSize.splice(index, 1);
        setImage(updatedImage);
        setImageTitles(updatedImageTitles);
        setImageSize(updatedImageSize);
    };
    

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="6">
          <h2>Create a new Product</h2>
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option>-- select category --</option>
                {categories.map(({ _id, name }) => (
                  <option key={_id} value={_id}>
                    {name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formImages">
              <Form.Label>Images</Form.Label>
              <Form.Control
                type="file"
                accept=".jpeg, .png, .jpg"
                onChange={handleFileChange}
                multiple
              />
            </Form.Group>

            {/* Hiển thị trước ảnh và trường nhập tiêu đề cho mỗi ảnh */}
            {image.map((image, index) => (
              <div className="mt-3" key={index}>
                <Row>
                  <Col xs={12}>
                    <img src={image} alt="Preview" width="100" />
                  </Col>

                  <Col xs={8}>
                    <Form.Control
                        type="text"
                        className="col-8"
                        placeholder="Enter image title"
                        value={imageTitles[index] || ""}
                        onChange={(e) =>handleImageTitleChange(index, e.target.value)} />
                    </Col>

                  <Col xs={4}>
                    <Button variant="danger" onClick={() => handleDelete(index)}>Delete</Button>
                  </Col>
                </Row>
              </div>
            ))}

            <Button variant="primary" type="submit" className="mt-3">
              Create
            </Button>
          </Form>
          <Link to="/products" className="btn btn-success mt-3">
            Back to Products list
          </Link>
        </Col>
      </Row>
    </Container>
  );
}
