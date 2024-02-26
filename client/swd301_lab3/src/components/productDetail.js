import React, { useEffect, useState } from "react";
import {Card, CardBody, Carousel, Row, Col} from 'react-bootstrap';
import axios from "axios";
import { useParams } from "react-router-dom";


export default function ProductDetail(){
    // Create variable
    const { id } = useParams();
    const [productDetai, setProductDetail] = useState({});
    const [imageSlider, setImageSlider] = useState([]);

    // GET product detail
    useEffect(() => {
        axios.get("http://localhost:9999/products/" + id)
            .then(resp => {
                setProductDetail(resp.data.results);
            })
    },[]); 

    
    return(
        <>
            <Card>
                <CardBody>
                    <Row>
                        <Col xs={4}>
                            <Carousel>
                                <Carousel.Item>
                                
                                </Carousel.Item>
                            </Carousel>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </>
    )
}