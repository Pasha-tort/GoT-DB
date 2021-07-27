import React, {Component} from "react";

import styled from 'styled-components';

import ItemList from "../../itemList";
import {Data, FieldData} from '../../dataAndFieldData';

import GoTServices from "../../../services/GoTServices";

const Container = styled.div`
    display: flex;
`

export default class CharactersPage extends Component {
    got = new GoTServices();

    state = {
        selectedChar: null,
        page: 1,
        filterPage: 50,
        error: false,
    }

    onClickItem = (id) => {
        this.setState({selectedChar : id});
    }

    render() {
        console.log(this.props);
        const {page, filterPage} = this.state;
        const {styled} = this.props;

        const ItemsList = (
            <ItemList
                onClickItem = {this.onClickItem}
                getData = {() => this.got.getCharactersAll(page, filterPage)}
                styled={styled}
            />
        )

        const DataBox = (
            <Data
                itemId={this.state.selectedChar}
                getData={this.got.getCharacter}
                styled={styled}>
                <FieldData field='gender' label='Пол: '/>
                <FieldData field='born' label='Родился: '/>
                <FieldData field='died' label='Умер: '/>
                <FieldData field='culture' label='Культура: '/>
            </Data>
        )

        return (
            <ContainerData as={Container} left={ItemsList} right={DataBox}/>
        )
    }
}

class ContainerData extends Component {
    render() {
        const {left, right} = this.props;
        return (
            <>
                {left}{right}
            </>
        )
    }
}