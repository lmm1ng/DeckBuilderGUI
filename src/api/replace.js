export default {
  prepare(requestData) {
    return fetch('/api/replace/prepare', {
      method: 'POST',
      body: requestData,
      headers: { ContentType: 'multipart/form-data' },
    }).then(response => response.json())
  },
  replace(requestData) {
    return fetch('/api/replace', {
      method: 'POST',
      body: requestData,
      headers: { ContentType: 'multipart/form-data' },
    }).then(response => response.json())
  },
}
