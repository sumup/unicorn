import React, { ReactElement } from 'react';
import { css } from '@emotion/core';
import { Card, Headline, List } from '@sumup/circuit-ui';

import styled from '../utils/styled';
import { Meta } from '../components/Meta';
import { Logo } from '../components/Logo';
import { useEmployeesQuery } from '../gql/generated';

const Main = styled('main')(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 450px;
    margin: 0 auto ${theme.spacings.mega};
  `,
);

const centeredStyles = css`
  text-align: center;
`;

function EmployeeList(): ReactElement {
  const [{ data, fetching, error }] = useEmployeesQuery();

  if (fetching) {
    return <p>loading...</p>;
  }

  if (error) {
    return <p>error: {error.message}</p>;
  }

  return (
    <List size="one">
      {data!.employees.map((e) => (
        <li>
          {e.first_name} {e.last_name}
        </li>
      ))}
    </List>
  );
}

export default function Index(): ReactElement {
  return (
    <>
      <Meta title={'Unicorn'} path="/" />
      <Main>
        <Logo />
        <Card>
          <Headline size="two" as="h1" css={centeredStyles} noMargin>
            Unicorn
          </Headline>

          <EmployeeList />
        </Card>
      </Main>
    </>
  );
}
