import styled from "styled-components";

import img from './error.jpg';

const ErrorContainer = styled.div`
    /* position: absolute; */
    display: flex;
    flex-direction: column;
    align-items: center;
    width: ${(props) => props.width || '100%'};
    /* top: 50%;
    left: 50%; */
    /* transform: translateX(-50%) translateY(-50%); */
    background: rgba(256, 256, 256, 0.6);
    border-radius: 10px;
    text-align: center;
`

const ErrorStyled = styled.span`
    font-size: 18px;
    padding-top: 20px;
`
const ErrorImg = styled.img`
    width: 80%;
    margin: 0 auto;
    padding-top: 10px;
`

const ErrorButton = styled.button`
    width: 160px;
    height: 50px;
    margin-top: 10px;
    margin-bottom: 10px;
    cursor: pointer;
    background: #fff;
    border: none;
    color: rgb(52, 52, 189);
    border-radius: 5px;
    font-size: 18px;
    transition: 0.2s all;
    &:hover {
        color: #fff;
        background: rgb(52, 52, 189);
        transition: 0.2s all;
    }
`

const ErrorMessage = ({width, onClickError}) => {
    return(
        <>
            <ErrorContainer width={width}>
                <ErrorImg src={img}/>
                <ErrorStyled>Что-то пошло не так :-(</ErrorStyled>
                <ErrorButton onClick={() => onClickError()}>Перезапустить</ErrorButton>
            </ErrorContainer>  
            
        </>
    )
}
export default ErrorMessage;