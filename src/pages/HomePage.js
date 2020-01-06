import React, { useState, useEffect, useRef} from "react";
import { Heading } from "../styled/Heading";
import {fxrate} from "../core/Redux/fxRates/actions/fxRate.actions";
import { connect } from 'react-redux'
import DataTable from "../components/DataTable";
import styled from "styled-components";
import Dropdown from 'react-bootstrap/Dropdown'
import {rem} from "polished";


const Page = styled.div`
  margin: 0 auto;
  padding: ${rem(16)};
  flex: 1;
  max-width: ${rem(960)};
`;
const Scrollable = styled.div`
  height: 32rem;
  overflow-y: scroll;
`;
function HomePage({dispatch, data}) {
    const [rows, setRows] = useState([]);
    const [base, setBase] = useState('EUR');
    const intervalRef = useRef(0);

    useEffect(() => {
        function getCurrentTimer(){
            dispatch(fxrate(base));
        }
        // set timer to get latest fx Rate after every 10 second
        intervalRef.current = setInterval(getCurrentTimer, 10000);
        // get the current rate on first page load
        getCurrentTimer();
        // destroy interval on component destroy
        return () => {
            clearInterval(intervalRef.current);
        };
    },[dispatch, base]);

    useEffect(() => {
        if(data) {
            let rowObj;
            let rates = data.rates;
            const objData = Object.keys(rates);
            rowObj= objData.map(x=> {
                return {'country':x,'rate':rates[x].toFixed(3)};
            });
            setRows(rowObj);
        }
    },[data]);

    function updateBaseCurrency(event) {
        setBase(event);
        clearInterval(intervalRef.current);
    }

  return (
    <div>
        <Page>
            <Heading>Base Currency: {base} </Heading>
            <Dropdown >
                <Dropdown.Toggle variant="secondary">
                    Chose Base Currency
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Scrollable>
                    {rows &&
                    rows.map((row, index) => (
                        <Dropdown.Item eventKey ={row.country} key={"dropDown"+ index} onSelect={(event) => updateBaseCurrency(event)}>{row.country}</Dropdown.Item>
                    ))}
                    </Scrollable>
                </Dropdown.Menu>
            </Dropdown>

            <DataTable title="Current FX rate"
                       columns={
                           [
                               { label: 'Country',  prop: 'country',template: (item) =>{return <div>{item.country}</div>}},
                               { label: 'Rate',  prop: 'rate' }
                               ]
                       }
                       rows={rows}
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

export default connect(mapStateToProps)(HomePage);
