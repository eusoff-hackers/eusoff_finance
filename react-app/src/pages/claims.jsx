import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Form,
  Grid,
  Button,
  Segment,
  Header,
  Container
} from 'semantic-ui-react';
import axios from 'axios';

const config = { headers: {  
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
}, responseType: 'blob'}

const Claims = ({ setActiveItem }) => {
  useEffect(() => {
    setActiveItem();
  }, []);
  const [receipts, setReceipts] = useState([
    {
      num1: "",
      description1: "",
      amount1: 0.00,
      type1: ""
    }
  ]);
  const [hasHtml, setHasHtml] = useState(false);
  const [totalAmount, setTotal] = useState(0);

  const addReceipts = () => {
    const numReceipts = receipts.length + 1;
    const newReceipt = {
      [`num${numReceipts}`]: "",
      [`description${numReceipts}`]: "",
      [`amount${numReceipts}`]: 0.00,
      [`type${numReceipts}`]: ""
    }
    setReceipts(receipts.concat(newReceipt));
  }
 
  const calcTotal = (r) => {
    let total = 0;
    r.forEach((receipt, index) => {
      total += Number(receipt[`amount${index+1}`]);
    })
    setTotal(total);
  }

  const onChange = (event, index) => {
    let updateReceipts = receipts;
    updateReceipts[index][event.target.name] = event.target.value;
    console.log(updateReceipts);
    calcTotal(updateReceipts);
    setReceipts(updateReceipts);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let payload = JSON.parse(localStorage.getItem("formData"));
    // let total = 0;
    // receipts.forEach((receipt, index) => {
    //   total += Number(receipt[`amount${index+1}`]);
    // })
    payload['receipts'] = receipts;
    payload['total'] = totalAmount;
    console.log("Payload: ", totalAmount);
    axios.post('http://localhost:5000/generateFormB', payload, config)
    .then((res) => {
      console.log(res.data);
      //Create a Blob from the PDF Stream
      const file = new Blob(
        [res.data], 
        {type: 'application/pdf'});
      //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
          window.open(fileURL);
      // localStorage.setItem("formB", res.data.content);
      // setHasHtml(true);
    });
  }
  return (
    <Segment
      textAlign='center'
      style={{ minHeight: '100vh', padding: '1em 1em' }}
      vertical
    >
      <Header>Details of Reimbursement Expenditure</Header>
      <Grid columns={16} textAlign='left'>
        <Grid.Column width={5}></Grid.Column>
        <Grid.Column width={6}>
          <Form size='medium' key='medium' onSubmit={onSubmit}>
            {receipts.map((receipt, index) => {
              const keys = Object.keys(receipt);
              console.log(keys);
              return (
                <div key={index}>
                  <h3>Receipt #{index+1}</h3>
                  <Form.Field width={16}>
                    <label>Receipt Number:</label>
                    <input type = "text" name ={keys[0]} onChange={(e) => onChange(e,index)}/>
                  </Form.Field>
                  <Form.Field width={16}>
                    <label>Description:</label>
                    <input type = "text" name ={keys[1]} onChange={(e) => onChange(e,index)}/>
                  </Form.Field>
                  <Form.Field width={16}>
                    <label>Amount:</label>
                    <input type = "number" name ={keys[2]} step=".01" onChange={(e) => onChange(e,index)}/>
                  </Form.Field>
                  <Form.Field width={16}>
                    <label for="type">Receipt Type:</label>
                    <select id="type" name={keys[3]} onChange={(e) => onChange(e,index)}>
                    <option value="blank"></option>
                    <option value="fnb">Food and Beverage</option>
                    <option value="prize">Prize</option>
                    <option value="svp">Small Value Purchase</option>
                    </select>
                  </Form.Field>
                </div>
            )})}
            <Button 
              fluid
              style={{ marginTop: '16px' }}
              color="green"
              onClick={addReceipts}
            >
              Add receipt
            </Button>
            <Button 
              type='submit' 
              fluid
              style={{ marginTop: '16px' }}
            >
              Generate Form
            </Button>
          </Form>
        </Grid.Column>
        <Grid.Column width={5}></Grid.Column>
      </Grid>
      <div 
        style={{ 
          position: 'fixed',
          left: 0,
          bottom: 0,
          width: '100vw',
          display: 'flex',
          justifyContent: 'space-between',
          borderTop: '1px solid grey',
          padding: '10px',
        }}
      >
        {hasHtml ? (
          <Link to="/previewB">
            <Button color="blue">Preview Form</Button>
          </Link>
        ) : (
          <Button disabled>Preview Form</Button>
        )}
        <Header floated="right">Total Amount: ${totalAmount}</Header>
      </div>
    </Segment>
  )
}

export default Claims;