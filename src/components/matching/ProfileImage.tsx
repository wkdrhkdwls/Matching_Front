import lock from '@/assets/ProfileCard/lock.svg';
import { ProfileImageProps } from '@/type/ProfileCard/ProfileCard';

const ProfileImage = ({ handleSetOpen, handleSetModalOpen, isLock, activeIndex,profileImageUrl }: ProfileImageProps) => {
  
  const profileImageStyle = profileImageUrl && !isLock ? 
  `absolute w-full h-full rounded-full object-cover` :
  `absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`

  return (
    <div className={`relative bg-[#2C2C2C] rounded-full w-[3.5rem] h-[3.5rem] `}>
      <img className={profileImageStyle}
        src={profileImageUrl ? profileImageUrl : lock}
        alt='lock'
        onClick={() => {
          if (isLock) {
            handleSetModalOpen(activeIndex, true);
          } else {
            handleSetOpen(activeIndex, true);
            handleSetModalOpen(activeIndex, true);
          }
        }}
      />
    </div>
  );
};

export default ProfileImage;
