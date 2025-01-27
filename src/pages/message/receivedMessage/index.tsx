import Layout from "@/components/layout/layout"
import Footer from '@/components/layout/footer';
import MatchingListHeader from "@/components/layout/matchingListHeader";
import ItemContainer from "@/components/matchingList/ItemContainer";
import ReceivedItem from "@/components/matchingList/ReceivedItem";
import useCustomScroll from "@/hooks/useCustomScrollBar/useCustomScrollBar";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getReciveMessageProfileCard } from "@/services/ProfileCard/MessageProfileCard";
import { ItemProps } from "@/type/MatchingList/MatchingList";

const ReceivedMessage = () => {
  const outerContainerRef = useRef<HTMLDivElement | null>(null);
  const innerContainerRef = useRef<HTMLDivElement | null>(null);
  const { ScrollBarThumb, calculateThumbY, thumbH, thumbRef } = useCustomScroll(
    {
      outerContainerRef,
      innerContainerRef,
      outerContainerBorderWidth: 1
    }
  );
  
  const [page, ] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [size] = useState<number>(10);

  const { data: reciveMessageProfileCard, error } = useQuery({
    queryKey: ['recieveMessageProfileCardData'],
    queryFn: () => getReciveMessageProfileCard(import.meta.env.VITE_DUETT_TOKEN,page),
    staleTime: 1000 * 60 * 5, // 5분
    placeholderData: (previousData) => previousData,
  });

  const [recieveMessageProfileCardData, setRecieveMessageProfileCardData] = useState<ItemProps[] | undefined>();

  useEffect(() => {
    if (isLastPage) return;

    getReciveMessageProfileCard(import.meta.env.VITE_DUETT_TOKEN,page).then((response) => {
      if (response?.data?.length < size) {
        setIsLastPage(true);
      }
      setRecieveMessageProfileCardData((prevProfiles) => {
        const newProfiles = response?.data;
        return prevProfiles ? [...prevProfiles, ...newProfiles] : newProfiles;
      });
    });
  }, [page, size]);
  
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!reciveMessageProfileCard) {
    return <div>Loading...</div>;
  }

  return (
    <Layout backgroundColor='#252525'>
      <main className="min-h-full h-auto bg-matching-list relative flex flex-col">

        <MatchingListHeader text={'받은 메시지'} background={'#252525'} />
        <div className="relative h-[calc(75vh)] overflow-y-scroll scrollbar-hide" ref={outerContainerRef} onScroll={calculateThumbY}>
        <ScrollBarThumb ref={thumbRef} height={thumbH} />

        <ItemContainer ref={innerContainerRef}>
        {recieveMessageProfileCardData?.map((item, index) => (
            <ReceivedItem key={index} {...item} type={'message'} />
          ))}

        </ItemContainer>
        </div>
        <Footer />
      </main>

    </Layout>
  )
}

export default ReceivedMessage