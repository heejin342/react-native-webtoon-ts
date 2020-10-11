const SITE_CHANGE = 'SITE_CHANGE' as const;
const GET_URL = 'GET_URL' as const;

export const siteChange = (value: number) => ({
  type: SITE_CHANGE,
  value,
});

export const getUrl = (url: string | null, search?: string) => ({
  type: GET_URL,
  url,
  search,
});

interface State {
  siteList: {
    site: string;
    value: number;
    url: string;
  }[];
  selectSite: number;
  url: string | null;
  search: string | undefined;
}

const initialState = {
  siteList: [
    {site: '네이버', value: 1, url: '/naver'},
    {site: '다음', value: 2, url: '/daum'},
  ],
  selectSite: 1,
  url: null,
  search: undefined,
};

export const site = (
  state: State = initialState,
  action: ReturnType<typeof siteChange> | ReturnType<typeof getUrl>,
) => {
  switch (action.type) {
    case SITE_CHANGE:
      return {
        ...state,
        selectSite: action.value,
      };
    case GET_URL:
      return {
        ...state,
        url: action.url,
        search: action.search,
      };
    default:
      return state;
  }
};
