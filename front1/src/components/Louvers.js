// Louvers.js
import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Pagination from 'react-bootstrap/Pagination';
import { FaStar, FaMoneyBill, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Modal from 'react-bootstrap/Modal';
import Logo from './logo.png';
import Button from 'react-bootstrap/Button';
import { Navbar} from 'react-bootstrap';

import './ProductDetails.css'

import { useQuote } from './QuoteContext';

// Importing images
import louvers1 from "../img/PRODUCT1/Louvers/GT-251.png";
import louvers2 from "../img/PRODUCT1/Louvers/GT-252.png";
import louvers3 from "../img/PRODUCT1/Louvers/GT-253.png";
import louvers4 from "../img/PRODUCT1/Louvers/GT-254.png";
// import khila5 from "../components/prodimg/khila-5.jpg";
// import khila6 from "../components/prodimg/khila-6.jpg";
// import khila7 from "../components/prodimg/khila-7.jpg";
// import khila8 from "../components/prodimg/khila-8.jpg";
// import khila9 from "../components/prodimg/khila-9.jpg";
// import khila10 from "../components/prodimg/khila-10.jpg";

const products = [
  { name: 'Fiber Louver’s', MOQ: '80 pc', image: "/40.jpg", rating: 4.8, rate: 10, info:'PRODUCT ID: GT-251' },
  { name: 'Aluminium Louver’s', MOQ: '80 pc', image: "/35.jpg", rating: 4.8, rate: 20, info:'PRODUCT ID: GT-252'  },
  { name: 'Box Louver’s', MOQ: '80 pc', image: "/7.jpg", rating: 4.8, rate: 30, info:'PRODUCT ID: GT-253'  },
  { name: 'Fix Louver’s Blade', MOQ: '80 pc', image: "/9.jpg", rating: 4.8, rate: 50, info:'PRODUCT ID: GT-254'  },
 ];


const itemsPerPage = 6;

function Louvers() {
  const [activePage, setActivePage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToQuote } = useQuote();

  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = products.slice(startIndex, endIndex);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Example state for authentication status



  const loginPrompt = () => {
    alert('Please log in to add items to the cart');
    // You can replace this alert with your actual login prompt logic, such as displaying a modal or redirecting to the login page
  };


  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === activePage}
        onClick={() => setActivePage(number)}
      >
        {number}
      </Pagination.Item>,
    );
  }

  const handleShowModal = (product) => {
    setShowModal(true);
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
 // if (!isLoggedIn) {
    //   // If user is not logged in, show login prompt or redirect to login page
    //   loginPrompt(); // Example function to display login prompt
    //   return;
    // }
    addToQuote(product);
    toast.success(`${product.name} added to get Quotes`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  return (
    <section id="product" className="block product-block">
      <Container fluid>
        <Row className='portfoliolist' style={{padding: '1.2rem'}}>
          {currentPageData.map((product, index) => (
            <Col sm={4} key={index}>
              <div className='portfolio-wrapper'>
                <div>
                  <Image src={product.image} onClick={() => handleShowModal(product)} />
                  <div className='label text-center'>
                    <h3>{product.name}</h3>
                    {/* <p>{`M.O.Q ${product.MOQ}`}</p> */}
                    {/* <div className='istar'>
                      <FaStar className="rating-star" />
                      <span className="rating-number">{product.rating}</span>
                    </div>
                    <span className="quantity-number">Qty: </span> 
                    <span className="quantity-number">1x</span> */}
                    {/* <FaTimes className="quantity_icon" /> */}
                    {/* <div className='imoney'>
                      <FaMoneyBill className="money-icon" />
                      <span className="rate">{product.rate}</span>
                    </div> */}
                   <div>
                   <button className="learn-more-button" onClick={() => handleAddToCart(product)}>
                      Add To Cart
                    </button>
                   </div>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>

        <Pagination>{paginationItems}</Pagination>
      </Container>

<section className='prodinfo' >
      <Modal show={showModal} onHide={handleCloseModal} dialogClassName="custom-modal product-details-modal" >
        <Modal.Header closeButton>
          <Modal.Title> 
            <Navbar.Brand as={Link} to="/">
            <img
              src={Logo}
              alt="Logo"
              height="50"
              className="d-inline-block align-top mr-3"
            />
          </Navbar.Brand>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="productcard">
            <Col xs={12} md={5} className="photo">
              <Image src={selectedProduct && selectedProduct.image} />
            </Col>
            <Col xs={12} md={7} className="description">      
        <h2>{selectedProduct && selectedProduct.name}</h2>
        <h4>Perfect Louvers</h4>
        <h1>{selectedProduct && selectedProduct.rate}INR</h1>
        <p>{selectedProduct && selectedProduct.info} </p>
        <Button className="learn-more-button" onClick={() => handleAddToCart(selectedProduct)}>
                Add to Cart
              </Button>
        {/* <Button className="close-button">Close</Button> */}

            </Col>
          </Row>
        </Modal.Body>

        
      </Modal>
      </section>
      <ToastContainer />
    </section>
  );
}

export default Louvers;