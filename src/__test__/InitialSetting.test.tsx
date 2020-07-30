import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { RecoilRoot } from 'recoil';

import App from '../App';

jest.mock('../helper');

describe('설정 관련 화면(InitialSetting)에서는', () => {
  let getByCurrentText: any;
  let getByCurrentLabelText: any;
  let getByCurrentTestId: any;
  let queryByCurrentLabelText: any;
  let queryByCurrentTestId: any;
  let inputCountPlayerElement: HTMLElement;

  beforeEach(() => {
    const {
      getByText, getByLabelText, getByTestId, queryByLabelText, queryByTestId,
    } = render(
      <RecoilRoot>
        <App />
      </RecoilRoot>,
    );
    getByCurrentText = getByText;
    getByCurrentLabelText = getByLabelText;
    getByCurrentTestId = getByTestId;
    queryByCurrentLabelText = queryByLabelText;
    queryByCurrentTestId = queryByTestId;
    inputCountPlayerElement = getByLabelText('Player');
  });

  const passStageToIdentifyForCountPlayer = (countPlayer: number) => {
    for (let i = 0; i < countPlayer; i += 1) {
      fireEvent.click(getByCurrentText(/next player/i));
    }
    fireEvent.click(getByCurrentText(/skip/i));
  };

  const moveNextAfterFindSpy = (playerNum: number) => {
    fireEvent.click(getByCurrentLabelText(`Player ${playerNum}`));
    fireEvent.click(getByCurrentText(/next player/i));
  };

  const moveNextAfterFindPlace = (placeName: string) => {
    fireEvent.click(getByCurrentLabelText(placeName));
    fireEvent.click(getByCurrentText(/next player/i));
  };

  const expectDrawGame = (countPlayer: number) => {
    moveNextAfterFindSpy(2);
    moveNextAfterFindPlace('병원');

    for (let i = 0; i < countPlayer - 2; i += 1) {
      moveNextAfterFindSpy(1);
    }

    expect(getByCurrentText('무승부')).toBeInTheDocument();
  };

  it('시간 입력이 나온다.', () => {
    const linkElement = getByCurrentText('Time');
    expect(linkElement).toBeInTheDocument();
  });

  it('플레이어 숫자 입력이 나온다.', () => {
    const linkElement = getByCurrentText('Player');
    expect(linkElement).toBeInTheDocument();
  });

  it('플레이어 숫자가 2명 이하이면 에러 메시지가 나온다.', () => {
    // when
    fireEvent.change(inputCountPlayerElement, { target: { value: 2 } });

    // then
    const errInputCountPlayerElement = queryByCurrentLabelText('Player');
    expect(errInputCountPlayerElement).not.toBeInTheDocument();
    const currentInputCountPlayerElement = getByCurrentLabelText('Error');
    expect(currentInputCountPlayerElement).toBeInTheDocument();
  });

  it('플레이어 숫자가 9명 이상이면 에러 메시지가 나온다.', () => {
    // when
    fireEvent.change(inputCountPlayerElement, { target: { value: 9 } });

    // then
    const errInputCountPlayerElement = queryByCurrentLabelText('Player');
    expect(errInputCountPlayerElement).not.toBeInTheDocument();
    const currentInputCountPlayerElement = getByCurrentLabelText('Error');
    expect(currentInputCountPlayerElement).toBeInTheDocument();
  });

  it('게임을 시작하면 설정 화면에서 벗어난다.', () => {
    // given
    const gameSettingBox = queryByCurrentTestId('game-setting-box');
    expect(gameSettingBox).toBeInTheDocument();

    // when
    fireEvent.click(getByCurrentText(/game start!/i));

    // then
    expect(gameSettingBox).not.toBeInTheDocument();
  });
});
