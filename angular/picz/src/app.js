import angular from 'angular';
import '@uirouter/angularjs';
import Router from './config/router';

import 'bulma';

// Controllers
import HomeCtrl from './controllers/home';
import LoginCtrl from './controllers/login';
import RegisterCtrl from './controllers/register';
import PicsIndexCtrl from './controllers/pics/index';
import PicsNewCtrl from './controllers/pics/new';
import PicsShowCtrl from './controllers/pics/show';
import UsersShowCtrl from './controllers/users/show';
import CommentsIndexCtrl from './controllers/comments/index';

// Services
import Pic from './services/pic';
import Comment from './services/comment';

angular.module('picz', ['ui.router'])
  .config(Router)
  .controller('HomeCtrl', HomeCtrl)
  .controller('LoginCtrl', LoginCtrl)
  .controller('RegisterCtrl', RegisterCtrl)
  .controller('PicsIndexCtrl', PicsIndexCtrl)
  .controller('PicsNewCtrl', PicsNewCtrl)
  .controller('PicsShowCtrl', PicsShowCtrl)
  .controller('UsersShowCtrl', UsersShowCtrl)
  .controller('CommentsIndexCtrl', CommentsIndexCtrl)
  .service('Pic', Pic)
  .service('Comment', Comment);
