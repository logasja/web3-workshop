import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './styles/index.scss'
import IPFS from 'ipfs-core'
import store from './PlaylistsStore'
import Playlists from './Playlists'
import Playlist from './Playlist'

class App extends React.Component{
    async componentDidMount () {
      const ipfs = await IPFS.create({
        repo: './ipfs-repo',
        EXPERIMENTAL: { pubsub: true },
        preload: { "enabled": false },
        config: {
          Addresses: {
            Swarm: ["/dns4/young-hollows-62849.herokuapp.com/tcp/443/wss/p2p-webrtc-star/"]
          },
          Bootstrap: ["/ip4/10.220.3.64/tcp/4002/ws/ipfs/QmTLJ3rHiqtcitBRhPv8enSHmhZahCF7heYQvKkWvBfGVq"] //connect workshop peers
        }
      })
      await store.connect(ipfs);
      console.log("odb id:", store.odb.identity.id);
    }

    render(){
      return (
        <div>
          <pre>      .-``'.  📻                            📻  .'''-.</pre>
          <pre>    .`   .`       ~ O R B I T   W A V E S ~      `.   '.</pre>
          <pre>_.-'     '._ <a href="https://github.com/orbitdb/web3-workshop/">github.com/orbitdb/web3-workshop/</a> _.'     '-._</pre>
          <Router>
            <Route path="/orbitdb/:hash/:name" component={(props) => <Playlist {...props} store={store}/> }/>
            <Route exact path="/" component={(props) => <Playlists {...props} store={store}/> }/>
          </Router>
        </div>
      )
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
