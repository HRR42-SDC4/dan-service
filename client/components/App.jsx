import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';
import Recommendation from './Recommendation.jsx';

const Allrecs = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const Recheader = styled.div`
  border-top: 1px solid black;
  padding-top: 15px;
  padding-bottom: 15px;
  font-size: 20px;
  line-height: 20px;
  font-family: 'Calibre-Medium';
`;

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      genre: '',
      name: '',
      recs: []
    };

    this.get = this.get.bind(this);
  }

  componentDidMount() {
    this.get();
  }

  get() {
    let params = (new URL(document.location)).searchParams;
    let restaurantId = parseInt(params.get('restaurantid')) || 1;
    $.ajax({
      type: 'GET',
      url: 'api/recommendations/'+restaurantId,
      success: (data) => {
        this.setState({
          genre: data.genre,
          name: data.name,
          recs: data.recs
        });
      },
      failure: (err) => {
        console.log(err);
      }
    });
  }

  render() {
    return (
      <div>
        <Recheader>More {this.state.genre} Near {this.state.name}</Recheader>
        <Allrecs>
          {this.state.recs.map(rec => <Recommendation rec={rec} genre={this.state.genre}/>)}
        </Allrecs>
      </div>
    );
  }
};

export default App;