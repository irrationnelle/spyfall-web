import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

describe('메인화면에서는', () => {
  describe('설정 관련 화면으로', () => {
    let getByCurrentText: any;

    beforeEach(() => {
      const { getByText } = render(<App />);
      getByCurrentText = getByText;
    })

    it('시간 입력이 나온다.', () => {
      const linkElement = getByCurrentText('Time');
      expect(linkElement).toBeInTheDocument();
    });

    it('플레이어 숫자 입력이 나온다.', () => {
      const linkElement = getByCurrentText('Player');
      expect(linkElement).toBeInTheDocument();
    });
  });
});
