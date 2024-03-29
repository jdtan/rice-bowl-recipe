import './RecipeList.css';
import { Row, Col } from 'antd';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AiOutlinePushpin, AiOutlineSave } from 'react-icons/ai';
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

class RecipeList extends Component {
  constructor() {
    super();
    this.state = {
      response: [],
      dropdownOpen: false,
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ dropdownOpen: !this.state.dropdownOpen });
  }

  componentDidMount() {
    this.callApi()
      .then((res) => this.setState({ response: res }))
      .catch((err) => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/home');
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  render() {
    const style = {
      background: '#6495ED',
      padding: '25px 0 15px 10px',
      opacity: 0.8,
      height: '250px',
      width: '300px'
    };

    return (
      <div className="all-recipe">
        <h1><b>Your Recipes</b></h1>
        <div className="search-bar">
          {/* TODO: search function to be design */}
          <input
            type="text"
            id="header-search"
            placeholder="Quick Find Recipe"
            name="quick-find"
          />
          <Link to="/new_recipe">
            <Button color="primary">+ New Recipe</Button>
          </Link>
        </div>
        <br />
        <div className="flex">
          <h2>Pinned</h2>
          <div className="icons">
            <AiOutlinePushpin size={28} />
          </div>
        </div>
        <hr></hr>
        <div className="pinned-recipe"></div>
        <br />
        <br />
        <div className="flex">
          <h2>Saved Recipes</h2>
          <div className="icons">
            <AiOutlineSave size={28} />
          </div>
          <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle caret outline color="primary">
              Sort by
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>Rate</DropdownItem>
              <DropdownItem>Prep Time</DropdownItem>
              <DropdownItem>Total Time</DropdownItem>
              <DropdownItem>Serving Size</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        </div>
        <hr></hr>
        <div className="saved-recipe">
          {/* TODO: Add links to each displayed recipe */}
          <Row gutter={[10, 25]}>
            {this.state.response.map((res) => (
              <Col className="recipe-row" span={6}>
                <div style={style}>
                  <h5 style={{color: '#fff'}}>{res.name}</h5>
                  <img src={res.imageUrl} alt="Recipe thumbnail"
                  height="130px" width="130px"></img><br/>
                  <span>Rate: {res.meta.rating}/5</span><br/>
                  <span>votes: {res.meta.votes} </span>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    );
  }
}

export default RecipeList;
