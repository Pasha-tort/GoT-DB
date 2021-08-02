import React, { useState, useEffect} from 'react';

import styled from 'styled-components';
import {styledObj} from '../app';

import Spinner from '../spinner';

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

const SpinnerStyled = styled.div`
    width: 300px;
`

function ItemList({getData, onClickItem, titleList, itemsAmount}) {

    const [itemList, updateItemList] = useState(null);
    const [activeItem, setActiveItem] = useState([]);
    const [page, setPage] = useState(1);
    const [filterPage, setFilterPage] = useState(50);
    const [loading, updateLoading] = useState(false);

    useEffect(() => {
        console.log('update');
        updateLoading(true);
        getData(page, filterPage)
            .then(data => {
                updateItemList(data);
                updateLoading(false);
            });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, filterPage]);

    function renderItem(list) {
        const regexp = /\d/g;
        return list.map(item => {

            const id = item.url.match(regexp).join('');
            let styled = null;

            if (activeItem === id) {
                styled = '#fff';
            }

            return (
                <ListItem 
                    key={id} 
                    styled={styled}
                    onClick={() => {
                        onClickItem(id);
                        setActiveItem(id);
                    }}>
                        {item.name}
                </ListItem>
            )
        })
    }

    function renderItemPage (num) {
        const numPage = Math.ceil(num/filterPage);
        const arr = [null];

        for (let i = 1; i <= numPage; i++) {
            arr.push(i);
        }

        arr.shift();
        return arr.map((item, i) => {
            let styled = null;
            if (i+1 === page) {
                styled = 'blue';
            }
            return (
                <ItemListPage key={item} value={item} styled={styled} onClick={onClickItemPage}>{item}</ItemListPage>
            )
        });
    }

    function renderFilterItem() {
        const arr = [25, 50];

        return arr.map(item => {
            let styled = null;
            if (item === filterPage) {
                styled = 'blue';
            }
            return (
               <FilterPageItem key={item} value={item} styled={styled} onClick={onClickFilterItem}>{item}</FilterPageItem> 
            )
        });
    }

    function onClickItemPage(e) {
        setPage(e.target.value);
    }
    
    function onClickFilterItem(e) {
        setFilterPage(e.target.value);
        setPage(1);
    }

    
    const {Title, List} = styledObj;
    
    let items;
    if (itemList) {
        items = renderItem(itemList);
    }

    const spinner = loading ? <Spinner as={SpinnerStyled}/> : null;

    const content = loading ? null :<>
                                        <Title>{titleList}</Title>
                                        <ContainerScroolBar>
                                            <List>
                                                {items}
                                            </List>
                                        </ContainerScroolBar>            
                                    </>;

    if (titleList === "Книги") {
        return (
            <>  
                {spinner}
                {content}
            </>
        );
    }

    let itemsPage = renderItemPage(itemsAmount);
    let itemFilterPage = renderFilterItem();

    return (
        <>
            {content}
            {spinner}
            <ListPage>
                {itemsPage}
            </ListPage>   
            <FilterPageSize>
                <div>Фильтр:</div>
                {itemFilterPage}
            </FilterPageSize>
        </> 
    )
}

export default ItemList;



