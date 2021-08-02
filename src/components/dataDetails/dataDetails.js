import React, {Component} from 'react';

import styled from 'styled-components';

import {Data, FieldData} from '../dataAndFieldData';
import Spinner from '../spinner';

export default class DataDetails extends Component {

    state = {
        data : null,
        loading : false,
        error : false,
    }

    componentDidMount = () => {
        this.updateData();
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.dataId !== this.props.dataId) {
            this.updateData();
        }
    }

    updateData = () => {
        const {dataId, getData} = this.props;
        
        if (!dataId) {
            return;
        }

        this.setState({loading : true});

        getData(dataId)
            .then((data) => this.setState({data, loading: false}));
    }

    render() {
        const {titleList} = this.props;
        const {data, loading} = this.state;

        if (data === null && !loading) {
            return <MessageDataDetails>Выберите один из пунктов слева</MessageDataDetails>;
        }

        let content = null;
        if (titleList === 'Персонажи' && !loading) {

            content =   <Data data={data}>
                            <FieldData label={'Пол:'} field={'gender'}/>
                            <FieldData label={'Культура:'} field={'culture'}/>
                            <FieldData label={'Родился:'} field={'born'}/>
                            <FieldData label={'Умер:'} field={'died'}/>
                        </Data>;

        } else if(titleList === "Книги" && !loading) {
          
            content =   <Data data={data}>
                            <FieldData label={'Колличество страниц:'} field={'numberOfPages'}/>
                            <FieldData label={'Публикация:'} field={'publisher'}/>
                            <FieldData label={'Выпущена:'} field={'released'}/>
                        </Data>;

        } else if (titleList === 'Дома' && !loading) {

            content =   <Data data={data}>
                            <FieldData label={'Регион:'} field={'region'}/>
                            <FieldData label={'Язык:'} field={'words'}/>
                        </Data>;

        } else {
            content = null;
        }

        const spinner = loading ? <Spinner/> : null;
    
        return (
            <>
                {content}
                {spinner}
            </>
        )
    }
}

const MessageDataDetails = styled.div`
    height: 200px;
    padding-top: 90px;
`