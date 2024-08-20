const {URL_APP} = process.env

module.exports = {
  ci: {
    collect: {
      url: [
        URL_APP + '/',              // eslint-disable-line
        URL_APP + '/movie/955916']  // eslint-disable-line
    }
  }
}
