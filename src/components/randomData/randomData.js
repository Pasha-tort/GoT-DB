import React, {Component} from 'react';

import styled from 'styled-components';

import {Data, FieldData} from '../dataAndFieldData';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import GoTServices from '../../services/GoTServices';

const Wrapper = styled.div``
const SpinnerStyled = styled.div`
    width: 300px;
`

export default class RandomData extends Component {

    constructor(props) {
        super(props);
        this.updateData = this.updateData.bind(this)        
    }
    got = new GoTServices();

    state={
        randomData : null,
        randomSection : null,
        loading : true,
        error : false,
    }

    componentDidMount = () => {
        this.updateData();
        this.timerId = setInterval(this.updateData, 5000);
    }

    componentWillUnmount = () => {
        clearInterval(this.timerId);
    }

    onRandomDataLoader = (randomData) => {
        this.setState({randomData, loading : false});
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        });
        clearInterval(this.timerId);
    }

    onClickErrorReboot = async () => {
        await this.setState({loading: true, error: false});
        await this.updateData();
        this.timerId = setInterval(this.updateData, 5000);
    }

    async updateData() {
        await this.setState({loading : true});

        const randomNum = await Math.floor(Math.random()*3);
        let id = null;

        switch (randomNum) {
            case 0:
                
                this.setState({randomSection: 'characters'});
                id = await Math.floor(Math.random()*2123 + 11);
                this.got.getCharacter(id)
                    .then(char => this.onRandomDataLoader(char))
                    .catch(this.onError); 
                break;


            case 1:
                
                this.setState({randomSection: 'books'});
                id = Math.floor(Math.random()*11 + 1);
                this.got.getBook(id)
                    .then(book => this.onRandomDataLoader(book))
                    .catch(this.onError);
                break;


            case 2:
    
                this.setState({randomSection: 'houses'});
                id = Math.floor(Math.random()*444 + 1);
                this.got.getHouse(id)
                    .then(house => this.onRandomDataLoader(house))
                    .catch(this.onError);
                break;


            default:
                this.setState({randomSection: null});
        }
    }

    render() {
        const {wrapper, ...resDataStyled} = this.props.styled;
        const {randomData, randomSection, loading, error} = this.state;

        let content = null;
        let textTitle = null;

        if (randomSection === 'characters' && !(loading || error)) {

            textTitle = "Рандомные данные персонажа: ";

            content =   <Data {...resDataStyled} textTitle={textTitle} data={randomData}>
                            <FieldData label={'Пол:'} field={'gender'}/>
                            <FieldData label={'Культура:'} field={'culture'}/>
                            <FieldData label={'Родился:'} field={'born'}/>
                            <FieldData label={'Умер:'} field={'died'}/>
                        </Data>

        } else if (randomSection === 'books' && !(loading || error)) {

            textTitle = "Рандомные данные книги: ";

            content =   <Data {...resDataStyled} textTitle={textTitle} data={randomData}>
                            <FieldData label={'Колличество страниц:'} field={'numberOfPages'}/>
                            <FieldData label={'Публикация:'} field={'publisher'}/>
                            <FieldData label={'Выпущена:'} field={'released'}/>
                        </Data>

        } else if (randomSection === 'houses' && !(loading || error)) {

            textTitle = "Рандомные данные дома: ";
            
            content =   <Data {...resDataStyled} textTitle={textTitle} data={randomData}>
                            <FieldData label={'Регион:'} field={'region'}/>
                            <FieldData label={'Язык:'} field={'words'}/>
                        </Data>

        } else {
            content = null;
        }

        const spinner = loading ? <Spinner as={SpinnerStyled}/> : null;
        const errorMessage = error ? <ErrorMessage onClickError={this.onClickError} width={'100%'}/> : null;

        return (
            <Wrapper width={'100%'} as={wrapper}>
                {spinner}
                {errorMessage}
                {content}
            </Wrapper>
        )
    }
}

