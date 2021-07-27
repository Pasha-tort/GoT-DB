import React, {Component} from 'react';

import styled from 'styled-components';

import Spinner from '../spinner';
import GoTServices from '../../services/GoTServices';
import ErrorMessage from '../errorMessage';

const Title = styled.div``
const Wrapper = styled.div``
const List = styled.ul``

const ContainerScroolBar = styled.div`
    overflow: auto;
    &::-webkit-scrollbar {
        width: 10px;
        border-left: 1px solid grey;
    }
    &::-webkit-scrollbar-track {
        background: rgba(256, 256, 256, 0);
    }
    &::-webkit-scrollbar-thumb {
        background: grey;
        &:hover {
            background: #38363B;
        }
    }
`

const ListItem = styled.li`
    cursor: pointer;
    transition: 0.1s all;
    background: ${props => props.styled || null};
    &:hover {
        background: #fff;
        transition: 0.1s all;
    }
`

const ListPage = styled.ul`
    list-style-type: none;
    display: grid;
    grid-template-columns: repeat(15, 1fr);
    grid-auto-columns: repeat(15, 1fr);
    background: rgba(256, 256, 256, 0.6);
`

const ItemListPage = styled.li`
    cursor: pointer;
    transition: 0.1s all;
    margin: auto;
    &:hover {
        text-decoration: underline;
        transition: 0.1s all;
    }
    color: ${props => props.styled || null};
`

const FilterPageSize = styled.div`
    border-top: 1px solid grey;
    background: rgba(256, 256, 256, 0.6);
    list-style-type: none;
`

const FilterPageItem = styled.li`
    display: inline;
    cursor: pointer;
    padding: 0 10px 0 10px;
    transition: 0.1s all;
    &:hover {
        text-decoration: underline;
        transition: 0.1s all ;
    }
    color: ${props => props.styled || null};
`

export default class ItemList extends Component {
    
    got = new GoTServices();

    state = {
        dataList: null,
        page : 1,
        filterPage : 50,
        loading: false,
        error: false,
    }

    componentDidMount() {
        this.updateData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.typeSection !== prevProps.typeSection) {
            this.updateData();
        }
        if (this.state.page !== prevState.page || this.state.filterPage !== prevState.filterPage) {
            this.updateData();
        }
    }

    updateData = () => {
        const {typeSection} = this.props;
        const {page, filterPage} = this.state;

        this.setState({dataList : null})
        this.setState({loading : true});

        let getData = null;

        switch (typeSection) {
            case 'characters':
                getData = this.got.getCharactersAll(page, filterPage);
                break;
            case 'books':
                getData = this.got.getBooksAll();
                break;
            case 'houses':
                getData = this.got.getHousesAll(page, filterPage);
                break;
            default:
                getData = null;
        }

        if (getData) {
            getData
                .then(dataList => this.setState({dataList, loading : false}))
                .catch(this.onError); 
        }
    }
   
   
    onClickItemPage = (e) => {
        this.setState({page: e.target.value});
    }

    onClickFilterItem = (e) => {
        this.setState({filterPage: e.target.value});
    }

    renderItem = (list) => {
        const regexp = /\d/g;
        return list.map(item => {
            const id = item.url.match(regexp).join('');
            let styled = null;
            if (this.props.dataId === id) {
                styled = '#fff';
            }
            return (
                <ListItem key={id} styled={styled} onClick={() => this.props.onClickItem(id)}>{item.name}</ListItem>
            )
        })
    }

    renderItemPage = (num) => {
        const numPage = Math.ceil(num/this.state.filterPage);
        const arr = [null];
        for (let i = 1; i <= numPage; i++) {
            arr.push(i);
        }
        arr.shift();
        return arr.map((item, i) => {
            let styled = null;
            if (i+1 === this.state.page) {
                styled = 'blue';
            }
            return (
                <ItemListPage key={item} value={item} styled={styled} onClick={this.onClickItemPage}>{item}</ItemListPage>
            )
        });
    }

    renderFilterItem = () => {
        const arr = [25, 50];
        return arr.map(item => {
            let styled = null;
            if (item === this.state.filterPage) {
                styled = 'blue';
            }
            return (
               <FilterPageItem key={item} value={item} styled={styled} onClick={this.onClickFilterItem}>{item}</FilterPageItem> 
            )
        });
    }

    render() {
        
        const {styled : {wrapper, title, list}, typeSection} = this.props;
        const {dataList, loading, error} = this.state;
        
        let items = null;
        let titleList = null;
        let itemsPage = null;
        let itemFilterPage = this.renderFilterItem();

        const errorMessage = error ? <ErrorMessage/> : null;   
        const spinner = loading ? <Spinner/> : null;

        if (dataList) {
            items = this.renderItem(dataList);
        }
        if (typeSection === 'characters' && !loading && dataList) {
            itemsPage = this.renderItemPage(2134);
            titleList = "Персонажи";
        } else if (typeSection === 'books' && !loading && dataList) {
            titleList = "Книги";
        } else if (typeSection === 'houses' && !loading && dataList) {
            titleList = "Дома";
            itemsPage = this.renderItemPage(445);
        } 
    
        const content = <>
                            <Title as={title}>{titleList}</Title>
                            <ContainerScroolBar>
                                <List as={list}>
                                    {items}
                                </List>
                            </ContainerScroolBar>
                            <ListPage>
                                {itemsPage}
                            </ListPage>           
        </>

        if (titleList === "Книги") {
            return (
                    <Wrapper as={wrapper}>
                        {errorMessage}
                        {spinner}
                        {content}
                    </Wrapper>
            )
        }

        return (
            <Wrapper height={'100%'} as={wrapper}>  
                {errorMessage}
                {spinner}
                {content}
                <FilterPageSize>
                    <div>Фильтр:</div>
                    {itemFilterPage}
                </FilterPageSize>
            </Wrapper>
        )
    }      
}