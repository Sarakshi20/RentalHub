import React, { useState } from 'react'
import { useLocation ,useNavigate} from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/Image';
import NavB from '../Navbar/navbar';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function ItemDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedItem } = location.state;
    const [AmountData,setAmountData] = useState(0);
    const [DaysInput,setInput] = useState();

    function handleAmount(e){
        setInput(e.target.value);
        setAmountData(selectedItem.pricePerDay*e.target.value);
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const DATA = {
            amount: AmountData,
            id : selectedItem._id,
            RentalDuration: DaysInput
        }
        await axios.post('https://rentalhub-server.onrender.com/Items',DATA, {
            headers:{
                "Authorization" : `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(()=>{
            navigate('/Items');
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    return (
        <React.Fragment>
            <NavB />
            <Container className='pt-5'>
                <Form onSubmit={handleSubmit}>
                <Row className='d-flex gap-3 my-5' style={{ height: "70vh" }}>
                    <Col lg={6} className='d-flex flex-column justify-content-center align-items-center mx-auto' >
                        <Image fluid src={selectedItem.imagePath} style={{border:"3px solid black",borderRadius:"5px"}} />
                    </Col>
                    <Col lg={5} className='d-flex flex-column justify-content-center'>
                        <h2>{selectedItem.itemName.toUpperCase()}</h2>
                        <p>{selectedItem.desc}</p>
                        <hr />
                        <h3 className='mb-4'>₹{selectedItem.pricePerDay} <span> per day</span></h3>
                        <p>Max Rental Duration Allowed: {selectedItem.maxRentalDuration} days</p>
                        <Form.Control type="number" placeholder="Enter Rental Duration (Days)" min="1" max={selectedItem.maxRentalDuration} onChange={handleAmount} required />
                        <hr />
                        {AmountData?<h4>Total Amount: ₹{AmountData}</h4>:null}
                        {!selectedItem.RentalStatus?<Button type='submit' variant="success mt-4">Rent Now</Button>:<Button disabled type='submit' variant="success mt-4">Already Rented</Button>}
                    </Col>
                </Row>
                </Form>
            </Container>
        </React.Fragment>
    );
}

export default ItemDetails