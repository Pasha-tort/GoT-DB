import React, {Component} from 'react';
import GoTServices from '../../services/GoTServices';

import styled from 'styled-components';

import {Data, FieldData} from '../dataAndFieldData';
import Spinner from '../spinner';
import ErrorMessage from '../errorMessage';

const Wrapper = styled.div`
    min-height: 80px;
    justify-content: center;
`

export default class OutputData extends Component {
    got = new GoTServices();

    state = {
        outputData : null,
        loading : false,
        error : false,
    }

    componentDidMount() {
        this.updateData();
    }

    componentDidUpdate(prevProps) {
        if (this.props.dataId !== prevProps.dataId) {
            this.updateData();
        }
        if (this.props.typeSection !== prevProps.typeSection) {
            this.updateContainer();
        }
    }

    updateContainer = () => {
        this.setState({outputData : null});
    }

    onError = () => {
        this.setState({loading: false, error: true});
    }

    updateData = async () => {
        const {dataId, typeSection} = this.props;
        if (!dataId) {
            return;
        }

        await this.setState({loading : true});

        let getData = null;

        switch (typeSection) {
            case 'characters':
                getData = this.got.getCharacter(dataId);
                break;
            case 'books':
                getData = this.got.getBook(dataId);
                break;
            case 'houses':
                getData = this.got.getHouse(dataId);
                break;
            default:
                getData = null;
        }

        if (getData) {
            getData
                .then(outputData => this.setState({outputData, loading : false}))
                .catch(this.onError); 
        }
    }

    render() {
        const {styled : {wrapper, ...resDataStyled}, typeSection} = this.props;
        const {outputData, loading, error} = this.state;

        if (outputData === null && !loading) {
            return <Wrapper as={wrapper}>Выберите один из пунктов слева</Wrapper>
        }

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        let content = null;

        if (typeSection === 'characters' && !(loading || error)) {

            content =   <Data {...resDataStyled} data={outputData}>
                            <FieldData label={'Пол:'} field={'gender'}/>
                            <FieldData label={'Культура:'} field={'culture'}/>
                            <FieldData label={'Родился:'} field={'born'}/>
                            <FieldData label={'Умер:'} field={'died'}/>
                        </Data>

        } else if (typeSection === 'books' && !(loading || error)) {

            content =   <Data {...resDataStyled} data={outputData}>
                            <FieldData label={'Колличество страниц:'} field={'numberOfPages'}/>
                            <FieldData label={'Публикация:'} field={'publisher'}/>
                            <FieldData label={'Выпущена:'} field={'released'}/>
                        </Data>

        } else if (typeSection === 'houses' && !(loading || error)) {

            content =   <Data {...resDataStyled} data={outputData}>
                            <FieldData label={'Регион:'} field={'region'}/>
                            <FieldData label={'Язык:'} field={'words'}/>
                        </Data>
        }

        return (
            <Wrapper as={wrapper}>
                {errorMessage}
                {spinner}
                {content}
            </Wrapper>
        )
    }
}
