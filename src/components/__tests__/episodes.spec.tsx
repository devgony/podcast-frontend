import { MockedProvider } from "@apollo/client/testing";
import { render, RenderResult, waitFor } from "@testing-library/react";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { HelmetProvider } from "react-helmet-async";
import { Router, Route } from "react-router-dom";
import { GET_EPISODES, Episodes, GET_PODCAST } from "../../pages/episodes";
import { createMemoryHistory } from "history";

const mocks = [
  {
    request: {
      query: GET_PODCAST,
      variables: { input: { id: 1 } },
    },
    result: {
      //   loading: false,
      data: {
        getPodcast: {
          ok: true,
          error: "podcast-error",
          podcast: {
            id: 1,
            title: "testTitle",
            category: "Education",
            rating: 0,
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjZt805JMihjChbsRmtabBwt86kFvGcdEdzg2Fg-rP_hPUo6We",
            intro: "GET_PODCASTintroWORKS",
          },
        },
      },
    },
  },
  {
    request: {
      query: GET_EPISODES,
      variables: { input: { podcastId: 1 } },
    },
    result: {
      data: {
        getEpisodes: {
          ok: true,
          error: "sdfsdf",
          episodes: [
            {
              id: 2,
              title: "GET_EPISODESWORKS",
              content: "sdfsdf",
              podcast: {
                id: 1,
              },
            },
          ],
        },
      },
    },
  },
];

describe("<Episodes />", () => {
  // const history = createMemoryHistory();
  const history = createMemoryHistory({ initialEntries: ["/podcast/1"] });
  // history.push("/podcast/1");
  jest.mock("react-router", () => ({
    useParams: () => {
      return {
        id: "1",
      };
    },
  }));
  let renderResult: RenderResult;
  let mockedClient: MockApolloClient;
  beforeEach(async () => {
    await waitFor(() => {
      mockedClient = createMockClient();
      renderResult = render(
        <HelmetProvider>
          <MockedProvider
            mocks={mocks}
            addTypename={false}
            defaultOptions={{
              watchQuery: { fetchPolicy: "no-cache" },
              query: { fetchPolicy: "no-cache" },
            }}
          >
            <Router history={history}>
              <Route path="/podcast/:id">
                <Episodes />
              </Route>
            </Router>
          </MockedProvider>
        </HelmetProvider>
      );
    });
  });
  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Episodes | Podcloud");
    });
  });
  it("should render sample episode", async () => {
    const { getByText, container, debug, rerender } = renderResult;
    await new Promise((resolve) => setTimeout(resolve, 0));
    getByText("GET_PODCASTintroWORKS");
    getByText("GET_EPISODESWORKS");
  });
});
