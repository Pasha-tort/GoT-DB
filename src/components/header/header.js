import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const HeaderListStyle = styled.div`
    display: flex;
    position: relative;
    justify-content: flex-end;
    align-items: center;
    margin-top: 25px;
    margin-right: 50px;
    height: 40px;
`
const NameServices = styled.a`
    position: absolute;
    height: 40px;
    font-size: 24px;
    padding-top: 8px;
    text-decoration: none;
    color: #fff;
    left: 40px;
`

const HeaderButtonStyle = styled.a`
    padding: 0 60px 0 60px;
    border: 0px;
    height: 40px;
    padding-top: 8px;
    background: none;
    color: #fff;
    text-decoration: none;
    font-size: 18px;
    cursor: pointer;
    transition: 0.2s all;
    :hover {
        background: #fff;
        color: blue;
        transition: 0.2s all;
    }
`



export default class Header extends Component {


    render() {
        return (
                <HeaderListStyle>
                    <NameServices as={Link} to='/'>База данных вселенной Игры Престолов</NameServices>
                    <HeaderButtonStyle as={Link} to='/characters/'>Персонажи</HeaderButtonStyle>
                    <HeaderButtonStyle as={Link} to='/books/'>Книги</HeaderButtonStyle>
                    <HeaderButtonStyle as={Link} to='/houses/'>Дома</HeaderButtonStyle>
                </HeaderListStyle>
        )
    }
}