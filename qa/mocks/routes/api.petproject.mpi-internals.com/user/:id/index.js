export async function get({headers, body, params, query, cookies}) {
  debugger
  return [200, {name: 'nombre'}]
}
export async function post({headers, body, params, query, cookies}) {
  return [200, {params}]
}
export async function put() {}
export async function del() {}
