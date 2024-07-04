import styled from 'styled-components'

export const TaskName = styled.p`
    color:rgb(0, 0, 0);
    font-size:20px;
    font-weight:500;
    font-family:"Roboto";
    margin-top:0px;
    margin-bottom:0px;
    text-decoration:${(props) => (props.isChecked ? 'line-through' : 'none')}
`