export default function resolveRequest(request){
  return new Promise((resolve, reject) => {
    request.end((error, res) => {
      error ? reject(error) : resolve(res.body)
    })
  })
}
