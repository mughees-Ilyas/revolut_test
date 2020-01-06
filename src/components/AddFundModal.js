import React, {useState} from "react";
import styled from "styled-components";
import { Button } from "../styled/Button"
import Modal from 'react-bootstrap/Modal'



const DisplayInput = styled.input`
    width: 96%;
    padding: 10px;
    font-size: xx-large;
    margin-left: 8px;
`;
const Error = styled.div`
  color:red
  margin-left: 8px;
`;

const DisplayForm = styled.div`
  display: flex;
  flex-direction:column;
`;
//simple table using flex.
export default function AddFundModel({show, setShow,setPockets,pockets,currentCurrency }) {
    const [balance, setBalance] = useState('');
    const [balanceError, setBalanceError] = useState('');

    //setting states for modal to add balance
    const handleClose = () => {
        setBalance('');
        setShow(false)
    };
    /*
     * sumbit handler for adding balance. add to current balance.
     * {event}: event for handler
     */
    let setNewBalance = (event) => {
        event.preventDefault();
        let DataObj = pockets;
        // indeally this should be done on the backend
        DataObj[currentCurrency]= Number(DataObj[currentCurrency]) + Number(balance);
        setPockets(DataObj);
        handleClose();
    };
    /*
     * on change handler for add balance.
     * {event} : current value of input field
     */
    let BalanceHandler = (event) => {
        let balance = event.target.value;
        setBalanceError('');
        // minimum balance of 10 can be added.
        if (balance < 10) {
            setBalanceError("minimum amount is 10");
            return;
        }
        // max balance of 5000 can be added at a time.
        if (balance > 5000) {
            event.target.value=5000;
            setBalanceError("Cannot add more than 5000 balance at this time");
            return;
        }
        // restrict field to 2 decimal points.
        let decimal = event.target.value.split(".");
        if (decimal.length > 1 && decimal[1].length > 2) {
            event.target.value = decimal[0]+"."+decimal[1][0]+decimal[1][1]
        }
        setBalance(balance);
    };

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Balance {currentCurrency}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={setNewBalance}>
                        <DisplayForm>
                            <DisplayInput
                                type='number'
                                name='balance'
                                step="0.01"
                                min="10"
                                onChange={BalanceHandler}
                                required
                            />
                            <Error>
                                {balanceError}
                            </Error>
                            <Button type='submit'>Pay</Button>
                            <Button  type="SecondaryHollow" onClick={handleClose}>Cancel</Button>
                        </DisplayForm>
                    </form>
                </Modal.Body>
            </Modal>
        </>
  );
}
