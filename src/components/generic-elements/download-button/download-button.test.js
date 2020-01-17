import { shallow, mount } from "enzyme"
import DownloadButton from "./download-button"
import { AuthenticatedHTTPClient } from "../../../utils/http-clients"
import { createRef } from "react"

describe("DownloadButton ", () => {
  test("it generates and clicks a link to the actual file", () => {
    AuthenticatedHTTPClient.get = jest.fn()
    AuthenticatedHTTPClient.get.mockImplementationOnce(() => ({
      status: 200,
      body: "url"
    }));

    const link = createRef()
    console.log("link in test", link)

    const subject = mount(
      <DownloadButton url={"abc"} link={link} filename="dataset.csv"/>
    )
    subject.find('.auth-link').simulate('click')

    //   //Mock window.URL.createURL?
    //   //Mock fetch

    // const link = {hasBeenClicked: false, current: {download: "download", href: "href", click: () => { console.log('clicked')}}}
    // setTimeout(console.log("thing", link.current.href), 1000)



    // setTimeout(expect(subject.find('.auth-link').html()).toBe('foo'), 3000);
      expect(true).toBe(false)

    
  });
});
