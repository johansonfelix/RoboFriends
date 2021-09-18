import React, { useState, useEffect } from "react";
import {connect} from 'react-redux';
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundary from "../components/ErrorBoundary";
import { setSearchfield } from "../actions";
import "./App.css";

const mapStateToProps = (state) => {
  return {
    searchField: state.searchField, 
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  onSearchChange : (event) => dispatch(setSearchfield(event.target.value))
  }
}

const App = (props) => {
  const [robots, setRobots] = useState([]);
  const { searchField, onSearchChange } = props;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => setRobots(users));
  }, []);


  const filteredRobots = robots.filter((robot) => {
    
    return robot.name.toLowerCase().includes(searchField.toLowerCase());
    
  });

  return !robots.length ? (
    <h1 className="tc ">Loading</h1>
  ) : (
    <div className="tc">
      <h1 className="f2">Robofriends</h1>
      <SearchBox searchChange={onSearchChange} />
      <Scroll>
        <ErrorBoundary>
          
          <CardList robots={filteredRobots} />
        </ErrorBoundary>
      </Scroll>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
