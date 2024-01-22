import { useCallback, useEffect, useState } from "react";
import handleScroll from "../utils/handle-scroll";

export default function usePaginationScrollAutoComlpete({
  length,
  total,
  fetch,
  noHandleScroll,
}: {
  /**
   * To Fetch Data on Paginate
   */
  fetch: (
    _: number,
    next: number,
    success: (page: number, next: number) => void
  ) => void;
  /**
   * No Automatic Handle Scroll
   * @default false
   */
  noHandleScroll: boolean;
  /**
   * Length Local Data
   */
  length?: number;
  /**
   * Total All Data on Server
   */
  total?: number;
}): {
  /**
   * Number Current Page
   */
  page: number;
  /**
   * Status Fetching Data From Server
   */
  isFetching: boolean;
  /**
   *  Set The Page Number To Get it
   */
  setPagination: ({ next }: { next: number; page: number }) => void;
  /**
   * Set The State of Data Fetch
   */
  setIsFetching: (value: boolean) => void;
} {
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [pagination, setPagination] = useState<{ page: number; next: number }>({
    page: 1,
    next: 2,
  });

  useEffect(() => {
    if (noHandleScroll) return;
    window.addEventListener("scroll", scroll);

    return () => window.removeEventListener("scroll", scroll);
    // eslint-disable-next-line
  }, [total, length]);

  const scroll = useCallback(() => {
    if (length && total) return handleScroll(length, total, setIsFetching);
  }, [total, length]);

  useEffect(() => {
    if (!isFetching) return;
    fetch(pagination.page, pagination.next, (page: number, next: number) => {
      setPagination({
        next: next || 2,
        page,
      });
      setIsFetching(false);
    });
    // eslint-disable-next-line
  }, [isFetching, pagination]);

  return { page: pagination.page, isFetching, setPagination, setIsFetching };
}
