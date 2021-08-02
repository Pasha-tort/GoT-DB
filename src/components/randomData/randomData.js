import React, {Component} from 'react';

import styled from 'styled-components';
import {styledObj} from '../app';

import {Data, FieldData} from '../dataAndFieldData';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

import GoTServices from '../../services/GoTServices';

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
        loading : false,
        error : false,
    }

    componentDidMount = () => {
        this.updateData();
        this.timerId = setInterval(this.updateData, 5000);
    }

    componentWillUnmount = () => {
        this.setState({randomSection: null, randomData: null})
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
        const {Wrapper} = styledObj;
        const {randomData, randomSection, loading, error} = this.state;

        let content = null;
        let textTitle = null;

        if (randomSection === 'characters' && !(loading || error)) {

            textTitle = "Рандомные данные персонажа: ";

            content =   <Data textTitle={textTitle} data={randomData}>
                            <FieldData label={'Пол:'} field={'gender'}/>
                            <FieldData label={'Культура:'} field={'culture'}/>
                            <FieldData label={'Родился:'} field={'born'}/>
                            <FieldData label={'Умер:'} field={'died'}/>
                        </Data>

        } else if (randomSection === 'books' && !(loading || error)) {

            textTitle = "Рандомные данные книги: ";

            content =   <Data textTitle={textTitle} data={randomData}>
                            <FieldData label={'Колличество страниц:'} field={'numberOfPages'}/>
                            <FieldData label={'Публикация:'} field={'publisher'}/>
                            <FieldData label={'Выпущена:'} field={'released'}/>
                        </Data>

        } else if (randomSection === 'houses' && !(loading || error)) {

            textTitle = "Рандомные данные дома: ";
            
            content =   <Data textTitle={textTitle} data={randomData}>
                            <FieldData label={'Регион:'} field={'region'}/>
                            <FieldData label={'Язык:'} field={'words'}/>
                        </Data>

        } else {
            content = null;
        }

        const spinner = loading ? <Spinner as={SpinnerStyled}/> : null;
        const errorMessage = error ? <ErrorMessage onClickError={this.onClickErrorReboot} width={'100%'}/> : null;
    
        return (
            <Wrapper width={'100%'}>
                {spinner}
                {errorMessage}
                {content}
            </Wrapper>
        )
     
    }
}



const ButtonShowRandomData = styled.button`
    margin-top: 20px;
    width: 160px;
    height: 50px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    background: #fff;
    color: rgb(52, 52, 189);
    transition: 0.2s all;
    font-size: 18px;
    :hover {
        background: rgb(52, 52, 189);
        color: #fff;
        transition: 0.2s all;
    }
`

const ContainerRandomDataStyled = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const FixContainerHeight = styled.div`
    min-height: 260px;
    width: 100%;
`


class ContainerRandomData extends Component {

    state = {
        showRandomData : true,
    }

    onShowRandomData = () => {
        this.setState(({showRandomData}) => {
            return {
                showRandomData : !showRandomData
            }
        })
    }

    render() {
        const {showRandomData} = this.state;
        const {styled} = this.props;

        let textRandomBlockButton = showRandomData ? 'Скрыть данные' : 'Показать данные';
        let randomData = showRandomData ? <RandomData styled={styled}/> : null;

        return (
            <ContainerRandomDataStyled>
                <FixContainerHeight>
                    {randomData}
                </FixContainerHeight>
                <ButtonShowRandomData onClick={this.onShowRandomData}>{textRandomBlockButton}</ButtonShowRandomData>
            </ContainerRandomDataStyled>
        )
    }
}

export {ContainerRandomData};

