import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import App from '../App';

describe('설정 관련 화면(InitialSetting)에서는', () => {
  const {
    getByText, getByLabelText, queryByLabelText, queryByTestId,
  } = screen;

  let inputCountPlayerElement: HTMLElement;

  beforeEach(() => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>,
    );
    inputCountPlayerElement = getByLabelText('Player');
  });

  it('시간 입력이 나온다.', () => {
    const linkElement = getByText('Time');
    expect(linkElement).toBeInTheDocument();
  });

  it('플레이어 숫자 입력이 나온다.', () => {
    const linkElement = getByText('Player');
    expect(linkElement).toBeInTheDocument();
  });

  it('플레이어 숫자가 2명 이하이면 에러 메시지가 나온다.', () => {
    // when
    fireEvent.change(inputCountPlayerElement, { target: { value: 2 } });

    // then
    const errInputCountPlayerElement = queryByLabelText('Player');
    expect(errInputCountPlayerElement).not.toBeInTheDocument();
    const currentInputCountPlayerElement = getByLabelText('Error');
    expect(currentInputCountPlayerElement).toBeInTheDocument();
  });

  it('플레이어 숫자가 9명 이상이면 에러 메시지가 나온다.', () => {
    // when
    fireEvent.change(inputCountPlayerElement, { target: { value: 9 } });

    // then
    const errInputCountPlayerElement = queryByLabelText('Player');
    expect(errInputCountPlayerElement).not.toBeInTheDocument();
    const currentInputCountPlayerElement = getByLabelText('Error');
    expect(currentInputCountPlayerElement).toBeInTheDocument();
  });

  it('게임을 시작하면 설정 화면에서 벗어난다.', () => {
    // given
    const gameSettingBox = queryByTestId('game-setting-box');
    expect(gameSettingBox).toBeInTheDocument();

    // when
    fireEvent.click(getByText(/game start!/i));

    // then
    expect(gameSettingBox).not.toBeInTheDocument();
  });
});
