import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProfileCard from '@/pages/matching/index';



describe('메세지 보낼때 토스트 창이 잘 나오나 테스트 합니닷 !', () => {
  test('메세지 ', async () => {
    render(<ProfileCard />);

   // 클릭하기 전에는 Modal 텍스트가 보이지 않아야 함
   expect(screen.queryByTestId('postMessageModalText')).toBeNull();

   // img 클릭 alt text로 접근
   await userEvent.click(screen.getByAltText('lock'));

   // 잠금해제하고 더 읽기 로 접근
   await userEvent.click(screen.getByText('잠금해제하고 더 읽기'));

   // 확인 버튼 클릭
   await userEvent.click(screen.getByText('확인'));
   
   // img 클릭 alt text로 접근
   await userEvent.click(screen.getByAltText('message'));
    // 라디오 버튼 선택과 메시지 입력
    const phoneRadioButton = screen.getByLabelText('전화번호');
    userEvent.click(phoneRadioButton);
    const messageTextarea = screen.getByRole('textbox');
    userEvent.type(messageTextarea, '테스트 메시지');

    // img 클릭 alt text로 접근
    await userEvent.click(screen.getByAltText('post'));

    const toastMessage = screen.getByText(/전송이 완료되었습니다./i); // 토스트 메시지에 대한 텍스트를 기반으로 검색합니다.
    expect(toastMessage).toBeInTheDocument();
  });
});