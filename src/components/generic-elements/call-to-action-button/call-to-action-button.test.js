import { shallow, mount } from "enzyme";
import CallToActionButton from "./call-to-action-button";
import Modal from 'react-modal';
import { AuthenticatedHTTPClient } from "../../../utils/http-clients";

describe("call-to-action-button", () => {

  const createCallToActionButton = (extraProps = {}) => {
    return shallow(
      <CallToActionButton {...extraProps} />
    );
  }

  test("it calls window.location.href onClick", done => {
    AuthenticatedHTTPClient.get = jest.fn();
    AuthenticatedHTTPClient.get.mockImplementationOnce(() => ({
      status: 200,
      data: "http://test.example.com/api/v1/presigned/url?key=123"
    }));

    const url = "http://dummy.com";
    Object.defineProperty(window, "location", {
      value: {
        href: url
      },
      writable: true
    });

    let subject = createCallToActionButton({url: "abc", format: "csv", filename: "dataset.csv"})

    subject.find('.call-to-action-button').simulate("click");

    setTimeout(() => {
      expect(window.location.href).toEqual(
        "http://test.example.com/api/v1/presigned/url?key=123&_format=csv"
      );
      done();
    }, 100);
  });

  test("call to action is dependent on dataset sourceType", () => {

    let subject = createCallToActionButton({url: "abc", format: "csv", filename: "dataset.csv"})

    expect(subject.text().includes('Download')).toBe(true);

    subject = createCallToActionButton({url: "abc", format: "csv", filename: "dataset.csv", sourceType: "remote", sourceUrl: "https://www.google.com/"})

    expect(subject.text().includes('Open Dataset')).toBe(true);
  })


  test("Clicking the Call to Action Button for remote datasets opens dialog", () => {
    let subject = createCallToActionButton({url: "abc", format: "csv", filename: "dataset.csv", sourceType: "remote", sourceUrl: "https://www.google.com/"})

    subject.find('.call-to-action-button').simulate('click')

    expect(subject.find(Modal).props().isOpen).toBe(true)
  })

  test("clicking continues opens a new window with the sourceUrl", () => {
    global.open = jest.fn();

    let subject = createCallToActionButton({url: "abc", format: "csv", filename: "dataset.csv", sourceType: "remote", sourceUrl: "https://www.google.com/"})

    subject.find('.call-to-action-button').simulate('click')

    subject.find('.modal-confirm').simulate('click')

    expect(global.open).toBeCalled();
  })
});
