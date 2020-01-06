import React, { useState, useEffect} from "react";
import { Heading } from "../styled/Heading";
import styled from "styled-components";
import { rem } from "polished";
import { Button } from "../styled/Button"
import { Card } from "../styled/Card"
import {connect} from "react-redux";
import AddFundModal from "../components/AddFundModal";
import ConvertFundModal from "../components/ConvertFundModal";
import Dropdown from 'react-bootstrap/Dropdown'
import {fxrate} from "../core/Redux/fxRates/actions/fxRate.actions";

const Page = styled.div`
  margin: 0 auto;
  padding: ${rem(16)};
  flex: 1;
  max-width: ${rem(960)};
`;
const Scrollable = styled.div`
  height: 16rem;
  overflow-y: scroll;
`;

const DisplayRow = styled.div`
  display: flex;
  justify-content:space-between
   align-items: center;
`;

function AccountPage({dispatch, data}) {
    const [pockets, setPockets] = useState({'EUR':50,'USD':80,'GBP':230});
    const [allCurrencies, setAllCurrencies] = useState([]);
    const [currentCurrency, setCurrentCurrency] = useState('');

    useEffect(() => {
        function getCurrentTimer(){
            dispatch(fxrate("EUR"));
        }
        getCurrentTimer();

    },[dispatch]);


    useEffect(() => {
        if (data && data.rates) {
            let allCountries =[];
            Object.keys(data.rates).forEach(country => {
                if (!pockets[country]){
                    allCountries.push(country);
                }
            });
            setAllCurrencies(allCountries);
        }
    },[data,pockets]);

    //setting states for modal to add balance
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);

    //setting states for modal to convert balance
    const [showConvert, setShowConvert] = useState(false);
    const handleShowConvert = () => setShowConvert(true);

    // handler to open Add funds modal
    function addBalance(currency,e) {
        e.stopPropagation();
        setCurrentCurrency(currency);
        handleShow();
    }

    /*
     * handler to open open convert fund modal
     */
    function convertBalance(currency,e) {
        e.stopPropagation();
        setCurrentCurrency(currency);
        handleShowConvert();
    }
    /*
     * add new currency pocket with intial balance 0
     */
    function AddPocket(event) {
        let data = pockets;
        if (!data[event]) {
            data[event]=0;
            setPockets(JSON.parse(JSON.stringify(data)));
        }
    }
            return (
            <div>
                <Page>
                    <Heading>Current Accounts</Heading>
                    <Dropdown >
                        <Dropdown.Toggle variant="secondary">
                           New currency Account
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Scrollable>
                                {allCurrencies &&
                                allCurrencies.map((row, index) => (
                                    <Dropdown.Item eventKey ={row} key={"dropDown"+ index} onSelect={(event) => AddPocket(event)}>{row}</Dropdown.Item>
                                ))}
                            </Scrollable>
                        </Dropdown.Menu>
                    </Dropdown>
                    {Object.keys(pockets) &&
                    Object.keys(pockets).map((currencies, index) => (
                        <Card key={"currency_Pocket_" + currencies}
                              content="IBAN number = AHS23424236073466"
                        >
                            <DisplayRow>
                                <div>{currencies}</div>
                                <div>
                                    <Button onClick={(e) => addBalance(currencies, e)}>Add money</Button>
                                    <Button onClick={(e) => convertBalance(currencies, e)}>Exchange</Button>
                                </div>
                            </DisplayRow>
                            Balance: {pockets[currencies]}
                        </Card>
                    ))}

                    <AddFundModal
                        currentCurrency={currentCurrency}
                        setShow={setShow}
                        show={show}
                        pockets={pockets}
                        setPockets={setPockets}
                    />
                    <ConvertFundModal
                        currentCurrency={currentCurrency}
                        setShow={setShowConvert}
                        show={showConvert}
                        pockets={pockets}
                        setPockets={setPockets}
                    />
                </Page>
            </div>
        );
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        data: state.fxRateReducer.data
    }
};

export default connect(mapStateToProps)(AccountPage);