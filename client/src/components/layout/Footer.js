import React, { Component } from "react";
import LinkList from "../linksList";

class Footer extends Component {
  render() {
    return (
      <div>
        <footer className="page-footer black">
          <div className="container">
            <div className="row">
              <div className="col l6 s12">
                <h5 className="white-text">Mortgage Genie</h5>
                <div className="grey-text text-lighten-4">
                  <p>
                    Because of the rules and regulations around real-estate, we
                    were not allowed to use a functioning MLS API for this App.
                  </p>
                  <p>
                    The developers here at Mortgage Genie would like to thank
                    the Bridge Interactive:{" "}
                  </p>
                  <p>
                    "A modern platform for normalized real estate data The
                    Bridge API works with industry partners to provide a
                    consistent API for the data you need to build real estate
                    products at scale."
                  </p>
                  <p>
                    We are grateful to them for graciously providing a test API
                    for developers. They can be reached here:
                  </p>
                  <a href="https://www.bridgeinteractive.com">
                    The Bridge Interactive
                  </a>
                </div>
              </div>
              <div className="col l4 offset-l2 s12">
                <h5 className="white-text">Links</h5>
                <LinkList style={{color:"white"}}/>
                {/* <ul>
                  <li>
                  <a className="grey-text text-lighten-3" href="#!">
                      <LinkList />
                    </a>
                  </li>
                </ul> */}
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <div className="container">
              Mortgage Genie 2019 ©
                {/* More Links */}
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
