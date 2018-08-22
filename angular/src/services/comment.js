Comment.$inject = [ '$http' ];
function Comment($http) {

  function create(pic, data) {
    return $http.post(`/api/pics/${pic._id}/comments`, data);
  }

  function remove(pic, comment) {
    return $http.delete(`/api/pics/${pic._id}/comments/${comment._id}`);
  }

  function edit(pic, comment, data) {
    return $http.put(`/api/pics/${pic._id}/comments/${comment._id}`, data);
  }

  this.create = create;
  this.edit = edit;
  this.remove = remove;
}

export default Comment;
