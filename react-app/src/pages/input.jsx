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
    setState(event.target.value)
  };

  useEffect(() => {
    setActiveItem();
    let payload = JSON.parse(localStorage.getItem("formData"));
    console.log(payload);
    if (payload !== null) {
      if (payload.name !== '') {
        setName(payload.name);
      }
      if (payload.matric !== '') {
        setMatric(payload.matric);
      }
      if (payload.roomnum !== '') {
        setRoom(payload.roomnum);
      }
      if (payload.contact !== '') {
        setContact(payload.contact);
      }
      if (payload.event !== '') {
        setEvent(payload.event);
      }
      if (payload.date !== '') {
        setDate(payload.date);
      }
      if (payload.refnum !== '') {
        setRef(payload.refnum);
      }
    }
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

  const onClear = () => {
    setName('');
    setMatric('');
    setEvent('');
    setRoom('');
    setDate('');
    setContact('');
    setRef('');

    const state = {
      name: '',
      matric: '',
      roomnum: '',
      contact: '',
      event: '',
      date: '',
      refnum: '',
    }
    localStorage.setItem("formData", JSON.stringify(state));
  }
  
  return (
    <Segment
      textAlign='center'
      style={{ marginTop: '50px', minHeight: 'calc(100vh - 50px)', padding: '1em 1em' }}
      vertical
    >
      <Header>Overall Details</Header>
      <Grid columns={16} textAlign='left'>
        <Grid.Column width={5}></Grid.Column>
        <Grid.Column width={6}>
          <Form size='medium' key='medium' onSubmit={onSubmit}>
            <Form.Field width={16}>
              <label>Name:</label>
              <input type = "text" name = "name" value={name} onChange={(e) => onChange(e, setName)}/>
            </Form.Field>
            <Form.Field width={16}>
              <label>Matric:</label>
              <input type = "text" name = "matric" value={matric} onChange={(e) => onChange(e, setMatric)}/>
            </Form.Field>
            <Form.Field width={16}>
              <label>Room number:</label>
              <input type = "text" name = "roomnum" value={roomnum} onChange={(e) => onChange(e, setRoom)}/>
            </Form.Field>
            <Form.Field width={16}>
              <label>Contact:</label>
              <input type = "text" name = "contact" value={contact} onChange={(e) => onChange(e, setContact)}/>
            </Form.Field>
            <Form.Field width={16}>
              <label>Event:</label>
              <input type = "text" name = "event" value={event} onChange={(e) => onChange(e, setEvent)}/>
            </Form.Field>
            <Form.Field width={16}>
              <label>Date:</label>
              <input type = "date" name = "date" value={date} onChange={(e) => onChange(e, setDate)}/>
            </Form.Field>
            <Form.Field width={16}>
              <label>Reference number:</label>
              <input type = "text" name = "refnum" value={refnum} onChange={(e) => onChange(e, setRef)}/>
            </Form.Field>
            <Button 
              type='submit' 
              fluid
              color="green"
              style={{ marginBottom: '10px' }}
            >
              Submit
            </Button>
            <Button 
              type='button' 
              fluid
              onClick={onClear}
            >
              Clear
            </Button>
          </Form>
        </Grid.Column>
        <Grid.Column width={5}></Grid.Column>
      </Grid>
    </Segment>
  )
}

export default InputForm;