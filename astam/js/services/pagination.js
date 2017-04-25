angular.module('BeautySalon')
    .factory('pagination', ['$sce', function( $sce ) {

				var currentPage = 0;
				var itemsPerPage = 5;
				var products = [];
				return {

					setProducts: function( newProducts ) {
						products = newProducts
					}, /* END of setProducts */

					getPageProducts: function(num) {
						var num = angular.isUndefined(num) ? 0 : num;
						var first = itemsPerPage * num;
						var last = first + itemsPerPage;
						currentPage = num;
						last = last > products.length ? products.length : last;
						return products.slice(first, last);
					}, /* END of getPageProducts */

					getTotalPagesNum: function() {
						return Math.ceil( products.length / itemsPerPage );
					}, /* END of getTotalPagesNum */

					getPaginationList: function() {
						var pagesNum = this.getTotalPagesNum();
						var paginationList = [];
						paginationList.push({
							name: $sce.trustAsHtml('&laquo;'),
							link: 'prev'
						});
						for (var i = 0; i < pagesNum; i++) {
							var name = i + 1;
							paginationList.push({
								name: $sce.trustAsHtml( String(name) ),
								link: i
							});
						};
						paginationList.push({
							name: $sce.trustAsHtml('&raquo;'),
							link: 'next'
						});
						if (pagesNum > 1) {
							return paginationList;
						} else {
							return null;
						}
					}, /* END of getPaginationList */

					getPrevPageProducts: function() {
						var prevPageNum = currentPage - 1;
						if ( prevPageNum < 0 ) prevPageNum = 0;
						return this.getPageProducts( prevPageNum );
					}, /* END of getPrevPageProducts */

					getNextPageProducts: function() {
						var nextPageNum = currentPage + 1;
						var pagesNum = this.getTotalPagesNum();
						if ( nextPageNum >= pagesNum ) nextPageNum = pagesNum - 1;
						return this.getPageProducts( nextPageNum );
					}, /* END of getNextPageProducts */

					getCurrentPageNum: function() {
						return currentPage;
					}, /* END of getCurrentPageNum */

				}
    }]); /* END of factory-pagination */