import React, {Component} from 'react';

import styled from 'styled-components';

const Title = styled.div``
const List = styled.ul``

class Data extends Component {

    
    render() {
        const {data, title, textTitle, list} = this.props;
        const {name} = data;
            return (
                <>
                    <Title as={title}>{textTitle}{name}</Title>
                    <List as={list}>
                        {React.Children.map(this.props.children, (child) => {
                            return React.cloneElement(child, {data});
                        })}
                    </List>
                </>
            )    
    }
    
}

const FieldData = ({data, label, field}) => {
    return (<li>{label} {data[field]}</li>)
}

export {Data, FieldData};