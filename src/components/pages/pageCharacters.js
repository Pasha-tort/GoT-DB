import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';

import styled from 'styled-components';
import {styledObj} from '../app';

import ItemList from '../itemList';
import DataDetails from '../dataDetails';

import GoTServices from '../../services/GoTServices';


const PageContainer = styled.div`
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 0.6fr;
    border-radius: 10px;
    justify-items: center;
    align-items: start;
    height: 100%;
`


class PageCharacters extends Component {

    got = new GoTServices();

    render() {

        const {Wrapper} = styledObj;
        const itemsAmount = 2134,
              titleList = 'Персонажи';

        const itemList = (
            <ItemList   getData={this.got.getCharactersAll}
                        onClickItem={(id) => this.props.history.push(`/characters/${id}`)}
                        itemsAmount={itemsAmount}
                        titleList={titleList}
            />
        )

        const dataDetails = (id) => {
            return <DataDetails getData={this.got.getCharacter} titleList={titleList} dataId={id}/>
        }

        return(
            <PageContainer> 

                <Wrapper height='calc(100vh - 180px)'>
                    {itemList}
                </Wrapper>

                <Wrapper>

                    <Route path="/characters/:id" render={({match}) => {
                        const {id} = match.params;
                        return dataDetails(id);
                    }}/>

                    <Route path="/characters/" exact render={() => {
                        return dataDetails(null);
                    }}/>

                </Wrapper>

            </PageContainer>
        )
    }
}

export default withRouter(PageCharacters);