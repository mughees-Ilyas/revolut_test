import React, { useState} from "react";
import { Heading } from "../styled/Heading";
import styled from "styled-components";
import { rem } from "polished";
import { Button } from "../styled/Button"
import { Card } from "../styled/Card"
import {connect} from "react-redux";
import AddFundModal from "../components/AddFundModal";
import ConvertFundModal from "../components/ConvertFundModal";




const Page = styled.div`
  margin: 0 auto;
  padding: ${rem(16)};
  flex: 1;
  max-width: ${rem(960)};
`;

const DisplayRow = styled.div`
  display: flex;
  justify-content:space-between
`;

function AccountPage({dispatch, data}) {
    const [pockets, setPockets] = useState({'EUR':50,'USD':80,'GBP':230});
    const [currentCurrency, setCurrentCurrency] = useState('');

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

    // handler to open open convert fund modal
    function convertBalance(currency,e) {
        e.stopPropagation();
        setCurrentCurrency(currency);
        handleShowConvert();
    }
            return (
            <div>
                <Page>
                    <Heading>Current Accounts</Heading>
                    {Object.keys(pockets) &&
                    Object.keys(pockets).map((currencies, index) => (
                        <Card key={"currency_Pocket_" + currencies} content="This is the card body!">
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