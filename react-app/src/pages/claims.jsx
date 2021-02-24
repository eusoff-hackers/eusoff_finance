import React, { useEffect, useState } from 'react';
import { 
  Form,
  Grid,
  Button,
  Segment,
  Header,
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
      type1: "",
      needAck1: undefined,
    }
  ]);

  const [ackReceipts, setAckReceipts] = useState({});
  const [totalAmount, setTotal] = useState(0);
  const [reasonAck, setReasonAck] = useState('');
  const [remarks, setRemarks] = useState('');

  const addReceipts = () => {
    const numReceipts = receipts.length + 1;
    const newReceipt = {
      [`num${numReceipts}`]: "",
      [`description${numReceipts}`]: "",
      [`amount${numReceipts}`]: 0.00,
      [`type${numReceipts}`]: "",
      [`needAck${numReceipts}`]: false,
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

  const updateSupplierDetails = (value, index, isContact) => {
    let newAckReceipts = { ...ackReceipts };
    if (isContact) {
      if (newAckReceipts[`needAck${index+1}`]) {
        newAckReceipts[`needAck${index+1}`]['supplierContact'] = value;
      } else {
        newAckReceipts[`needAck${index+1}`] = {
          supplierContact: value,
          description: receipts[index][`description${index+1}`],
          amount: receipts[index][`amount${index+1}`]
        }
      }
    } else {
      if (newAckReceipts[`needAck${index+1}`]) {
        newAckReceipts[`needAck${index+1}`]['supplier'] = value;
      } else {
        newAckReceipts[`needAck${index+1}`] = {
          supplier: value,
          description: receipts[index][`description${index+1}`],
          amount: receipts[index][`amount${index+1}`]
        }
      }
    }
    setAckReceipts(newAckReceipts);
  }

  const deleteSupplierDetails = (key) => {
    let newAckReceipts = { ...ackReceipts };
    delete newAckReceipts[key];
    setAckReceipts(newAckReceipts);
  }

  const onChange = (event, index) => {
    let updateReceipts = [...receipts];
    if (event.target.name.slice(0, -1) === 'needAck') {
      updateReceipts[index][event.target.name] = event.target.checked;
      if (event.target.checked === false) {
        deleteSupplierDetails(event.target.name);
      }
    } else {
      updateReceipts[index][event.target.name] = event.target.value;
    }
    calcTotal(updateReceipts);
    setReceipts(updateReceipts);
  };

  const onSubmit = (e) => {
    // e.preventDefault();
    let payload = JSON.parse(localStorage.getItem("formData"));
    // let total = 0;
    // receipts.forEach((receipt, index) => {
    //   total += Number(receipt[`amount${index+1}`]);
    // })
    localStorage.setItem("receipts", JSON.stringify(receipts));
    localStorage.setItem("totalAmount", totalAmount);
    payload['receipts'] = receipts;
    payload['total'] = totalAmount;
    console.log("Payload: ", payload);
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
      // localStorage.setItem("formData", res.data.content);
      // setHasHtml(true);
    });
  }

  const generateFormA = () => {
    let payload = JSON.parse(localStorage.getItem("formData"));
    payload['ackReceipts'] = Object.values(ackReceipts);
    let ackTotalAmount = 0;
    receipts.map((receipt, index) => {
      if (receipt[`needAck${index+1}`] === true) {
        ackTotalAmount += Number(receipt[`amount${index+1}`]);
      }
    });
    payload['ackTotalAmount'] = ackTotalAmount;
    payload['reasonAck'] = reasonAck;
    payload['remarks'] = remarks;
    console.log("Payload: ", payload);
    axios.post('http://localhost:5000/generateFormA', payload, config)
    .then((res) => {
      console.log(res.data);
      const file = new Blob(
        [res.data], 
        {type: 'application/pdf'});
      //Build a URL from the file
          const fileURL = URL.createObjectURL(file);
      //Open the URL on new Window
          window.open(fileURL);
      // localStorage.setItem("formData", res.data.content);
    });
  }

  useEffect(() => {
    let payload = JSON.parse(localStorage.getItem("receipts"));
    if (payload) {
      setReceipts(payload);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(ackReceipts).length === 0) {
      setReasonAck('');
      setRemarks('');
    }
  }, [ackReceipts]);

  const onClear = () => {
    setAckReceipts({});
    const receiptState = [
      {
        num1: "",
        description1: "",
        amount1: 0.00,
        type1: "",
        needAck1: undefined,
      }
    ];
    setReceipts(receiptState);
    localStorage.removeItem("receipts");
    setTotal(0);
    localStorage.removeItem("totalAmount");
  }
  return (
    <Segment
      textAlign='center'
      style={{ minHeight: '100vh', padding: '1em 1em' }}
      vertical
    >
      <Header style={{ marginTop: '30px' }}>Details of Reimbursement Expenditure</Header>
      <Grid columns={16} textAlign='left' style={{ maxHeight: 'calc(100vh - 150px)', overflow: 'scroll' }}>
        <Grid.Column width={5}></Grid.Column>
        <Grid.Column width={6}>
          <Form size='medium' key='medium' /*onSubmit={onSubmit}*/>
            {receipts.map((receipt, index) => {
              const keys = Object.keys(receipt);
              console.log(keys);
              const needAck = receipt[keys[4]];
              console.log(ackReceipts);
              return (
                <div key={index}>
                  <h3>Receipt #{index+1}</h3>
                  <Form.Field width={16}>
                    <label>Receipt Number:</label>
                    <input type = "text" name ={keys[0]} value={receipt[keys[0]]} onChange={(e) => onChange(e,index)}/>
                  </Form.Field>
                  <Form.Field width={16}>
                    <label>Description:</label>
                    <input type = "text" name ={keys[1]} value={receipt[keys[1]]} onChange={(e) => onChange(e,index)}/>
                  </Form.Field>
                  <Form.Field width={16}>
                    <label>Amount:</label>
                    <input type = "number" name ={keys[2]} step=".01" value={receipt[keys[2]]} onChange={(e) => onChange(e,index)}/>
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
                  <Form.Field width={16}>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        '&:hover': {
                          cursor: 'pointer',
                        }
                      }}
                    >
                      <input style={{ marginRight: '10px' }} type = "checkbox" name ={keys[4]} checked={needAck} onChange={(e) => onChange(e,index)}/>
                      Need Acknowledgement
                    </label>
                  </Form.Field>
                  {needAck === true && (
                    <>
                      <Form.Field width={16}>
                        <label>Supplier:</label>
                        <input 
                          type = "text" 
                          name ={`supplier${index+1}`} 
                          value={ackReceipts[`needAck${index+1}`] ? ackReceipts[`needAck${index+1}`][`supplier`] : undefined} 
                          onChange={(e) => updateSupplierDetails(e.target.value, index)}
                        />
                      </Form.Field>
                      <Form.Field width={16}>
                        <label>Supplier Contact:</label>
                        <input 
                          type = "text" 
                          name ={`supplierContact${index+1}`}
                          value={ackReceipts[`needAck${index+1}`] ? ackReceipts[`needAck${index+1}`][`supplierContact`] : undefined} 
                          onChange={(e) => updateSupplierDetails(e.target.value, index, true)}
                        />
                      </Form.Field>
                    </>
                  )}
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
              // type='submit' 
              fluid
              style={{ marginTop: '16px' }}
              onClick={onSubmit}
            >
              Generate Form B
            </Button>
            {Object.keys(ackReceipts).length > 0 && (
              <>
                <Form.Field width={16}>
                  <label for="type">Reason for acknowledgement:</label>
                  <select id="type" name="reasonack" onChange={(e) => setReasonAck(e.target.value)}>
                  <option value="blank"></option>
                  <option value="lack_info">ORGINAL RECEIPT LACK INFORMATION ON SUPPLIER</option>
                  <option value="damage">RECEIPT DAMAGED BEYOND SALVAGE</option>
                  <option value="not_issued">NO RECEIPT WAS ISSUED</option>
                  </select>
                </Form.Field>
                {reasonAck === "not_issued" && (
                  <Form.Field width={16}>
                    <label>Reason (If no receipt was issued) / Other Remarks:</label>
                    <input type = "textarea" name ="remarks" onChange={(e) => setRemarks(e.target.value)}/>
                  </Form.Field>
                )}
                <Button
                  fluid
                  style={{ marginTop: '16px' }}
                  onClick={generateFormA}
                >
                  Generate Acknkowledgement Form
                </Button>
              </>
            )}
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
        <Button 
          type='button'
          onClick={onClear}
        >
          Clear
        </Button>
        <Header floated="right">Total Amount: ${totalAmount}</Header>
      </div>
    </Segment>
  )
}

export default Claims;