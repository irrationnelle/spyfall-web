import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';
import { RecoilRoot } from 'recoil';

import App from '../App';
import randomIntFromInterval from '../helper/randomIntFromInterval';

jest.mock('../helper/randomIntFromInterval');

describe('정답 맞추기 화면에서는', () => {
  const { getByText, getByLabelText } = screen;
  const FOUR_PLAYERS = 4;

  beforeEach(() => {
    render(
      <RecoilRoot>
        <App />
      </RecoilRoot>,
    );
  });

  const passStageToIdentifyForCountPlayer = (countPlayer: number) => {
    for (let i = 0; i < countPlayer; i += 1) {
      fireEvent.click(getByText(/next player/i));
    }
    fireEvent.click(getByText(/skip/i));
  };

  const moveNextAfterFindSpy = (playerNum: number) => {
    fireEvent.click(getByLabelText(`Player ${playerNum}`));
    fireEvent.click(getByText(/next player/i));
  };

  const moveNextAfterFindPlace = (placeName: string) => {
    fireEvent.click(getByLabelText(placeName));
    fireEvent.click(getByText(/next player/i));
  };

  it('플레이어들이 확인을 마친 후 skip 버튼을 누르면 답을 말하는 화면이 나타난다.', async () => {
    fireEvent.click(getByText(/game start!/i));
    passStageToIdentifyForCountPlayer(FOUR_PLAYERS);

    // then
    expect(getByText('스파이를 찾아주세요')).toBeInTheDocument();
  });

  it('답을 말하는 화면에서 플레이어는 스파이를 선택할 수 있다.', async () => {
    mocked(randomIntFromInterval).mockReturnValue(2);
    fireEvent.click(getByText(/game start!/i));
    passStageToIdentifyForCountPlayer(FOUR_PLAYERS);

    moveNextAfterFindSpy(2);

    // then
    expect(getByText('지정된 장소를 맞춰주세요')).toBeInTheDocument();
  });

  it('답을 말하는 화면에서 스파이는 장소를 선택할 수 있다.', () => {
    mocked(randomIntFromInterval).mockReturnValue(2);
    fireEvent.click(getByText(/game start!/i));
    passStageToIdentifyForCountPlayer(FOUR_PLAYERS);

    moveNextAfterFindSpy(2);
    moveNextAfterFindPlace('공항');

    // then
    expect(getByText('스파이를 찾아주세요')).toBeInTheDocument();
  });
});
