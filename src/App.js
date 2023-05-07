import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Form } from 'react-bootstrap';
import { Carousel, Button } from 'react-bootstrap';
import { CardGroup } from 'react-bootstrap';
import ImageUploader from 'react-image-upload'
import 'react-image-upload/dist/index.css'
import domtoimage from 'dom-to-image';

function App() {
  const [memes, setMemes] = useState([]);
  const [index, setIndex] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  const [topText, setTopText] = useState('');
  const [bottomText, setBottomText] = useState('');
  const [displayTopText, setDisplayTopText] = useState('');
  const [displayBottomText, setDisplayBottomText] = useState('');

  useEffect (() => {
  axios.get('https://api.imgflip.com/get_memes')
  .then(response => {
    console.log("1:", response.data)
    const data = response.data.data.memes
    console.log("2:", data);
    setMemes(data);
  })
  .catch(error => {
    console.log(error)
  });   
}, []);

  console.log("3:", memes)

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const handleImageSelect = (image) => {
    console.log("4.2:", image);
    setSelectedImage(image);
  };

  console.log("4.1:", selectedImage);

  const handleTopInputChange = (event) => {
    setTopText(event.target.value);
  };

  const handleBottomInputChange = (event) => {
    setBottomText(event.target.value);
  };

  console.log("5:", topText, bottomText)

  const handleButtonClick = () => {
    setDisplayTopText(topText);
    setDisplayBottomText(bottomText);
  };

  const handleResetButton = () => {
    setDisplayTopText('');
    setDisplayBottomText('');
    setSelectedImage(null);
    setTopText('');
    setBottomText('');
    runAfterImageDelete();
  };

  const downloadImage = () => {
    domtoimage.toJpeg(document.getElementById('memeImage'), { quality: 1 })
    .then(function (dataUrl) {
        var link = document.createElement('a');
        link.download = 'meme.jpeg';
        link.href = dataUrl;
        link.click();
    });
  };

  function getImageFileObject(imageFile) {
    // const url = imageFile.dataUrl.split("blob:")[1]
    const uploadFileObj = { url: imageFile.dataUrl }
    console.log("6.1:", uploadFileObj)

    setSelectedImage(uploadFileObj);
    console.log("6.2:", { imageFile })
  }
  
  function runAfterImageDelete(file) {
    console.log({ file })
  }

  return (
    <div className="App">
      <div className='grid-container'>
        <div className='grid-item'>
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
                <div></div>
                <Card.Title>* Or upload an image</Card.Title>
                <ImageUploader
                onFileAdded={(img) => getImageFileObject(img)}
                onFileRemoved={(img) => runAfterImageDelete(img)}
              />

            </Card>

        </div>

        <div className='grid-item'>
            <Card className='mb-2' 
                  style={{
                  padding: '10px',
                  width: "18rem",
                  display: 'flex',
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  }}>
              <Card.Title> Step 2: Edit your meme caption.</Card.Title>

              <Form>
                  <Form.Group className="mb-3">
                    <Form.Control type="text" 
                      value={topText}
                      placeholder='Top Text'
                      onChange={handleTopInputChange} />
                  </Form.Group> 

                  <Form.Group className="mb-3">
                    <Form.Control type="text" 
                      value={bottomText}
                      placeholder='Bottom Text'
                      onChange={handleBottomInputChange} />
                  </Form.Group>

                  <Button variant="dark" onClick={handleButtonClick}>
                    DISPLAY
                  </Button>
              </Form>
            </Card>

        </div>

        <div className='grid-item'>
            <Card className='mb-2' 
                  style={{
                  // padding: '10px',
                  width: "18rem",
                  display: 'flex',
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  }}
                >
                  <Card.Title>PREVIEW</Card.Title>
                  <div id="memeImage">
                  <Card.Img variant="top" src={selectedImage?.url}
                    style={{
                      display: 'flex', 
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      padding: '10px',
                      width: "300px"
                      }} />

                  <Card.ImgOverlay >
                    <Card.Text 
                        style={{ 
                          fontFamily: "Impact",
                          fontSize: "20px",
                          color: "blue",
                          textShadow: "1px 1px white", 
                          letterSpacing: "1px",
                          position: "relative",
                          top: "6%",
                          margin: "0",
                          overflow: "hidden",
                        }}>{displayTopText}
                    </Card.Text>

                    <Card.Text 
                      style={{ 
                        fontFamily: "Impact",
                        fontSize: "20px",
                        color: "blue",
                        textShadow: "1px 1px white", 
                        letterSpacing: "1px",
                        position: "absolute",
                        bottom: "15%",
                        width: "90%",
                        margin: "0",
                        overflow: "hidden",
                        }}>{displayBottomText}</Card.Text>
                    </Card.ImgOverlay>

                  </div>
              
            </Card>

            <div className="button-container"> 
              <Button variant="info"
              onClick={downloadImage}> SAVE</Button>
              <Button variant="danger" 
              onClick={handleResetButton}>START OVER</Button>
            </div>
        </div>

      </div>

    </div>
  );
}

export default App;
