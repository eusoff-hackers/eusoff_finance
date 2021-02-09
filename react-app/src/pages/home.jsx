import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Container,
  Header,
  Icon,
  Segment,
} from 'semantic-ui-react'

const Home = () => {
  return (
    <Segment
      inverted
      color='violet'
      textAlign='center'
      style={{ minHeight: '100vh', padding: '1em 1em' }}
      vertical
    >
      <Container text>
        <Header
          as='h1'
          content='Treasurers'
          inverted
          style={{
            fontSize: '4em',
            fontWeight: 'normal',
            marginBottom: 0,
            marginTop: '4em',
          }}
        />
        <Header
          as='h2'
          content='Claim form generator'
          inverted
          style={{
            fontSize: '1.7em',
            fontWeight: 'normal',
            marginTop: '1.5em',
          }}
        />
        <Link to="/input">
          <Button primary size='huge'>
            Get Started
            <Icon name='right arrow' />
          </Button>
        </Link>
      </Container>
    </Segment>
    // <div class="container d-flex h-100 align-items-center">
    //     <div class="mx-auto text-center">
    //         <h1 class="mx-auto my-0 text-uppercase">Treasurers</h1>
    //         <h2 class="text-white-50 mx-auto mt-2 mb-5">Claim form generator</h2>
    //         <a class="btn btn-primary js-scroll-trigger" href="/input">Get Started</a>
    //     </div>
    // </div>
  )
}

export default Home;