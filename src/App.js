import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col, Form } from 'react-bootstrap';
import { Carousel, Button } from 'react-bootstrap';

function App() {
  const [memes, setMemes] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [inputText, setInputText] = useState('');
  const [displayText, setDisplayText] = useState('');
  // const [totalPages, setTotalPages] = useState(0);
  // const [itemOffset, setItemOffset] = useState(0);
  // const memesPerPage = 1;

  useEffect (() => {
  // const endOffset = itemOffset + memesPerPage;  
  axios.get('https://api.imgflip.com/get_memes')
  .then(response => {
    console.log("1:", response.data)
    const data = response.data.data.memes
    console.log("2:", data);
    setMemes(data);
    // setMemes(data.slice(itemOffset, endOffset));
    // setTotalPages(Math.ceil(data.length / memesPerPage));
  })
  .catch(error => {
    console.log(error)
  });   
  // }, [itemOffset, memesPerPage]);
}, []);

  console.log("3:", memes)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };

  console.log("4:", selectedImage);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex === memes.length - 1 ? 0 : prevIndex + 1));
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex === 0 ? memes.length - 1 : prevIndex - 1));
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleButtonClick = () => {
    setDisplayText(inputText);
  };

  // const handleChange = (page) => {
  //   const newOffset = page.selected * memesPerPage;
  //   console.log(
  //   `User requested page number ${
  //   page.selected + 1
  //   }, which is offset ${newOffset}`
  //   );
  //   setItemOffset(newOffset);
  // };

  return (
    <div className="App">
      <Container>
        <div>
            <Card className='mb-2' 
              style={{
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              padding: '10px',
              width: "18rem"
              }}
            >
              <Card.Title> Step 1: Select an Image.</Card.Title>
              <Carousel activeIndex={index} onSelect={handleSelect}>
                  {
                  memes.map((meme, i) => (
                    <Carousel.Item key={i} onClick={() => handleImageSelect(meme)}>  
                      <img className="d-block w-100" src={meme.url} 
                      style={{ objectFit: 'cover', height: 'auto' }}
                      /> 
                    </Carousel.Item>  
                  ))
                  }
                </Carousel>
            </Card>
        </div>

        <div>
        <Card className='mb-2' 
              style={{
              padding: '10px',
              width: "18rem",
              display: 'flex',
              justifyContent: 'center', 
              alignItems: 'center', 
              }}
            >
              <Card.Title> Step 2: Edit your meme caption.</Card.Title>

              <Form>
                <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',}}>
                  <Col md style={{padding: '10px',}}>
                    <Form.Group>
                      {/* <Form.Label>Top Meme</Form.Label> */}
                      <Form.Control 
                        type="text" 
                        value={inputText} 
                        onChange={handleInputChange}
                        placeholder='Type your Top meme caption here' />
                    </Form.Group>
                  </Col>

                  <Col md style={{padding: '10px',}}>
                  <Form.Group>
                      {/* <Form.Label>Bottom Meme</Form.Label> */}
                      <Form.Control type="text" placeholder='Type your Bottom meme caption here' />
                    </Form.Group>
                  </Col>

                  <Button as="input" type="submit" value="Submit" variant="dark"
                    onClick={handleButtonClick} 
                    style={{width: '100px', height: '40px', fontSize: '16px' }}
                    />{' '}
                </Row>
              </Form>

              <Card.Img variant="top" src={selectedImage?.url} />

        </Card>

        </div>

        {/* <Card className='mb-3' 
        style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '2rem',
        // paddingLeft: '12rem',
        width: "350px"
        }}
        >
        {
          memes.map((meme) => (
            <Card.Img src={meme.url}
              style={{
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  padding: '10px',
                  width: "300px"
                  }}
            /> 
            ))
        }
        <Card.ImgOverlay>
          <Card.Title>Choose an Image</Card.Title>

          <Card.Text className='meme-toptext'>{displayText}</Card.Text>

          <Card.Text className='meme-bottomtext'>
          Meme quote goes here and so on and on and on and on and on
          </Card.Text>

        </Card.ImgOverlay>
          {/* <Card.Body>
            <Card.Title>Title</Card.Title>    
            <Card.Text>Some text here</Card.Text>
        </Card.Body>
       </Card> */}
{/* 
        <ReactPaginate className="pagination"
            nextLabel="Next >"
            previousLabel="< Previous"
            breakLabel="..."
            onPageChange={handleChange}
            pageCount={totalPages}
            pageClassName="page-item"
            pageLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            previousLinkClassName="page-link"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            /> */}
      </Container>
    </div>
  );
}

export default App;
