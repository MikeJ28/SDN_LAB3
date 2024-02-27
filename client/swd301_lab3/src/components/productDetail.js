import React, { useEffect, useState } from "react";
import {
  Card,
  Carousel,
  Row,
  Col,
  Image,
  Container,
  Form,
  Button,
} from "react-bootstrap";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const [idCommentEdited, setIdCommentEdited] = useState("");
  const [txtCommentEdited, setTxtCommentEdited] = useState("");
  const [productDetail, setProductDetail] = useState({});
  const [message, setMessage] = useState("");
  const [commentList, setCommnetList] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editComment, setEditComment] = useState({ id: null, text: "" });

  useEffect(() => {
    axios
      .get("http://localhost:9999/products/" + id)
      .then((resp) => {
        console.log(resp.data.results[0]);
        setProductDetail(resp.data.results[0]);
        setCommnetList(resp.data.results[0].comments);
      })
      .catch((error) => {
        console.error("Error fetching product detail:", error);
      });
  }, []);

  const handleEditSubmit = async () => {
    const data = {
      _id: idCommentEdited,
      text: txtCommentEdited,
    };

    await axios
      .put("http://localhost:9999/comment", data)
      .then((respone) => {
        setMessage("Edit comment successfull!");
      })
      .catch((error) => {
        setMessage("Can not add comment. Pls contact to IT Support!");
        console.error("Error creating product:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    const formData = {
      _id: id,
      text: newComment,
      rating: 5,
      author: localStorage.getItem("userName"),
    };

    await axios
      .post("http://localhost:9999/comment", formData)
      .then((respone) => {
        setMessage("Add comment successfull!");
      })
      .catch((error) => {
        setMessage("Can not add comment. Pls contact to IT Support!");
        console.error("Error creating product:", error);
      });
  };

  const handleEdit = (_id, text) => {
    setIdCommentEdited(_id);
    setTxtCommentEdited(text);
  };

  return (
    <Container className="mt-6">
      <Card className="my-4">
        <Card.Header>
          <h2>Product Details:</h2>
        </Card.Header>
        <Card.Body>
          <Row className="m-auto">
            <Col xs={12} md={4}>
              <Carousel>
                {productDetail.images ? (
                  productDetail.images.map((item, index) => (
                    <Carousel.Item key={index}>
                      <Image
                        className="d-block w-50"
                        src={item.url}
                        alt={`Slide ${index + 1}`}
                      />
                    </Carousel.Item>
                  ))
                ) : (
                  <Carousel.Item>
                    <Image
                      className="d-block w-25"
                      src="https://via.placeholder.com/800x400?text=No+Image"
                      alt="No Image"
                    />
                  </Carousel.Item>
                )}
              </Carousel>
            </Col>
            <Col xs={12} md={8}>
              <h2>Name: {productDetail.name}</h2>
              <p>Description: {productDetail.description}</p>
              <p>Price: ${productDetail.price}</p>
            </Col>
          </Row>
        </Card.Body>
        <Card.Footer>
          <h5>Enter your comment:</h5>
          {message == "Can not add comment. Pls contact to IT Support!" ? (
            <span style={{ color: "red" }}>{message}</span>
          ) : (
            <span style={{ color: "green" }}>{message}</span>
          )}
          <Form
            className="row"
            onSubmit={editComment.id ? handleEditSubmit : handleSubmit}
          >
            <Form.Group as={Row} className="row">
              <Col xs={9}>
                <Form.Control
                  className="xs={8}"
                  type="text"
                  placeholder="Enter your comment"
                  value={editComment.id ? editComment.text : newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                />
              </Col>
              <Col xs={3}>
                <Button className="xs={4}" onClick={(e) => handleSubmit(e)}>
                  Create comment
                </Button>
              </Col>
            </Form.Group>
          </Form>

          <div className="mt-3">
            {commentList && commentList.length ? (
              commentList.map((comment) => (
                <Row className="mr-2 justify-content-center">
                  <Card as={Col} key={comment._id} className=" mb-2 col-9">
                    <Card.Body>
                      {idCommentEdited != comment._id ? (
                        <span>{comment.text}</span>
                      ) : (
                        <textarea
                          style={{ width: "100%" }}
                          value={txtCommentEdited}
                          onChange={(e) => setTxtCommentEdited(e.target.value)}
                        ></textarea>
                      )}
                    </Card.Body>
                    <Card.Footer style={{ textAlign: "end" }}>
                      <span>{comment.author}</span>
                    </Card.Footer>
                  </Card>
                  <Col className="d-flex align-items-center">
                    {localStorage.getItem("userName") == comment.author ? (
                      idCommentEdited == null ? (
                        <Button
                          variant="success"
                          onClick={() => handleEdit(comment._id, comment.text)}
                        >
                          Edit
                        </Button>
                      ) : (
                        <Button
                          variant="success"
                          onClick={() => handleEditSubmit()}
                        >
                          Save
                        </Button>
                      )
                    ) : null}
                  </Col>
                </Row>
              ))
            ) : (
              <p>No comments available.</p>
            )}
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
}
