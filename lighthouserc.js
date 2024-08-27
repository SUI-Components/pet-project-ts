const {URL_APP, GITHUB_TOKEN, CHROME_PATH} = process.env

module.exports = {
  ci: {
    collect: {
      chromePath: CHROME_PATH,
      url: [
        URL_APP + '/',              // eslint-disable-line
        URL_APP + '/movie/955916']  // eslint-disable-line
    },
    upload: {
      target: 'lhci',
      token: 'a8fcb41e-8af0-4374-8139-2a6849c43bb5',
      serverBaseUrl: 'https://lhci-server.es-microtest-pro.schip.io/',
      githubToken: GITHUB_TOKEN,
      githubApiHost: 'https://github.mpi-internal.com/',
      urlReplacementPatterns: [
        's#ms-pet-movies--sandbox(.*?).es-microtest-pre.schip.io#ms-pet-movies--sandbox.es-microtest-pro.schip.io#', // eslint-disable-line
      ]
    }
  }
}

// https://ms-pet-movies--sandbox-pr-35.es-microtest-pre.schip.io/movie/955916
// https://ms-pet-movies--sandbox.es-microtest-pro.schip.io/movie/955916
//
// https://ms-pet-movies--sandbox-pr-35.es-microtest-pre.schip.io/
// https://ms-pet-movies--sandbox.es-microtest-pro.schip.io/
