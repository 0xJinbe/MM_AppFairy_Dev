/* eslint-disable */

import React from 'react'
import { createScope, map, transformProxies } from './helpers'
import WalletConnectView from './WalletConnectView'
import MintButtonView from './MintButtonView'

const scripts = [
  { loading: fetch("https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=62f3c743eafac5a2e565d12c").then(body => body.text()), isAsync: false },
  { loading: fetch("js/moonmoonz.js").then(body => body.text()), isAsync: false },
]

let Controller

class IndexView extends React.Component {
  static get Controller() {
    if (Controller) return Controller

    try {
      Controller = require('../controllers/IndexController')
      Controller = Controller.default || Controller

      return Controller
    }
    catch (e) {
      if (e.code == 'MODULE_NOT_FOUND') {
        Controller = IndexView

        return Controller
      }

      throw e
    }
  }

  componentDidMount() {
    const htmlEl = document.querySelector('html')
    htmlEl.dataset['wfPage'] = '62f3c743eafac52baa65d12d'
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
    const proxies = IndexView.Controller !== IndexView ? transformProxies(this.props.children) : {

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
            <div data-w-id="fbbb9008-09fb-34e9-e7f6-deb030ff43d7" className="af-class-section af-class-wf-section">
              <div className="af-class-upperwrapper">
                <div className="af-class-leftupperwrapper">
                  <a href="https://twitter.com/MoonMoonzNFT" target="_blank" className="w-inline-block"><img src="images/twitter.png" loading="lazy" alt className="af-class-icon" /></a>
                  <a href="#" className="af-class-link-block w-inline-block"><img src="images/etherscan-logo-light-circle.png" loading="lazy" alt className="af-class-icon" /></a>
                  <a href="#" className="af-class-link-block w-inline-block"><img src="images/Logomark-Transparent-White.png" loading="lazy" alt className="af-class-icon" /></a>
                </div>
                <div className="af-class-rightupperwrapper">
                  <WalletConnectView.Controller />
                </div>
              </div>
              <div className="af-class-middlewrapper">
                <div className="af-class-container w-container">
                  <h1 className="af-class-heroheading"><strong>MoonMoonz</strong></h1><img src="images/MoonMoonzCover1.png" loading="lazy" alt className="af-class-heroimage" />
                  <div className="af-class-buttonwrapper">
                    <div className="af-class-innerbuttonwrapper">
                      <MintButtonView.Controller />
                    </div>
                    <div className="af-class-innerbuttonwrapper">
                      <a id="stake-button" href="stake.html" className="af-class-buttonstake w-button">Stake</a>
                    </div>
                    <div className="af-class-innerbuttonwrapper">
                      <a id="market-button" href="market.html" className="af-class-buttonmarket w-button">Moon market</a>
                    </div>
                    <div className="af-class-innerbuttonwrapper">
                      <a id="market-button" href="moonstayz.html" className="af-class-buttonmarket w-button">Moon Stayz</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="af-class-mintpopup">
                <div className="af-class-container af-class-mintcontainer w-container">
                  <h1 className="af-class-heroheading"><strong className="af-class-bold-text">MoonMoonz</strong></h1>
                  <div className="af-class-pricewrapper">
                    <div className="af-class-pricetextheading">PRICE</div>
                    <h1 id="priceValues" className="af-class-pricevalues"><strong className="af-class-bold-text-2">0.0088 Ξ</strong></h1>
                  </div>
                  <div className="af-class-mintqauntitywrapper">
                    <div className="af-class-pricetextheading">minted</div>
                    <h1 id="quantityValues" className="af-class-quantityvalues"><strong className="af-class-bold-text-2">0 / 5555</strong></h1>
                  </div>
                  <div className="af-class-innerbuttonwrapper">
                    <a id="buttonMintAction" href="#" className="af-class-buttonmintaction w-button">mint</a>
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

export default IndexView

/* eslint-enable */