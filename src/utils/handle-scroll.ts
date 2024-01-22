export default function handleScroll(
  length: number,
  total: number,
  setIsFetching: (value: boolean) => void
) {
  if (
    window.innerHeight + document.documentElement.scrollTop + 10 >
    document.documentElement.offsetHeight
  ) {
    if (length < total) {
      setIsFetching(true);
    }
  } else return;
}
