PicsShowCtrl.$inject = ['$state', '$scope', 'Pic', 'Comment'];

function PicsShowCtrl($state, $scope, Pic, Comment) {

  $scope.handleAddCommentClick = function() {
    $scope.newCommentShow = false;
  };

  $scope.handleNewCommentClick = function() {
    $scope.newCommentShow = true;
  };

  $scope.handleNewCommentSubmit = function() {
    Comment
      .create($scope.pic, { text: this.commentText, addedBy: null })
      .then(res => {
        $scope.pic = res.data;
        this.commentText = '';
        $scope.newCommentShow = false;
      });
  };

  $scope.handleCommentDelete = comment => {
    Comment
      .remove($scope.pic, comment)
      .then(res => $scope.pic = res.data);
  };

  Pic
    .findById($state.params.id)
    .then(res => $scope.pic = res.data);
}

export default PicsShowCtrl;
