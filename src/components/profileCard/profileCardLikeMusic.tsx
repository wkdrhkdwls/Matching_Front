import { Textarea } from "@/components/ui/textarea";

const ProfileCardLikeMusic = () => {

  const profileCardLikeMusicStyle = `w-[90%] mx-[5%] mb-[20px] `;
  const CoupleMusicStyle = `text-[#2F2F2F] text-[0.5rem] ml-[4%] font-bold my-[8px]`;

  return (
    <div className={profileCardLikeMusicStyle} >
      <p data-testid='likeMusic' className={CoupleMusicStyle}>
        어떤 음악취향을 가진 상대에게 <br /> 호감을 느끼나요 ?
      </p>
      <Textarea 
        className="text-[0.5rem] text-[#2F2F2F]"
        value={'나는 이런 음악취향을 가진 상대에게 호감을 느낀다'}/>
    </div>
  );
};

export default ProfileCardLikeMusic;