import {
  MainInfoDataDTO,
  ProfilesInfoDTO,
  UserInfoDTO,
  UserIntroDTO,
  UserMusicTagDTO,
} from '@/type/services/Mypage/MypageDTO';
import { api } from '../client';
import { Base64ToBlob } from '@/utils/Base64ToBlob';

// Main 페이지 데이터 가져오기(Home)
export const getMainData = async (accessToken: string): Promise<MainInfoDataDTO> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/profiles/home`;
  try {
    const { data } = await api.get<MainInfoDataDTO>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('Failed to fetch user info data');
  }
};

//Info 데이터 가져오기
export const getUserInfoData = async (accessToken: string): Promise<ProfilesInfoDTO> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/profiles/info`;
  try {
    const { data } = await api.get<ProfilesInfoDTO>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data;
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('Failed to fetch user info data');
  }
};

// Info 데이터 수정하기
export const patchUserInfoData = async (accessToken: string, userInfo: UserInfoDTO) => {
  const formData = new FormData();
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/profiles/info`;

  if (userInfo.profileImage && userInfo.profileImage.includes(',')) {
    const contentType = userInfo.profileImage.split(';')[0].split(':')[1];
    const blob = Base64ToBlob(userInfo.profileImage, contentType);
    formData.append('profileImage', blob, 'profileImage.jpg'); // Adjust file name as needed
  }

  if (userInfo.name) {
    formData.append('name', userInfo.name);
  }
  if (userInfo.oneLineIntroduction) {
    formData.append('oneLineIntroduction', userInfo.oneLineIntroduction);
  }
  formData.append('isDeleteImage', String(userInfo.isDeleteImage));

  try {
    const response = await api.patch(url, formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error patching user info data:', error);
    throw error;
  }
};
//* -------------------------------------------------------------------------- *//
//* -------------------------------------------------------------------------- *//
// Intro 데이터 가져오기
export const getUserIntroData = async (accessToken: string): Promise<UserIntroDTO> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/profiles/intro`;
  try {
    const { data } = await api.get<{ data: UserIntroDTO }>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('Failed to fetch user info data');
  }
};

// Intro 데이터 저장하기
export const patchUserIntroData = async (
  accessToken: string,
  introData: UserIntroDTO,
): Promise<UserIntroDTO> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/profiles/intro`;
  try {
    const { data } = await api.patch<{ data: UserIntroDTO }>(url, introData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('Failed to patch user intro data');
  }
};

// Intro Tags 가져오기
export const getMusicTagsData = async (accessToken: string): Promise<UserMusicTagDTO> => {
  const url = `${import.meta.env.VITE_DUETT_API_URL}/api/v1/profiles/tags`;
  try {
    const { data } = await api.get<{ data: UserMusicTagDTO }>(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return data.data;
  } catch (error) {
    console.error('에러내용:', error);
    throw new Error('Failed to fetch user info data');
  }
};
