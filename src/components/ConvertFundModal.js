import React, {useState, useEffect, useRef} from "react";
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
    // error for the Modal.
    const [balanceError, setBalanceError] = useState('');
    // second pocket for conversion.
    const [secondPockets, setSecondPockets] = useState();
    // first currency from which balance is to be taken
    const [firstCurrentCurrency, setFirstCurrentCurrency] = useState();
    // second currency to which balance is to be added.
    const [secondCurrentCurrency, setSecondCurrentCurrency] = useState('');
    // current rate between first and second currency
    const [rates, setRates] = useState('');
    // state of input fileds of currencies
    const [state, setState] = useState({
        currency1: '',
        currency2: ''
    });

    // reference for counter.
    const intervalRef = useRef(0);

    // on modal open create a second pocket without the value of first currency selected.
    // also set the second currency to first element of that pocket
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

    // on modal open set the first currency from which the action was generated
    useEffect(() => {
        setFirstCurrentCurrency(currentCurrency);
    },[currentCurrency]);

    // when both currencies are set. get the exchange rate between them
    useEffect(() => {
        function getCurrentTimer(){
            dispatch(fxrate(firstCurrentCurrency, secondCurrentCurrency));
        }
        if(show){
            intervalRef.current = setInterval(getCurrentTimer, 10000);
            getCurrentTimer();
        }

        // destroy interval on component destroy
        return () => {
            clearInterval(intervalRef.current);
        };
    },[firstCurrentCurrency,secondCurrentCurrency,show,dispatch]);

    // when you receive the rate set the rate to be used.
    useEffect(() => {
        if (data && data.rates){
            setRates(data.rates[secondCurrentCurrency]);
        }
    },[data,secondCurrentCurrency]);




    //setting states for modal when close is pressed
    const handleClose = () => {
        setState({
            currency1: '',
            currency2:''
        });
        setShow(false)
    };

    /*
     * update first currency if user change it from dropDown
     * {event} : value of the selected item from dropdown
     */
    function updateBaseCurrency(event) {
        clearInterval(intervalRef.current);
        setFirstCurrentCurrency(event);
    }
    /*
     * update second currency if user change it from dropDown
     * {event} : value of the selected item from dropdown
     */
    function updateSecondBaseCurrency(event) {
        clearInterval(intervalRef.current);
        setSecondCurrentCurrency(event);
    }

    /*
     * on change input handler for first currency. validate and conversion to secondary currency
     * {evt}: value of the input field.
     */
    let BalanceHandler = (evt) => {
        setBalanceError('');
        // let the user know he does not have balance to convert.
        if (evt.target.value > pockets[firstCurrentCurrency] ) {
            setBalanceError('Entered amount is more than your current balance');
        }
        let decimal = evt.target.value.split(".");
        if (decimal.length > 1 && decimal[1].length > 2) {
            evt.target.value = decimal[0]+"."+decimal[1][0]+decimal[1][1]
        }
        // set converted values to input boxes
        const value = evt.target.value;
        let coverRate = Number(value)*Number(rates);
        setState({
            currency1: value,
            currency2: coverRate.toFixed(2)
        })
    };

    /*
     * on change input handler for second currency. validate and conversion to secondary currency
     * {evt}: value of the input field.
     */
    let BalanceHandlerSecondary = (evt) => {
        setBalanceError('');

        let decimal = evt.target.value.split(".");
        if (decimal.length > 1 && decimal[1].length > 2) {
            evt.target.value = decimal[0]+"."+decimal[1][0]+decimal[1][1]
        }
        let coverRate = evt.target.value;
        const value = Number(coverRate)*(1/Number(rates));
        // let the user know that desired amount in second currency gets converted to the amount user does not hold in first currency.
        if (value > pockets[firstCurrentCurrency] ) {
            setBalanceError('Entered amount is more than your current balance');
        }
        setState({
            currency1: value.toFixed(2),
            currency2: coverRate
        })
    };

    /*
     * submit handler for the form
     * {evt} : event for the handler.
     */
    let setNewBalance = (evt) => {
        evt.preventDefault();
        if (balanceError.length){
            return;
        }
        let DataObj = pockets;
        // on submit add to secondary currency and seprate from first currency
        // Ideally we should have backend call here and should not be doing it here on the frontend.
        DataObj[secondCurrentCurrency]= Number(DataObj[secondCurrentCurrency]) + Number(state.currency2);
        DataObj[secondCurrentCurrency] = DataObj[secondCurrentCurrency].toFixed(2);
        DataObj[firstCurrentCurrency] = Number(DataObj[firstCurrentCurrency]) - Number(state.currency1);
        DataObj[firstCurrentCurrency] =  DataObj[firstCurrentCurrency].toFixed(2);
        setPockets(DataObj);
        setState({
            currency1: '',
            currency2:''
        });
        handleClose();
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
                                onChange={BalanceHandlerSecondary}
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