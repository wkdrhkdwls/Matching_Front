import Layout from '@/components/layout/layout';
import Footer from '@/components/layout/footer';
import SocialButtons from '@/components/matchingList/SocialButtons';
import ExpandedButtons from '@/components/matchingList/ExpandedButtons';
import Divider from '@/components/common/Divider';
import ItemContainer from '@/components/matchingList/ItemContainer';
import ReceivedItem from '@/components/matchingList/ReceivedItem';
import SendedItem from '@/components/matchingList/SendedItem';
import MatchingListHeader from '@/components/layout/matchingListHeader';
import useMatchingListStateStore from '@/store/matchingListStore';
import { useQuery } from '@tanstack/react-query';
import { getReciveLikedProfileCard, getSendedLikedProfileCard } from '@/services/ProfileCard/LikeProfileCard';
import { useEffect, useState } from 'react';
import { ItemProps } from '@/type/MatchingList/MatchingList';
import { getSendedMessageProfileCard, getReciveMessageProfileCard } from '@/services/ProfileCard/MessageProfileCard';

const MatchingListPage = () => {

  const { data: receivedLikedProfileCardData, error: receivedLikedProfileCardError } = useQuery({
    queryKey: ['receivedLikedProfileCardData'],
    queryFn: () => getReciveLikedProfileCard(import.meta.env.VITE_DUETT_TOKEN, 0),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previousData) => previousData,
  });

  const { data: sendedLikedProfileCardData, error: sendedLikedProfileCardError } = useQuery({
    queryKey: ['sendedLikedProfileCardData'],
    queryFn: () => getSendedLikedProfileCard(import.meta.env.VITE_DUETT_TOKEN, 0),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previousData) => previousData,
  });
  
  const { data: sendedMessageProfileCardData, error: sendedMessageProfileCardError } = useQuery({
    queryKey: ['sendedMessageProfileCardData'],
    queryFn: () => getSendedMessageProfileCard(import.meta.env.VITE_DUETT_TOKEN, 0),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previousData) => previousData,
  });
  
  const { data: reciveMessageProfileCard, error: reciveMessageProfileCardError } = useQuery({
    queryKey: ['recieveMessageProfileCardData'],
    queryFn: () => getReciveMessageProfileCard(import.meta.env.VITE_DUETT_TOKEN, 0),
    staleTime: 1000 * 60 * 5, // 5 minutes
    placeholderData: (previousData) => previousData,
  });

  const {matchingListState} = useMatchingListStateStore();
  const [receivedLikedProfileCard, setReceivedLikedProfileCard] = useState<ItemProps[] | undefined>();
  const [sendedLikedProfileCard, setSendedLikedProfileCard] = useState<ItemProps[] | undefined>();
  const [receivedMessageProfileCard, setReceivedMessageProfileCard] = useState<ItemProps[] | undefined>();
  const [sendedMessageProfileCard, setSendedMessageProfileCard] = useState<ItemProps[] | undefined>();

  useEffect(() => { 
    // 받은 좋아요 불러오기
    getReciveLikedProfileCard(import.meta.env.VITE_DUETT_TOKEN,0).then((response) => {
      setReceivedLikedProfileCard(response?.data);
    });

    // 보낸 좋아요 불러오기
    getSendedLikedProfileCard(import.meta.env.VITE_DUETT_TOKEN,0).then((response) => {
      setSendedLikedProfileCard(response?.data);
    });

    // 보낸 좋아요 불러오기
    getReciveMessageProfileCard(import.meta.env.VITE_DUETT_TOKEN,0).then((response) => {
      setReceivedMessageProfileCard(response?.data);
    });
    
    // 보낸 메시지 불러오기
    getSendedMessageProfileCard(import.meta.env.VITE_DUETT_TOKEN,0).then((response) => {
      setSendedMessageProfileCard(response?.data);
    });
  }, []);

  
  if (receivedLikedProfileCardError && sendedLikedProfileCardError && sendedMessageProfileCardError && reciveMessageProfileCardError) {
    return <div>Error: </div>;
  }

  if (receivedLikedProfileCardData && !sendedLikedProfileCardData && !sendedMessageProfileCardData && ! reciveMessageProfileCard) {
    return <div>Loading...</div>;
  }

  return (
    <Layout backgroundColor='#2C2C2C'>

      <div className="h-auto bg-matching-list relative flex flex-col rounded-t-[28px] pb-[130px]">
        <MatchingListHeader text={'matchingList'} background={'#2C2C2C'} router={'matching'} />

        <SocialButtons />

        {matchingListState === 'heart' &&
          <>
            {/* 받은 하트 */}
            <ExpandedButtons state='받은 하트' router='receivedHeart' />
            <Divider />
            <ItemContainer>
              {receivedLikedProfileCard?.slice(0, 4).map((item, index) => (
                <ReceivedItem key={index} {...item} />
              ))}

            </ItemContainer>
            {/* 보낸하트 */}
            <ExpandedButtons state='보낸 하트' router='sendedHeart' />
            <Divider />
            <ItemContainer>
              {sendedLikedProfileCard?.slice(0, 3).map((item, index) => (
                <SendedItem key={index} {...item} />
              ))}
            </ItemContainer>
          </>
        }

        {matchingListState === 'message' &&
          <>
            {/* 받은 메시지 */}
            <ExpandedButtons state='받은 메시지' router='receivedMessage' />
            <Divider />
            <ItemContainer>
              {receivedMessageProfileCard?.slice(0, 3).map((item, index) => (
                <ReceivedItem key={index} {...item} type={matchingListState} />
              ))}

            </ItemContainer>
            {/* 보낸 메시지 */}
            <ExpandedButtons state='보낸 메시지' router='sendedMessage' />
            <Divider />
            <ItemContainer>
              {sendedMessageProfileCard?.slice(0, 3).map((item, index) => (
                <SendedItem key={index} {...item} />
              ))}
            </ItemContainer>
          </>
        }

      </div>

      <Footer />
    </Layout>
  )
}

export default MatchingListPage