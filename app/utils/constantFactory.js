export default class ConstantFactory {
  static buildAsyncFor(name){
    return {
      PENDING: `FETCH_PENDING_${name}`,
      SUCCESS: `FETCH_SUCCESS_${name}`,
      FAILURE: `FETCH_FAILURE_${name}`
    }
  }
}
