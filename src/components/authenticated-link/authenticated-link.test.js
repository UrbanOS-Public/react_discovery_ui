import { shallow, mount } from "enzyme"
import AuthenticatedLink from "./authenticated-link"
import { AuthenticatedHTTPClient } from "../../utils/http-clients"
import { createRef } from "react"

describe("AuthenticatedLink ", () => {
  test("it generates and clicks a link to the actual file", () => {
    AuthenticatedHTTPClient.get = jest.fn()
    AuthenticatedHTTPClient.get.mockImplementationOnce(() => ({
      status: 200,
      body: "url"
    }));

    const link = createRef()
    console.log("link in test", link)

    const subject = mount(
      <AuthenticatedLink url={"abc"} link={link} filename="dataset.csv">
        <div />
      </AuthenticatedLink>
    )
    subject.find('.auth-link').simulate('click')

    //   //Mock window.URL.createURL?
    //   //Mock fetch

    // const link = {hasBeenClicked: false, current: {download: "download", href: "href", click: () => { console.log('clicked')}}}
    setTimeout(console.log("thing", link.current.href), 1000)



    setTimeout(expect(subject.find('.auth-link').html()).toBe('foo'), 3000);


    
  });
});
