import { ItemProps } from "@/type/MatchingList/MatchingList";

import { useState } from "react";
import MusicCard from "../common/MusicCard";
import Tag from "../common/Tag";
import Name from "../common/Name";


const SendedItem = ({ name, birthDate, mbti, tags, lifeMusic, type }: ItemProps) => {
  const [, setIsClicked] = useState<boolean>(false);

  const handleClick = () => {
    if (type === 'message') {
      setIsClicked(prevState => !prevState);
    }
  };

  return (
    <>
      <div className="relative h-auto mx-[2%] mb-[8px] pt-[12px] pb-[8px]"
        onClick={handleClick}
      >
        <div className="flex justify-between px-[3%] text-s">
          <div className="flex items-center">
          <Name name={name} birthDate={birthDate} mbti={mbti} isDark={true} />
          <div className='flex flex-wrap mb-[5px]'>
              {tags?.map((item) => (
                <Tag name={item.name} state={item.state} isDark={true} />
              ))}
            </div>      
          </div>
          {/* <div><Time time={time} /></div> */}
        </div>

        <MusicCard title={lifeMusic?.title} artist={lifeMusic?.artist} />
        {/* 메시지 팝업 클릭했을때 */}


        {/* 하단 테두리 */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[calc(100%-4%)] h-[1px] bg-[#191919]" />

      </div>
      {/* {isClicked && <ClickedMessagePopUp
        handleClick={handleClick}
        name={name} age={age} mbti={mbti} tag={tag} time={time} isDark={true} />} */}
    </>
  );
};

export default SendedItem;
