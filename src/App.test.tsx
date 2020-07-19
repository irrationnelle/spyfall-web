import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

describe('메인화면에서는', () => {
  describe('설정 관련 화면으로', () => {
    let getByCurrentText: any;
    let getByCurrentLabelText: any;
    let queryByCurrentLabelText: any;
    let inputCountPlayerElement: HTMLElement;

    beforeEach(() => {
      const { getByText, getByLabelText, queryByLabelText } = render(<App />);
      getByCurrentText = getByText;
      getByCurrentLabelText = getByLabelText;
      queryByCurrentLabelText = queryByLabelText;
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
  });
});
