import React from 'react';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { mocked } from 'ts-jest/utils';

import App from './App';
import randomIntFromInterval from './helper';

jest.mock('./helper');

describe('메인화면에서는', () => {
  describe('설정 관련 화면으로', () => {
    let getByCurrentText: any;
    let getByCurrentLabelText: any;
    let getByCurrentTestId: any;
    let queryByCurrentLabelText: any;
    let queryByCurrentTestId: any;
    let inputCountPlayerElement: HTMLElement;

    beforeEach(() => {
      const {
        getByText, getByLabelText, getByTestId, queryByLabelText, queryByTestId,
      } = render(<App />);
      getByCurrentText = getByText;
      getByCurrentLabelText = getByLabelText;
      getByCurrentTestId = getByTestId;
      queryByCurrentLabelText = queryByLabelText;
      queryByCurrentTestId = queryByTestId;
      inputCountPlayerElement = getByLabelText('Player');
    });

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

    it('플레이어들이 확인을 마친 후 skip 버튼을 누르면 답을 말하는 화면이 나타난다.', async () => {
      fireEvent.click(getByCurrentText(/game start!/i));
      for (let i = 0; i < 4; i += 1) {
        fireEvent.click(getByCurrentText(/next player/i));
      }
      await waitForElement(() => {
        fireEvent.click(getByCurrentText(/skip/i));
      }, { timeout: 5000 });

      // then
      expect(getByCurrentText('스파이를 찾아주세요')).toBeInTheDocument();
    });
  });
});
