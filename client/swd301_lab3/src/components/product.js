import {useState, useEffect} from"react"
import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import axios from 'axios';

export default function Product() {
    // Khởi tạo biến
    
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:9999/products")
            .then(resp => {
                console.log(resp)
                setProducts(resp.data.results);
            })
    }, []);

    useEffect(() => {
        console.log(products);
    }, [products]);
    

    // Xử lý logic
    let sendDetail = (_id) => {
        let path = "products/" + _id;
        console.log(path);
    }


    // Giao diện:
    return (
        <div>
            <h2>List of Products</h2>
            <Link to={'/products/create'}>Create a new Product</Link>
            <hr></hr>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {   Array.isArray(products) ?
                        products.map(p => (
                            <tr key={p.id}>
                                <td>{products.indexOf(p) + 1}</td>
                                <td>{p.name}</td>
                                <td>{p.price}</td>
                                <td>{p.category}</td>
                                <td>
                                    <Button color="primary" className="px-4"  onClick={() => sendDetail(p.id)}>Detail</Button>
                                </td>
                            </tr>
                        ))
                        : <h1>Khong lấy được dữ liệu</h1>
                    }
                </tbody>
            </Table>
        </div>
    )
}