import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { RecoilRoot } from 'recoil';

import App from '../App';
import randomIntFromInterval from '../helper/randomIntFromInterval';

jest.mock('../helper/randomIntFromInterval');

describe('정답 맞추기 화면에서는', () => {
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

  it('플레이어들이 확인을 마친 후 skip 버튼을 누르면 답을 말하는 화면이 나타난다.', async () => {
    fireEvent.click(getByCurrentText(/game start!/i));
    passStageToIdentifyForCountPlayer(FOUR_PLAYERS);

    // then
    expect(getByCurrentText('스파이를 찾아주세요')).toBeInTheDocument();
  });

  it('답을 말하는 화면에서 플레이어는 스파이를 선택할 수 있다.', async () => {
    mocked(randomIntFromInterval).mockReturnValue(2);
    fireEvent.click(getByCurrentText(/game start!/i));
    passStageToIdentifyForCountPlayer(FOUR_PLAYERS);

    moveNextAfterFindSpy(2);

    // then
    expect(getByCurrentText('지정된 장소를 맞춰주세요')).toBeInTheDocument();
  });

  it('답을 말하는 화면에서 스파이는 장소를 선택할 수 있다.', () => {
    mocked(randomIntFromInterval).mockReturnValue(2);
    fireEvent.click(getByCurrentText(/game start!/i));
    passStageToIdentifyForCountPlayer(FOUR_PLAYERS);

    moveNextAfterFindSpy(2);
    moveNextAfterFindPlace('공항');

    // then
    expect(getByCurrentText('스파이를 찾아주세요')).toBeInTheDocument();
  });
});
