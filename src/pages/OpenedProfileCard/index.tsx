import Layout from "@/components/layout/layout"
import Footer from '@/components/layout/footer';
import MatchingListHeader from "@/components/layout/matchingListHeader";
import ItemContainer from "@/components/matchingList/ItemContainer";
import ReceivedItem from "@/components/matchingList/ReceivedItem";
import useCustomScroll from "@/hooks/useCustomScrollBar/useCustomScrollBar";
import { useEffect, useRef, useState } from "react";
import { getOpenedProfileCard } from "@/services/OpenedProfileCard/OpenedProfileCardApi";
import { useQuery } from "@tanstack/react-query";
import { OpenedProfileCardDTO } from '@/type/services/OpenedProfileCard/OpenedProfileCard'
import InfiniteDiv from "@/components/InfiniteDiv/InfiniteDiv";
import { useInView } from 'react-intersection-observer';

const OpenedProfileCard = () => {
  const outerContainerRef = useRef<HTMLDivElement | null>(null);
  const innerContainerRef = useRef<HTMLDivElement | null>(null);
  const { ScrollBarThumb, calculateThumbY, thumbH, thumbRef } = useCustomScroll(
    {
      outerContainerRef,
      innerContainerRef,
      outerContainerBorderWidth: 1
    }
  );
  // 페에징
  const [page, setPage] = useState<number>(0);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);
  const [size] = useState<number>(10);

  const [view, inView] = useInView();

  // api 연결 !
  const { data: openedProfileCardData, error } = useQuery({
    queryKey: ['profileCardData'],
    queryFn: () => getOpenedProfileCard(page, size),
    staleTime: 1000 * 60 * 5, // 5분
    placeholderData: (previousData) => previousData,
  });

  const [profiles, setProfiles] = useState<OpenedProfileCardDTO["data"] | undefined>();

  useEffect(() => {
    if (isLastPage) return;

    getOpenedProfileCard(page, size).then((response) => {
      if (response?.data?.length < size) {
        setIsLastPage(true);
      }
      setProfiles((prevProfiles) => {
        const newProfiles = response.data;
        return prevProfiles ? [...prevProfiles, ...newProfiles] : newProfiles;
      });
    });
  }, [page, size]);

  const loadMore = () => {
    if (!isLastPage) {
      setPage((prevPage) => prevPage + 1);
    }
  };
  useEffect(() => {
    if (inView && !isLastPage) {

      loadMore();
    }
  }, [inView]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!openedProfileCardData) {
    return <div>Loading...</div>;
  }

  return (
    <Layout backgroundColor='#252525'>
      <main className="min-h-full h-auto bg-matching-list relative flex flex-col">

        <MatchingListHeader text={'열어본 프로필'} background={'#252525'} />
        <div className="relative h-[calc(75vh)] overflow-y-scroll scrollbar-hide" ref={outerContainerRef} onScroll={calculateThumbY}>
          <ScrollBarThumb ref={thumbRef} height={thumbH} />

          <ItemContainer ref={innerContainerRef}>
            {profiles?.map((item, index) => (
              <ReceivedItem key={index} {...item} type={'heart'} />
            ))}
          <InfiniteDiv view={view} />

          </ItemContainer>
        </div>
        <Footer />
      </main>

    </Layout>
  )
}

export default OpenedProfileCard