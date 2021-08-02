import React, {Component} from 'react';

import {styledObj} from '../app';

export default class Data extends Component {

    render() {
        const {data, textTitle} = this.props;
        const {List, Title} = styledObj;

        const {name} = data;

        return (
            <>
                <Title>{textTitle}{name}</Title>
                <List>
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
