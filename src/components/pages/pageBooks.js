import React, {Component} from 'react';
import { Route, withRouter } from 'react-router';

import styled from 'styled-components';
import {styledObj} from '../app';

import ItemList from '../itemList';
import DataDetails from '../dataDetails';

import GoTServices from '../../services/GoTServices';


const PageContainer = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 0.6fr;
    justify-items: center;
    align-items: start;
    height: 100%;
`

class PageBooks extends Component {

    got = new GoTServices();

    render() {
        
        const {Wrapper} = styledObj;
        const titleList = 'Книги';

        const itemList = (
            <ItemList   getData={this.got.getBooksAll}
                        onClickItem={(id) => this.props.history.push(`/books/${id}`)}
                        titleList={titleList}
            />
        )
            
        const dataDetails = (id) => {
            return <DataDetails getData={this.got.getBook} titleList={titleList} dataId={id}/>
        }

        return(
            <PageContainer> 

                <Wrapper>
                    {itemList}
                </Wrapper>

                <Wrapper>

                    <Route path="/books/:id" render={({match}) => {
                        const {id} = match.params;
                        return dataDetails(id);
                    }}/>

                    <Route path="/books/" exact render={() => {
                        return dataDetails(null);
                    }}/>
                
                </Wrapper>

            </PageContainer>
        )
    }
}

export default withRouter(PageBooks);