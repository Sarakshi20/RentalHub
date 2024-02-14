import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import InputGroup from 'react-bootstrap/InputGroup'
import Image from 'react-bootstrap/Image'
import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function ListItemsComp() {
    const navigate = useNavigate();
    const Basicdata = {
        OwnerName: "",
        itemName: "",
        desc: "",
        itemCategory: "Electronics",
        pricePerDay: "",
        maxRentalDuration: "",
        imagePath: ""
    };

    const [imageData, setImage] = useState("");
    const [ItemData, setData] = useState(Basicdata);
    function handleChange(event) {
        setData({
            ...ItemData,
            [event.target.name]: event.target.value
        });
    }

    async function uploadCloud(e) {
        e.preventDefault();
        const image = new FormData();
        image.append("file", imageData);
        image.append("upload_preset", "jgi3j28n");  //token name
        image.append("cloud_name", "dxbs4qi09");  // cloudname
        await axios.post("https://api.cloudinary.com/v1_1/dxbs4qi09/image/upload", image)
            .then((response) => {
                const url = response.data.secure_url;
                setData({
                    ...ItemData,
                    imagePath: url
                });
        }).catch((err) => { console.log(err) });
    }

    useEffect(() => {
        // Trigger handleSubmit only if imagePath is updated
        if (ItemData.imagePath) {
            handleSubmit();
        }
    }, [ItemData.imagePath]);

    async function handleSubmit() {
        await axios.post('http://localhost:3100/listItems',ItemData,{
            headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
          })
            .then((response) => {
                
                if (response.data) {
                    alert("Added Successfully!");
                    return navigate('/profile');
                }
                return alert("Error Occured");
            }).catch((err) => {
                console.log(err);
            })
    }
  return (
    <React.Fragment>
            <Container>
                <button onClick={() => { navigate('/profile') }} className="btn btn-lg mt-5 home-btn" style={{ backgroundColor: "#adcdff", color: "#173c53", border: "2px solid black" }}>
                    <Image height={"30px"} src='https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-arrow-back-512.png'></Image> Back to Profile
                </button>
            </Container>
            <Container className='my-5 d-flex justify-content-center align-items-center flex-column' style={{ height: "100vh" }}>
                <Container className='d-flex justify-content-center align-items-center' >
                    <Col lg={6} className='d-none d-lg-block'>
                        <Image fluid src="https://img.freepik.com/premium-vector/african-business-woman-character-wear-formal-costume-shirt-knit-vest-grey-tight-pants-isolated-white-background-confident-manager-coach-teacher-person-cartoon-people-vector-illustration_1016-11309.jpg?size=626&ext=jpg"></Image>
                    </Col>
                    <Col xs={12} lg={6}>
                        <h1 className="text-center mb-3">List New Item</h1>
                        <Form className='d-flex flex-column gap-3' onSubmit={uploadCloud}>
                            <Form.Control type="text" placeholder="Enter Your Name" name="OwnerName" value={ItemData.OwnerName} onChange={handleChange} required />
                            <Form.Control type="text" name="itemName" placeholder="Enter Item Name" value={ItemData.itemName} onChange={handleChange} required />
                            <Form.Select placeholder="Select Category" name="itemCategory" value={ItemData.itemCategory} onChange={handleChange} required>
                                <option>Electronics</option>
                                <option>Clothing</option>
                                <option>Beauty</option>
                                <option>Books</option>
                                <option>Furniture</option>
                                <option>Toys</option>
                            </Form.Select>
                            <InputGroup>
                                <InputGroup.Text style={{ overflow: "scroll", height: "200px" }}>Enter Description of Item</InputGroup.Text>
                                <Form.Control as="textarea" name="desc" aria-label="With textarea" style={{ resize: "none" }} onChange={handleChange} value={ItemData.desc} required />
                            </InputGroup>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Upload Image of Item</Form.Label>
                                <Form.Control type="file" accept='image/*' name="imagePath" required onChange={(e) => { setImage(e.target.files[0]) }} />
                            </Form.Group>
                            <Form.Control type="number" name="pricePerDay" placeholder="Enter Price Per Day (Rs) " onChange={handleChange} value={ItemData.pricePerDay} required />
                            <Form.Control type="number" name="maxRentalDuration" placeholder="Maximum Days for rent" onChange={handleChange} value={ItemData.max} required />
                            <button type='submit' className="btn btn-lg mt-2 home-btn" style={{ backgroundColor: "#adcdff", color: "#173c53", border: "2px solid black" }}>
                                List Item
                            </button>
                        </Form>
                    </Col>
                </Container>
            </Container>
        </React.Fragment>
  )
}

export default ListItemsComp