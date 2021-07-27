import React, {Component} from 'react';
import styled from 'styled-components';

const HeaderLisStyle = styled.div`
    display: flex;
    position: relative;
    justify-content: flex-end;
    margin-top: 25px;
    margin-right: 50px;
    height: 40px;
`
const NameServices = styled.div`
    position: absolute;
    height: 40px;
    font-size: 24px;
    padding-top: 10px;
    padding-bottom: 10px;
    color: #fff;
    left: 40px;
`

const HeaderButtonStyle = styled.button`
    padding: 0 60px 0 60px;
    border: 0px;
    background: none;
    color: #fff;
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
                <HeaderLisStyle>
                    <NameServices>База данных вселенной Игры Престолов</NameServices>
                    <HeaderButtonStyle onClick={() => this.props.onClickHeader('characters')}>Персонажи</HeaderButtonStyle>
                    <HeaderButtonStyle onClick={() => this.props.onClickHeader('books')}>Книги</HeaderButtonStyle>
                    <HeaderButtonStyle onClick={() => this.props.onClickHeader('houses')}>Дома</HeaderButtonStyle>
                </HeaderLisStyle>
        )
    }
}