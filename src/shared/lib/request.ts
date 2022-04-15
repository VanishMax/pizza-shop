type DataOrError<DATA> = { data?: DATA; error?: never } | { data?: never; error: string };

const request = async <RES>(
  url: RequestInfo,
  options: RequestInit = {},
): Promise<DataOrError<RES>> => {
  try {
    const res = await fetch(url, {
      ...options,
    });
    const data = (await res.json()) as RES;
    return { data };
  } catch (e) {
    return { error: 'An error happened' };
  }
};
export default request;
