import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import ReactPaginate from "react-paginate";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Row, Col, Form } from 'react-bootstrap';

function App() {
  const [memes, setMemes] = useState([])
  const [totalPages, setTotalPages] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const memesPerPage = 1;

  useEffect (() => {
  const endOffset = itemOffset + memesPerPage;  
  axios.get('https://api.imgflip.com/get_memes')
  .then(response => {
    console.log("1:", response.data)
    const data = response.data.data.memes
    console.log("2:", data);
    setMemes(data.slice(itemOffset, endOffset));
    setTotalPages(Math.ceil(data.length / memesPerPage));
  })
  .catch(error => {
    console.log(error)
  });   
  }, [itemOffset, memesPerPage]);

  console.log("3:", memes)

  const handleChange = (page) => {
    const newOffset = page.selected * memesPerPage;
    console.log(
    `User requested page number ${
    page.selected + 1
    }, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <div className="App">
      <Container style={{
        padding: '2rem',
        paddingLeft: '5rem',
        }}>
        <h1>Meme Generator</h1>
        <Form>
          <Row>
            <Col md>
              <Form.Group>
                <Form.Label>Top Meme</Form.Label>
                <Form.Control type="text" placeholder='type your meme quote here' />
              </Form.Group>
            </Col>

            <Col md>
            <Form.Group>
                <Form.Label>Bottom Meme</Form.Label>
                <Form.Control type="text" placeholder='type your meme quote here' />
              </Form.Group>
            </Col>
          </Row>
          <Button variant="secondary" type="submit">Submit</Button>
        </Form>

        <Card className='mb-3' 
        style={{
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: '2rem',
        // paddingLeft: '12rem',
        width: "20rem"
        }}
        >
          <Card.Body>
            <Card.Title>Title</Card.Title>
            {
              memes.map((meme) => (
                <Card.Img src={meme.url}
                style={{
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  padding: '5rem',
                  width: "25rem"
                  }}
                /> 
              ))
            }    
            <Card.Text>Some text here</Card.Text>
          </Card.Body>
        </Card>

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
            />
      </Container>
    </div>
  );
}

export default App;
