$(function () {
	var region, category, categoryDef, categorySel, sdate, dateDef, dateSel, price, priceDef, priceSel, categoryPs, datePs, pricePs;
	function refresh () {
		  region = $('select[name=region]'),
			category = $('select[name=category]'),
			categoryDef = $('option[value=category]'),
			categorySel = $('select[name=category] option:selected'),
			sdate = $('select[name=date]'),
			dateDef = $('option[value=date]'),
			dateSel = $('select[name=date] option:selected'),
			price = $('select[name=price]'),
			priceDef = $('option[value=price]'),
			priceSel = $('select[name=price] option:selected'),
			categoryPs = $('.one'),
			datePs = $('.two'),
			pricePs = $('.three');
	}

	$('select[name=region]').click(function () {
		refresh();
	  select = region.val();
		  if(select == 'region') {
		  	category.attr('disabled','');
		  	categoryDef.attr('selected','selected');
		  	categorySel.removeAttr('selected');
		  	categoryPs.css('display','block');
		  	sdate.attr('disabled','');
		  	dateDef.attr('selected','');
		  	dateSel.removeAttr('selected');
		  	datePs.css('display','block');
		  	price.attr('disabled','');
		  	priceDef.attr('selected','');
		  	priceSel.removeAttr('selected');
		  	pricePs.css('display','block');
		  } else { 
		  	category.removeAttr('disabled');
		  	categoryPs.css('display','none');
		  }
	});

	$('select[name=category]').click(function () {
		refresh();
	  select = category.val();
		  if(select == 'category') {
		  	sdate.attr('disabled','');
		  	dateDef.attr('selected','');
		  	dateSel.removeAttr('selected');
		  	datePs.css('display','block');
		  	price.attr('disabled','');
		  	priceDef.attr('selected','');
		  	priceSel.removeAttr('selected');
		  	pricePs.css('display','block');
		  } else { 
		  	sdate.removeAttr('disabled');
		  	datePs.css('display','none');
		  }
	});

	$('select[name=date]').click(function () {
		refresh();
	  select = sdate.val();
		  if(select == 'date') {
		  	price.attr('disabled','');
		  	priceDef.attr('selected','');
		  	priceSel.removeAttr('selected');
		  } else { 
		  	price.removeAttr('disabled');
		  	pricePs.css('display','none');
		  }
	});
});