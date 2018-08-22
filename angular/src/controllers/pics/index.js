PicsIndexCtrl.$inject = ['$state', 'Pic'];

function PicsIndexCtrl($state, Pic) {
  const vm = this;

  Pic.find()
    .then(res => vm.pics = res.data);
}

export default PicsIndexCtrl;
