import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import styled from 'styled-components';

import {ContainerRandomData} from '../randomData';
import Header from '../header/header';
import {PageCharacters, PageBooks, PageHouses} from '../pages';


const BodyApp = styled.div`
    margin-top: 60px;
    display: grid;
    grid-template-columns: 0.4fr 1fr;
    justify-items: center;
    align-items: start;
`

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: ${(props) => props.width || '90%'};
    height: ${(props) => props.height || null};
    background: rgba(256, 256, 256, 0.6);
    overflow: hidden;
    border-radius: 10px;
    text-align: center;
`

const Title = styled.div`
    background: rgba(52, 52, 189, 0.6);
    border-top-left-radius: 10px;
    border-top-right-radius: ${props => props.borderRadius || '10px'};
    padding-top: 20px;
    min-height: 60px;
    color: #fff;
`

const List = styled.ul`
    list-style-type: none;
    border-radius: 10px;
    li {
        border-bottom: 1px solid grey;
        height: 40px;
        padding-top: 10px;
    }
`

export const styledObj = {
    Wrapper,
    Title,
    List,
}

export default class App extends Component {

    onClickHeader = (type) => {
        this.setState({typeSection : type});
    }

    render() {
        return (
            <Router>
                <Header onClickHeader={this.onClickHeader}/>
                <BodyApp>
                    <ContainerRandomData/>
                    <Route path='/' component={false}/>
                    <Route path='/characters/' component={PageCharacters}/>
                    <Route path='/books/' component={PageBooks}/>
                    <Route path='/houses/' component={PageHouses}/>
                </BodyApp>
            </Router>
        )
    }
}