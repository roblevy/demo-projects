Pic.$inject = ['$http'];
function Pic($http) {
  function find() {
    return $http.get('/api/pics');
  }

  function findById(id) {
    return $http.get(`/api/pics/${id}`);
  }

  function create(data) {
    return $http.post('/api/pics', data);
  }

  function update(pic, data) {
    return $http.put(`/api/pics/${pic._id}`, data);
  }

  function remove(pic) {
    return $http.delete(`/api/pics/${pic._id}`);
  }

  this.find = find;
  this.findById = findById;
  this.create = create;
  this.update = update;
  this.remove = remove;
}

export default Pic;
