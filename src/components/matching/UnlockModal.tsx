import { useRef, useEffect } from 'react';
import star from '@/assets/ProfileCard/stars.svg';
import { Button } from '@/components/ui/button';
import {  UnlockModalProps } from '@/type/ProfileCard/ProfileCard';

import useProfileCardStore from '@/store/profileCardStore';

const UnlockModal = ({ setLock, handleSetOpen, handleSetModalOpen,handleSetLockOpen, isOpen,  activeIndex }: UnlockModalProps) => {
  
  const { setAbleSpend } = useProfileCardStore();
  // 모달 열고닫기
  const unlockModalRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (unlockModalRef.current && !unlockModalRef.current.contains(event.target as Node)) {
        // setLock(prevState => !prevState)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setLock]);

  // 확인버튼 클릭시 재화 2 소모
  const openProfileCard = async () => {
    handleSetOpen(activeIndex, true)
    handleSetLockOpen(activeIndex, false)
    setAbleSpend(true)
    // setOpenModal(false);
   
  };
  // onClick={() => setLock(prevState => !prevState)}
  return (
    <>
      {!isOpen &&
        <div className={`fixed inset-0 bg-[#000] bg-opacity-30 flex justify-center items-center`} >

          <div className={`w-[250px] h-auto relative p-12 bg-white rounded-lg flex flex-col justify-start items-center z-99`} ref={unlockModalRef} onClick={e => e.stopPropagation()} data-testid="unlockModalText">

            <img src={star} alt='star' className={`w-[2rem] h-[2rem] mb-[1.5rem]`} />
            <p className={`text-[#2f2f2f] text-[0.8rem]`}>프로필 잠금을 해제할까요?</p>
            <p className={`text-[#2f2f2f] text-[0.8rem]`}>'2' 재화를 소모합니다.</p>
            <div className={`flex justify-center mt-4`}>
              <Button className={`mr-4 w-[85px]`} variant="secondary" size="sm" onClick={() => handleSetModalOpen(activeIndex, false)
              }>
                취소
              </Button>
              <Button className={`w-[85px] `} variant="default" size="sm"
                onClick={() => {
                  openProfileCard();
                }}
              >
                확인
              </Button>
            </div>
          </div>
        </div>
      }
    </>
  );
};
// eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNCIsInR5cGUiOiJhY2Nlc3NfdG9rZW4iLCJpYXQiOjE3MTk5ODYzOTAsImV4cCI6MTcyODYyNjM5MH0.EcExLId_N1DVjFJPrz50l4kj2mQHqcSZGpnv0oR3kSs 

export default UnlockModal;