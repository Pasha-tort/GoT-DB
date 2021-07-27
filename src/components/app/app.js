import React, {Component} from 'react';
// import { BrowserRouter as Router } from 'react-router-dom';

import styled from 'styled-components';

import RandomData from '../randomData';
import ItemList from '../itemList';
import OutputData from '../outputData';
import Header from '../header/header';
// import CharactersPage from '../pages/charactersPage/charactersPage';
// import ErrorMessage from '../errorMessage';


const BodyApp = styled.div`
    margin-top: 60px;
    display: grid;
    grid-template-columns: 0.6fr 1fr 0.6fr;
    justify-items: center;
    align-items: start;
    height: calc(100vh - 180px);
`

const ContainerRandomData = styled.div`
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const FixContainerHeight = styled.div`
    min-height: 260px;
    width: 100%;
`

const WraperList = styled.div`
    display: flex;
    flex-direction: column;
    width: ${(props) => props.width || '90%'};
    height: ${(props) => props.height || null};
    background: rgba(256, 256, 256, 0.6);
    border-radius: 10px;
    text-align: center;
    overflow: auto;
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
    li {
        border-bottom: 1px solid grey;
        height: 40px;
        padding-top: 10px;
    }
`

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


export default class App extends Component {

    state = {
        showRandomData : true,
        typeSection : 'characters',
        outputDataId : null,
        error: false,
    }

    // componentDidCatch = () => {
    //     this.setState({
    //         error : true,
    //     });
    // }

    onShowRandomData = () => {
        this.setState(({showRandomData}) => {
            return {
                showRandomData : !showRandomData
            }
        })
    }

    onClickHeader = (type) => {
        this.setState({typeSection : type});
    }

    onClickItem = (id) => {
        this.setState({outputDataId : id});
    }
    

    render() {
        const {showRandomData, typeSection, outputDataId} = this.state;

        const styledObj = {
            wrapper: WraperList,
            title: Title,
            list: List,
        }

        let textRandomBlockButton = showRandomData ? 'Скрыть данные' : 'Показать данные';
        let randomData = showRandomData ? <RandomData styled={styledObj}/> : null;

        return (
            <>
                <Header onClickHeader={this.onClickHeader}/>
                <BodyApp>
                    <ContainerRandomData>
                        <FixContainerHeight>
                            {randomData}
                        </FixContainerHeight>
                        <ButtonShowRandomData onClick={this.onShowRandomData}>{textRandomBlockButton}</ButtonShowRandomData>
                    </ContainerRandomData>
                    {/* <CharactersPage styled={styledObj}/> */}
                    <ItemList typeSection={typeSection} styled={styledObj} dataId={outputDataId} onClickItem={this.onClickItem}/>
                    <OutputData styled={styledObj} dataId={outputDataId} typeSection={typeSection}/>
                </BodyApp>
            </>
        )
    }
}