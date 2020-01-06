// export a navigation component (use react-router-dom)
import React, {useState, useEffect} from "react";
import styled from "styled-components";
import { Button } from "../styled/Button"
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import {connect} from "react-redux";
import {fxrate} from "../core/Redux/fxRates/actions/fxRate.actions";

const Scrollable = styled.div`
  height: auto;
  overflow-y: auto;
`;
const DisplayInput = styled.input`
    width: 96%;
    padding: 10px;
    font-size: xx-large;
    margin-left: 8px;
    margin-bottom:10px;
`;
const Error = styled.div`
  color:red
  margin-left: 8px;
`;
const MarginLeft = styled.div`
  margin-left: 8px;
`;
const ConverRate = styled.div`
  margin-left: 8px;
  margin-bottom:8px;
  padding-left: 130px;
`;

const DisplayForm = styled.div`
  display: flex;
  flex-direction:column;
`;
//simple table using flex.
function AddFundModel({show, setShow,setPockets,pockets,currentCurrency, dispatch,data }) {
    const [balanceError, setBalanceError] = useState('');
    const [secondPockets, setSecondPockets] = useState();
    const [firstCurrentCurrency, setFirstCurrentCurrency] = useState();
    const [secondCurrentCurrency, setSecondCurrentCurrency] = useState('');
    const [rates, setRates] = useState('');
    const [state, setState] = useState({
        currency1: '',
        currency2: ''
    });

    useEffect(() => {
       let currencies= Object.keys(pockets);
       let tempPocket=[];
        currencies.forEach(currency => {
           if (currency !==firstCurrentCurrency) {
               tempPocket.push(currency);
           }
            setSecondPockets(tempPocket);
            setSecondCurrentCurrency(tempPocket[0]);
       })
    },[currentCurrency,pockets,firstCurrentCurrency]);

    useEffect(() => {
        setFirstCurrentCurrency(currentCurrency);
    },[currentCurrency]);

    useEffect(() => {
        if (data && data.rates){
            setRates(data.rates[secondCurrentCurrency]);
        }
    },[data,secondCurrentCurrency]);

    useEffect(() => {
        if(show){
        dispatch(fxrate(firstCurrentCurrency, secondCurrentCurrency));
        }
    },[firstCurrentCurrency,secondCurrentCurrency,show,dispatch]);


    //setting states for modal to add balance
    const handleClose = () => {
        setState({
            currency1: '',
            currency2:''
        });
        setShow(false)
    };

    function updateSecondBaseCurrency(event){
        setSecondCurrentCurrency(event);
    }
    function updateBaseCurrency(event) {
        setFirstCurrentCurrency(event);
    }
    let setNewBalance = (evt) => {
        evt.preventDefault();
        if (balanceError.length){
            return;
        }
        let DataObj = pockets;
        DataObj[secondCurrentCurrency]= Number(DataObj[secondCurrentCurrency]) + Number(state.currency2);
        DataObj[firstCurrentCurrency]= Number(DataObj[firstCurrentCurrency]) - Number(state.currency1);
        setPockets(DataObj);
        setState({
            currency1: '',
            currency2:''
        });
        handleClose();
    };
    let BalanceHandler = (evt) => {
        setBalanceError('');
        if (evt.target.value > pockets[firstCurrentCurrency] ) {
            setBalanceError('entered amount is more than the current balance');
        }
        let decimal = evt.target.value.split(".");
        if (decimal.length > 1 && decimal[1].length > 2) {
            evt.target.value = decimal[0]+"."+decimal[1][0]+decimal[1][1]
        }
        const value = evt.target.value;
        let coverRate = Number(value)*Number(rates);
        setState({
            currency1: value,
            currency2: coverRate.toFixed(2)
        })
    };
    let BalanceHandlerSeconday = (evt) => {
        setBalanceError('');
        if (evt.target.value > pockets[firstCurrentCurrency] ) {
            setBalanceError('entered amount is more than the current balance');
        }
        let decimal = evt.target.value.split(".");
        if (decimal.length > 1 && decimal[1].length > 2) {
            evt.target.value = decimal[0]+"."+decimal[1][0]+decimal[1][1]
        }
        let coverRate = Number(evt.target.value);
        const value = Number(coverRate)*(1/Number(rates));

        setState({
            currency1: value.toFixed(2),
            currency2: coverRate
        })
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Convert Balance</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={setNewBalance}>
                        <DisplayForm>
                            <MarginLeft>
                            <Dropdown >
                                <Dropdown.Toggle variant="secondary">
                                    {firstCurrentCurrency}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Scrollable>
                                        {pockets &&
                                        Object.keys(pockets).map((currency, index) => {
                                            return (<Dropdown.Item eventKey ={currency} key={"dropDown"+ index} onSelect={(event) => updateBaseCurrency(event)}>{currency}</Dropdown.Item>)
                                        })}
                                    </Scrollable>
                                </Dropdown.Menu>
                            </Dropdown>
                            </MarginLeft>
                            <MarginLeft>
                            Current Balance: {pockets[firstCurrentCurrency]}
                            </MarginLeft>
                            <DisplayInput
                                type='number'
                                name='currency1'
                                step="0.01"
                                value={state.currency1}
                                onChange={BalanceHandler}
                                required
                            />
                            <ConverRate>1 {firstCurrentCurrency} = {rates}{secondCurrentCurrency}</ConverRate>
                            <MarginLeft>
                            <Dropdown >
                                <Dropdown.Toggle variant="secondary">
                                    {secondCurrentCurrency}
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Scrollable>
                                        {secondPockets &&
                                        secondPockets.map((currency, index) => {
                                                return (<Dropdown.Item eventKey ={currency} key={"dropDown"+ index} onSelect={(event) => updateSecondBaseCurrency(event)}>{currency}</Dropdown.Item>)
                                        })}
                                    </Scrollable>
                                </Dropdown.Menu>
                            </Dropdown>
                            </MarginLeft>
                            <MarginLeft>
                                Current Balance: {pockets[secondCurrentCurrency]}
                            </MarginLeft>
                            <DisplayInput
                                type='number'
                                name='currency2'
                                step="0.01"
                                value={state.currency2}
                                onChange={BalanceHandlerSeconday}
                                required
                            />
                            <Error>
                                {balanceError}
                            </Error>
                            <Button type='submit'>Convert</Button>
                            <Button  type="SecondaryHollow" onClick={handleClose}>Cancel</Button>
                        </DisplayForm>
                    </form>
                </Modal.Body>
            </Modal>
        </>
  );
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        data: state.fxRateReducer.data
    }
};

export default connect(mapStateToProps)(AddFundModel);