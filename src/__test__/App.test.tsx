import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { RecoilRoot } from 'recoil';

import App from '../App';
import randomIntFromInterval from '../helper/randomIntFromInterval';

jest.mock('../helper/randomIntFromInterval');

describe('스파이 게임에서는', () => {
  let getByCurrentText: any;
  let getByCurrentLabelText: any;
  let getByCurrentTestId: any;
  let queryByCurrentLabelText: any;
  let queryByCurrentTestId: any;
  let inputCountPlayerElement: HTMLElement;
  const FOUR_PLAYERS = 4;

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

  it('게임을 시작하면 스파이 플레이어 번호를 지정한다.', () => {
    // when
    mocked(randomIntFromInterval).mockReturnValue(2);
    fireEvent.click(getByCurrentText(/game start!/i));
    fireEvent.click(getByCurrentText(/next player/i));
    fireEvent.click(getByCurrentText('확인하기'));

    // then
    expect(getByCurrentText('당신은 스파이입니다.')).toBeInTheDocument();
  });

  it('게임을 시작하면 기본 장소를 지정한다.', () => {
    // when
    mocked(randomIntFromInterval).mockReturnValue(2);
    fireEvent.click(getByCurrentText(/game start!/i));
    fireEvent.click(getByCurrentText('확인하기'));

    // then
    expect(getByCurrentText('지정한 장소는 공항입니다')).toBeInTheDocument();
  });

  it('플레이어가 지정된 위치와 자신의 역할을 확인하고 나면 타이머를 시작한다..', () => {
    // when
    fireEvent.click(getByCurrentText(/game start!/i));
    for (let i = 0; i < 4; i += 1) {
      fireEvent.click(getByCurrentText(/next player/i));
    }

    // then
    expect(getByCurrentText('스파이를 찾아내도록 합니다.')).toBeInTheDocument();
  });

  it('스파이도 답을 맞추고 플레이어의 반 이상이 답을 맞추면 무승부가 된다.', () => {
    mocked(randomIntFromInterval).mockReturnValue(2);
    fireEvent.click(getByCurrentText(/game start!/i));
    passStageToIdentifyForCountPlayer(FOUR_PLAYERS);

    moveNextAfterFindSpy(2);
    moveNextAfterFindPlace('공항');
    moveNextAfterFindSpy(2);
    moveNextAfterFindSpy(1);
    // then
    expect(getByCurrentText('무승부')).toBeInTheDocument();
  });

  it('스파이는 답을 맞추고 플레이어의 반 이상이 답을 못 맞추면 스파이 승리가 된다.', () => {
    mocked(randomIntFromInterval).mockReturnValue(2);
    fireEvent.click(getByCurrentText(/game start!/i));
    passStageToIdentifyForCountPlayer(FOUR_PLAYERS);

    moveNextAfterFindSpy(2);
    moveNextAfterFindPlace('공항');
    moveNextAfterFindSpy(1);
    moveNextAfterFindSpy(1);

    // then
    expect(getByCurrentText('스파이 승리')).toBeInTheDocument();
  });

  it('스파이는 답을 못 맞추고 플레이어의 반 이상이 답을 맞추면 플레이어 승리가 된다.', () => {
    mocked(randomIntFromInterval).mockReturnValue(2);
    fireEvent.click(getByCurrentText(/game start!/i));
    passStageToIdentifyForCountPlayer(FOUR_PLAYERS);

    moveNextAfterFindSpy(2);
    moveNextAfterFindPlace('병원');
    moveNextAfterFindSpy(2);
    moveNextAfterFindSpy(1);
    // then
    expect(getByCurrentText('플레이어 승리')).toBeInTheDocument();
  });

  it('스파이도 답을 못 맞추고 플레이어의 반 이상이 답을 못 맞추면 무승부가 된다.', () => {
    // given
    mocked(randomIntFromInterval).mockReturnValue(2);
    fireEvent.click(getByCurrentText(/game start!/i));
    passStageToIdentifyForCountPlayer(FOUR_PLAYERS);

    // when, then
    expectDrawGame(FOUR_PLAYERS);
  });

  it('플레이어 숫자를 5명으로 추가한 뒤 무승부로 답안을 선택하면 무승부 화면이 나온다.', () => {
    // given
    mocked(randomIntFromInterval).mockReturnValue(2);

    // when
    const FIVE_PLAYERS = 5;

    const playerInput = getByCurrentTestId('player-input');
    fireEvent.change(playerInput, { target: { value: FIVE_PLAYERS } });
    fireEvent.click(getByCurrentText(/game start!/i));

    passStageToIdentifyForCountPlayer(FIVE_PLAYERS);

    // then
    expectDrawGame(FIVE_PLAYERS);
  });
});
