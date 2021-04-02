import { MockedProvider } from "@apollo/client/testing";
import { ApolloProvider } from "@apollo/client";
import { render, RenderResult, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMockClient, MockApolloClient } from "mock-apollo-client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router } from "react-router-dom";
import {
  Podcasts,
  GET_PODCASTS,
  GET_PODCASTS_BY_CATEGORY,
} from "../../pages/podcasts";

// jest.mock("react-multi-carousel", () => {
//   const realModule = jest.requireActual("react-multi-carousel");
//   return {
//     // ...realModule,
//     Carousel: () => <div>carousel</div>,
//   };
// });

const mocks = [
  {
    request: {
      query: GET_PODCASTS,
    },
    result: {
      //   loading: false,
      data: {
        getPodcasts: {
          ok: true,
          error: "podcasts-error",
          podcasts: [
            {
              id: 1,
              title: "testTitle",
              category: "testCategory",
              rating: 0,
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjZt805JMihjChbsRmtabBwt86kFvGcdEdzg2Fg-rP_hPUo6We",
            },
            {
              id: 2,
              title: "testTitle2",
              category: "Education",
              rating: 0,
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjZt805JMihjChbsRmtabBwt86kFvGcdEdzg2Fg-rP_hPUo6We",
            },
          ],
        },
      },
    },
  },
  {
    request: {
      query: GET_PODCASTS_BY_CATEGORY,
      variables: {
        input: {
          category: "Education",
        },
      },
    },
    result: {
      //   loading: false,
      data: {
        getPodcastsByCategory: {
          ok: true,
          error: "podcasts-error",
          podcasts: [
            {
              id: 1,
              title: "testTitle",
              category: "Education",
              rating: 0,
              image:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjZt805JMihjChbsRmtabBwt86kFvGcdEdzg2Fg-rP_hPUo6We",
            },
          ],
        },
      },
    },
  },
];

describe("<Podcasts />", () => {
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
            <Router>
              <Podcasts />
            </Router>
          </MockedProvider>
        </HelmetProvider>
      );
    });
  });
  it("should render OK", async () => {
    await waitFor(() => {
      expect(document.title).toBe("Podcasts | Podcloud");
    });
  });
  it("should render sample podcast", async () => {
    const { getByText, container } = renderResult;
    await new Promise((resolve) => setTimeout(resolve, 0));
    getByText("Education");
    // expect(container.textContent).toMatch("No Podcast yet...");
    expect(
      container.getElementsByClassName("react-multi-carousel-list  ").length
    ).toBe(2);
    // getByText("No Podcast yet...");
    // expect(container).toMatch("testTitle");
    // getByText("carousel");
  });
});
