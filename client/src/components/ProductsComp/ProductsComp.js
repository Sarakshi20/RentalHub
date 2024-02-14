import { useState, useEffect } from 'react'
import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Image from 'react-bootstrap/esm/Image'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductsComp() {
  const navigate = useNavigate();
  const [ItemData, setItemData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    axios.get('http://localhost:3100/Items', {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    }).then((response) => {
      const item = response.data.items;
      setItemData(item);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  useEffect(() => {
  }, [ItemData]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = ItemData.flatMap(item =>
    item.ItemsListed.filter(listItem =>
      listItem.itemName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );


  function BrowseView(selectedItem) {
    // Navigate to the new page and pass the selected item information
    navigate(`/item-details/${selectedItem._id}`, { state: { selectedItem } });
  }

  return (
    <React.Fragment>
      <Container fluid className='pt-5 pe-0 ps-0 pb-0'>
        <h2 className="text-center mt-5">Browse Items</h2>
        <Container fluid className='d-flex justify-content-center mb-5 mb-lg-0'>
          <Col lg={2} className='d-none d-lg-flex justify-content-end mt-3'>
            <Image style={{ height: "300px" }} fluid src="https://media.istockphoto.com/id/1249310264/vector/the-man-is-leaning-back-against-the-wall-looking-at-the-phone-isolated-on-a-white-background.jpg?s=612x612&w=0&k=20&c=uIK1xrArsTIsvUax4qMOKSu7HBeolANH0M3IcuPYUv8="></Image>
          </Col>
          <Col lg={10} className='mt-lg-5 pt-lg-3 pe-lg-5 me-lg-5'>
            <Form className='d-lg-block mt-5 pe-lg-5 me-lg-3'>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Search For Items"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
                <Button className='home-btn' style={{ backgroundColor: "#adcdff", color: "#173c53", border: "2px solid black" }}>
                  Search
                </Button>
              </InputGroup>
            </Form>
          </Col>
        </Container>
      </Container>
      <hr className='mt-0' />
      <Container>
        {filteredItems.map((listItem) => (
          <Container className='my-5' key={listItem._id}>
            <Row lg={10} className='d-lg-flex justify-content-center align-items-center gap-5 py-4 mx-auto'>
              <Col xs={12} lg={5} className='d-flex justify-content-center align-items-center flex-column gap-3'>
                <Image fluid src={listItem.imagePath} style={{ height: "230px", overflow: "hidden", border: "black 2px solid", borderRadius: "7px" }} />
                <h4>{listItem.itemName}</h4>
              </Col>
              <Col xs={12} lg={5} className='d-flex justify-content-center flex-column gap-3 p-3'>
                <p style={{ textOverflow: "break" }}><b>Description:</b> {listItem.desc}</p>
                <p><b>Price Per Day:</b> Rs {listItem.pricePerDay}</p>
                <p><b>Max Rental Duration:</b> {listItem.maxRentalDuration} days</p>
                <Button size="sm" onClick={() => BrowseView(listItem)} className='mt-3 home-btn' style={{ backgroundColor: "#adcdff", color: "#173c53", border: "2px solid black", fontSize: "22px" }}>View Listing<i className="fa-solid fa-eye fa-sm ms-2"></i></Button>
              </Col>
            </Row>
            <hr />
          </Container>
        ))}
      </Container>
    </React.Fragment>
  )
}

export default ProductsComp