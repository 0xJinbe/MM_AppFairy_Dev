/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'

const scripts = [
  { loading: fetch("https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=62f3c743eafac5a2e565d12c").then(body => body.text()), isAsync: false },
  { loading: fetch("js/moonmoonz.js").then(body => body.text()), isAsync: false },
]

let Controller

class MoonstayzView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/MoonstayzController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = MoonstayzView

        return Controller
      }

      throw e
    }
  }

  componentDidMount() {
    const htmlEl = document.querySelector('html')
    htmlEl.dataset['wfPage'] = '630cc274a133e474f96ce267'
    htmlEl.dataset['wfSite'] = '62f3c743eafac5a2e565d12c'

    scripts.concat(null).reduce((active, next) => Promise.resolve(active).then((active) => {
      const loading = active.loading.then((script) => {
        new Function(`
          with (this) {
            eval(arguments[0])
          }
        `).call(window, script)

        return next
      })

      return active.isAsync ? next : loading
    }))
  }

  render() {
    const proxies = MoonstayzView.Controller !== MoonstayzView ? transformProxies(this.props.children) : {

    }

    return (
      <span>
        <style dangerouslySetInnerHTML={{ __html: `
          @import url(/css/normalize.css);
          @import url(/css/components.css);
          @import url(/css/moonmoonz.css);
        ` }} />
        <span className="af-view">
          <div>
            <div className="af-class-section af-class-wf-section">
              <div className="af-class-upperwrapper">
                <div className="af-class-leftupperwrapper">
                  <a href="https://twitter.com/MoonMoonzNFT" target="_blank" className="w-inline-block"><img src="images/twitter.png" loading="lazy" alt className="af-class-icon" /></a>
                  <a href="#" className="af-class-link-block w-inline-block"><img src="images/etherscan-logo-light-circle.png" loading="lazy" alt className="af-class-icon" /></a>
                  <a href="#" className="af-class-link-block w-inline-block"><img src="images/Logomark-Transparent-White.png" loading="lazy" alt className="af-class-icon" /></a>
                  <a href="index.html" className="af-class-homebutton w-button">Home</a>
                </div>
                <div className="af-class-rightupperwrapper">
                  <a id="connect-wallet" href="#" className="af-class-buttonwallet w-button">Connect Wallet</a>
                </div>
              </div>
              <div className="af-class-middlewrapper af-class-stake">
                <div className="af-class-container af-class-stake w-container">
                  <h1 className="af-class-heroheading"> MOON STAYZ</h1>
                  <div className="af-class-comingsoontextwrapper">
                    <h1 className="af-class-comingsoontext">Under construction...</h1>
                  </div>
                </div>
              </div>
            </div>
            {/* [if lte IE 9]><![endif] */}
          </div>
        </span>
      </span>
    )
  }
}

export default MoonstayzView

/* eslint-enable */