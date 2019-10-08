import { shallow } from "enzyme";

import DatasetQueryView from "./dataset-query-view";
import DatasetQuery from "../../components/dataset-query";
import LoadingElement from "../../components/generic-elements/loading-element";

const tableName = "org1__table2";

// Currently, shallow rendering is not compatible with React hooks.
// We've utilized a strategy found here https://blog.carbonfive.com/2019/08/05/shallow-testing-hooks-with-enzyme/
// which should become unneccessary in the near future
const runUseEffect = () => {
  const useEffect = jest.spyOn(React, "useEffect");
  useEffect.mockImplementationOnce(f => f());
};

describe("dataset visualization view", () => {
  const dataSources = { data: ["sources"] };

  let subject;
  let queryCallback;

  describe("before load", () => {
    beforeEach(() => {
      queryCallback = jest.fn();
      subject = shallow(
        <DatasetQueryView
          isLoading={true}
          queryData={[]}
          systemName={tableName}
          onQueryDataset={queryCallback}
          dataSources={dataSources}
        />
      );
    });

    it("shows full page loading icon", () => {
      expect(subject.find(LoadingElement).length).toEqual(1);
    });
  });

  describe("after load", () => {
    beforeEach(() => {
      runUseEffect();
      queryCallback = jest.fn();

      subject = shallow(
        <DatasetQueryView
          isLoading={false}
          queryData={[{ data: {} }]}
          systemName={tableName}
          onQueryDataset={queryCallback}
          dataSources={dataSources}
        />
      );
    });

    it("does not show full page loading icon", () => {
      expect(subject.find(LoadingElement).length).toEqual(0);
    });

    describe("onQueryDataset handler", () => {
      const newText = "SELECT * FROM great_org__awesome_dataset LIMIT 55";

      beforeEach(() => {
        subject
          .find(DatasetQuery)
          .props()
          .onQueryDataset(newText);
      });

      test("runs query", () => {
        expect(queryCallback).toHaveBeenCalledWith(newText);
      });

      test("sets hasUserSubmittedQuery to true", () => {
        const actual = subject.find(DatasetQuery).props().hasUserSubmittedQuery;
        expect(actual).toBeTruthy();
      });

      test("once hasUserSubmittedQuery has been set to true it stays true", () => {
        subject
          .find(DatasetQuery)
          .props()
          .onQueryDataset(newText);

        const actual = subject.find(DatasetQuery).props().hasUserSubmittedQuery;
        expect(actual).toBeTruthy();
      });
    });
  });

  test("when user has submitted query, full page loading should not render", () => {
    runUseEffect();
    queryCallback = jest.fn();

    subject = shallow(
      <DatasetQueryView
        isLoading={false}
        queryData={[{ data: {} }]}
        systemName={tableName}
        onQueryDataset={queryCallback}
        dataSources={dataSources}
      />
    );

    subject
      .find(DatasetQuery)
      .props()
      .onQueryDataset("SELECT * FROM sky");
    subject.setProps({ isLoading: true });

    expect(subject.find(LoadingElement).length).toEqual(0);
  });
});
