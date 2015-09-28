(function(){
	'use strict';
	angular
		.module('invoicesApp.service', [])
		.factory('InvoicesAppService', InvoceApp);
	InvoicesApp.$inject = ['$log']
	function invocesApp ($log){
    var ipc = require('ipc');
		return {
			// Authors
			getCustomers: getCustomers,
			// getAuthor 	: getAuthor,
			// addAuthor 	: addAuthor,
			// editAuthor 	: editAuthor,
			// deleteAuthor: deleteAuthor,
			// // Posts
			// getPosts    : getPosts,
			// getPost     : getPost,
			// addPost     : addPost,
			// editPost    : editPost,
			// deletePost  : deletePost,
			// // Others
			// postsAndAuthors : postsAndAuthors,
			// // Comments
			// addComment 	 : addComment,
			// deleteComment : deleteComment
		}

		/**
		* @description Get all customers.
		* @param none.
		*/
		function getCustomers () {
      ipc.send('get-customers', true);
			return request.then(function(response){
				return response.data;
			})
		}

		// /**
		// * @description Get author by id.
		// * @param author id.
		// */
		// function getAuthor (id) {
		// 	var request = $http({
		// 		method : 'GET',
		// 		url : URI.AUTHOR + id
		// 	});
		// 	return request.then(function(response){
		// 		return response.data;
		// 	})
		// }
    //
		// /**
		// * @description Add new Author.
		// * @param obj - Author to add
		// */
		// function addAuthor (obj) {
		// 	var request = $http({
		// 		method : 'POST',
		// 		url : URI.AUTHOR,
		// 		data : obj
		// 	});
		// 	return request.then(function(response){
		// 		return response.data
		// 	});
		// }
    //
		// /**
		// * @description Edit author
		// * @param id - Author Id.
		// * @param obj - Author to edit.
		// */
		// function editAuthor (id, obj) {
		// 	var request = $http({
		// 		method : 'PUT',
		// 		url : URI.AUTHOR + id,
		// 		data : obj
		// 	});
    //
		// 	return request.then(function(response){
		// 		return response.data;
		// 	});
		// }
    //
		// /**
		// * @description Delete  author
		// * @param id - Author id.
		// */
		// function deleteAuthor (id) {
		// 	var request = $http({
		// 		method : 'DELETE',
		// 		url : URI.AUTHOR + id
		// 	});
    //
		// 	return request.then(function(response){
		// 		return response.data;
		// 	})
		// }
    //
		// /**
		// * @description - Get all Posts
		// * @param - none
		// */
		// function getPosts () {
		// 	var request = $http({
		// 		method : 'GET',
		// 		url : URI.POSTS
		// 	});
		// 	return request.then(function(response){
		// 		return response.data;
		// 	})
		// }
    //
		// /**
		// * @description - Get post by Id
		// * @param id - Post id.
		// */
		// function getPost (id) {
		// 	var request = $http({
		// 		method : 'GET',
		// 		url : URI.POST + id
		// 	});
		// 	return request.then(function(response){
		// 		return response.data;
		// 	})
		// }
    //
		// /**
		// * @description Add new Post.
		// * @param obj - Post to add.
		// */
		// function addPost (obj) {
		// 	var request = $http({
		// 		method : 'POST',
		// 		url : URI.POST,
		// 		data : obj
		// 	});
    //
		// 	return request.then(function(response){
		// 		return response.data;
		// 	})
		// }
    //
		// /**
		// * @description Edit post
		// * @param id - Post id.
		// * @param obj - Post to edit.
		// */
		// function editPost (id, obj) {
		// 	var request = $http({
		// 		method : 'PUT',
		// 		url : URI.POST + id,
		// 		data : obj
		// 	});
    //
		// 	return request.then(function(response){
		// 		return response.data;
		// 	});
		// }
    //
		// /**
		// * @description Delete post
		// * @param id - Post id.
		// */
		// function deletePost (id) {
		// 	var request = $http({
		// 		method : 'DELETE',
		// 		url : URI.POST + id
		// 	});
    //
		// 	return request.then(function(response){
		// 		return response.data;
		// 	});
		// }
    //
		// /**
		// * @description
		// * @param id -
		// */
		// function postsAndAuthors (id) {
		// 	var request = $http({
		// 		method : 'GET',
		// 		url : URI.POST_AUTHORS + id
		// 	});
    //
		// 	return request.then(function(response){
		// 		return response.data;
		// 	});
		// }
    //
		// /**
		// * @description Add Comment.
		// * @param obj - Comment object
		// */
		// function addComment (obj) {
		// 	var request = $http({
		// 		method : 'POST',
		// 		url : URI.COMMENT,
		// 		data : obj
		// 	});
    //
		// 	return request.then(function(response){
		// 		return response.data;
		// 	});
		// }
    //
		// /**
		// * @description Delete comment.
		// * @param id - Comment id.
		// */
		// function deleteComment (id) {
		// 	var request = $http({
		// 		method : 'DELETE',
		// 		url : URI.COMMENT + id
		// 	});
    //
		// 	return request.then(function(response){
		// 		return response.data;
		// 	});
		// }
	}

})();
