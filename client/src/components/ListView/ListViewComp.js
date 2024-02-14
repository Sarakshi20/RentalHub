import Image from 'react-bootstrap/Image'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import axios from 'axios'

function ListViewComp() {
    const navigate = useNavigate();
    const [ItemData, setItemData] = useState([{}]);
    useEffect(() => {
        axios.get('http://localhost:3100/viewItems', {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        }).then((response) => {
            console.log(response.data);
            const item = response.data.items;
            setItemData(item);
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
    }, [ItemData]);

    return (
        <React.Fragment>
            <Container>
                <button onClick={() => { navigate('/profile') }} className="btn btn-lg mt-5 home-btn" style={{ backgroundColor: "#adcdff", color: "#173c53", border: "2px solid black" }}>
                    <Image height={"30px"} src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-back-512.png'></Image> Back to Profile
                </button>
            </Container>
            <Container>
                <h2 className='text-center my-4'>Your Listed Items</h2>
            </Container>
            <Container>
                <hr />
                {ItemData.map((item) => {
                    return <Container className='my-5' key={item._id}>
                        <Row lg={10} className='d-lg-flex justify-content-center align-items-center gap-5 py-4 mx-auto'>
                            <Col xs={12} lg={5} className='d-flex justify-content-center align-items-center flex-column gap-3'>
                                <Image fluid src={item.imagePath} style={{ height: "230px", overflow: "hidden", border: "black 2px solid", borderRadius: "7px" }} />
                                <h4>{item.itemName}</h4>
                            </Col>
                            <Col xs={12} lg={5} className='d-flex justify-content-center flex-column gap-3 p-3'>
                                <p style={{ textOverflow: "break" }}><b>Description:</b> {item.desc}</p>
                                <p><b>Price Per Day:</b> Rs {item.pricePerDay}</p>
                                <h5>
                                    Rental Status: <span style={{ color: item.RentalStatus ? "green" : "red" }}>
                                        {item.RentalStatus ? "Rented" : "Not Rented"}
                                    </span>
                                </h5>
                                {/* <Button size="sm" className='mt-3 home-btn' style={{ backgroundColor: "#adcdff", color: "#173c53", border: "2px solid black", fontSize: "22px" }}>View Listing<i className="fa-solid fa-eye fa-sm ms-2"></i></Button> */}
                            </Col>
                        </Row>
                        <hr />
                    </Container>
                })}
            </Container>
        </React.Fragment>
    )
}

export default ListViewComp