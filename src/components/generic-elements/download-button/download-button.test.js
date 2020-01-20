import { shallow } from "enzyme";
import DownloadButton from "./download-button";
import { AuthenticatedHTTPClient } from "../../../utils/http-clients";

describe("download-button", () => {
  test("it calls window.location.href onClick", done => {
    AuthenticatedHTTPClient.get = jest.fn();
    AuthenticatedHTTPClient.get.mockImplementationOnce(() => ({
      status: 200,
      data: "/presigned/url?key=123"
    }));

    const url = "http://dummy.com";
    Object.defineProperty(window, "location", {
      value: {
        href: url
      },
      writable: true
    });

    let subject = shallow(
      <DownloadButton url={"abc"} format="csv" filename="dataset.csv" />
    );

    subject.find("a").simulate("click");

    setTimeout(() => {
      expect(window.location.href).toEqual(
        "http://test.example.com/api/v1/presigned/url?key=123&format=csv"
      );
      done();
    }, 100);
  });
});
