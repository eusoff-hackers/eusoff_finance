import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { 
  Form,
  Grid,
  Button,
  Segment,
  Header,
} from 'semantic-ui-react';

const InputForm = ({ setActiveItem }) => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [matric, setMatric] = useState('');
  const [roomnum, setRoom] = useState('');
  const [contact, setContact] = useState('');
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [refnum, setRef] = useState('');
 
  const onChange = (event, setState) => {
    // localStorage.setItem(event.target.name, event.target.value);
    setState(event.target.value)
  };

  useEffect(() => {
    setActiveItem();
  },[]);

  const onSubmit = () => {
    const state = {
      name: name,
      matric: matric,
      roomnum: roomnum,
      contact: contact,
      event: event,
      date: date,
      refnum: refnum,
    }
    localStorage.setItem("formData", JSON.stringify(state));
    history.push("/claims");
  }
  return (
    <Segment
      textAlign='center'
      style={{ minHeight: '100vh', padding: '1em 1em' }}
      vertical
    >
      <Header>Overall Details</Header>
      <Grid columns={16} textAlign='left'>
        <Grid.Column width={5}></Grid.Column>
        <Grid.Column width={6}>
          <Form size='medium' key='medium' onSubmit={onSubmit}>
            <Form.Field width={16}>
              <label>Name:</label>
              <input type = "text" name = "name" onChange={(e) => onChange(e, setName)}/>
            </Form.Field>
            <Form.Field width={16}>
              <label>Matric:</label>
              <input type = "text" name = "matric" onChange={(e) => onChange(e, setMatric)}/>
            </Form.Field>
            <Form.Field width={16}>
              <label>Room number:</label>
              <input type = "text" name = "roomnum" onChange={(e) => onChange(e, setRoom)}/>
            </Form.Field>
            <Form.Field width={16}>
              <label>Contact:</label>
              <input type = "text" name = "contact" onChange={(e) => onChange(e, setContact)}/>
            </Form.Field>
            <Form.Field width={16}>
              <label>Event:</label>
              <input type = "text" name = "event" onChange={(e) => onChange(e, setEvent)}/>
            </Form.Field>
            <Form.Field width={16}>
              <label>Date:</label>
              <input type = "date" name = "date" onChange={(e) => onChange(e, setDate)}/>
            </Form.Field>
            <Form.Field width={16}>
              <label>Reference number:</label>
              <input type = "text" name = "refnum" onChange={(e) => onChange(e, setRef)}/>
            </Form.Field>
            <Button 
              type='submit' 
              fluid
            >
              Submit
            </Button>
          </Form>
        </Grid.Column>
        <Grid.Column width={5}></Grid.Column>
      </Grid>
    </Segment>
  )
}

export default InputForm;