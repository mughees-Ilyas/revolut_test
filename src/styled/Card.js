import React, { useState } from 'react'
import styled, { css } from 'styled-components'
import { rem } from 'polished'
import { colors } from "../theme/colors";

const style = () => css`
  display: flex;
  flex: 1;
  margin: ${rem(4)};
  align-items: flex-start;
  
  .card {
    background-color: ${colors.white};
    display: flex;
    flex: 1;
    flex-direction: column;
    box-sizing: border-box;
    cursor: pointer;

    &__content {    
      padding: ${rem(16)};
    }

    &__body {
      max-height: 0;
      height: auto;
      overflow: hidden;
      transition: max-height linear 2s;
      ${props => props.expanded && css`
        max-height: 100vh;
      `}

      .card {
        &__content {
          border-top: ${rem(1)} solid ${colors.lightGray};
        }
      }
    }

    &:hover {
      background-color: ${colors.lightGraylighter};
    }
  }
`
const CardWrapper = styled.div([style]);

export function Card({children, content}) {
  const [expanded, toggle] = useState(false);

  return (
    <CardWrapper expanded={expanded}>
      <div className="card" onClick={() => {toggle(!expanded)}}>
        <div className="card__header">
          <div className="card__content">
            {children}
          </div>
        </div>
        <div className="card__body">
          <div className="card__content">
            {content}
          </div>
        </div>
      </div>
    </CardWrapper>
  )
}

