const {URL_APP, GITHUB_TOKEN} = process.env

module.exports = {
  ci: {
    collect: {
      url: [
        URL_APP + '/',              // eslint-disable-line
        URL_APP + '/movie/955916']  // eslint-disable-line
    },
    upload: {
      target: 'lhci',
      token: 'a8fcb41e-8af0-4374-8139-2a6849c43bb5',
      serverBaseUrl: 'https://lhci-server.es-microtest-pro.schip.io/',
      githubToken: GITHUB_TOKEN,
      githubApiHost: 'https://github.mpi-internal.com/'
    }
  }
}
