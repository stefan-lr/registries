
/**
 *	Shared tools between client and server.
 *
 *	@module SharedTools
 *	@submodule Utils
 */
(function (angular, module) {
	/**
	 *	DateUtils class.
	 *	General functions for date operations, especially conversions
	 *	between front-end and back-end date formats.
	 *
	 * @class DateUtils
	 * @constructor
	 */
	var DateUtils = function($translate) {
		this.$translate = $translate;
	};

	/**
	 *	Converts date from backend to frontend format.
	 *
	 *  @method reverseToString
	 *  @param {String} strReverseDate - date in backend format.
	 *	@return {String} date in frontend format as string
	 */
	DateUtils.prototype.reverseToString = function (strReverseDate) {
		var year = strReverseDate.substring(0,4);
		var month = strReverseDate.substring(4,6);
		var day = strReverseDate.substring(6,8);
		if (year.length === 4 && month.length === 2 && day.length === 2) {
			var d = new Date(year, month-1, day);
			return d.getDate() + '.' + (d.getMonth()+1) + '.' + d.getFullYear();
		}
		return null;
	}

	/**
	 *	Computes the age in years.
	 *
	 *  @method ageOnDate
	 *  @param {Date} refDate - current date for age.
	 *  @param {Date} bornDate - date of birth.
	 *	@return {String} number of years
	 */
	DateUtils.prototype.ageOnDate = function (refDate, bornDate) {
		return Math.floor((refDate-bornDate)/1000/(60*60*24)/365.25);
	};

	/**
	 *	Adds days to a backend formated date.
	 *
	 *  @method strAddDays
	 *  @param {String} strDate - date in backend format.
	 *  @param {int} days - number of days to add.
	 *	@return {String} a date in frontend formated string.
	 */
	DateUtils.prototype.strAddDays = function(strDate,days) {
		var year = strDate.substring(0,4);
		var month = strDate.substring(4,6);
		var day = strDate.substring(6,8);

		if (year.length === 4 && month.length === 2 && day.length === 2) {
			var d = new Date(year, month-1, day);
			d.setDate(d.getDate()+days);
			return new DateUtils().dateToStr(d);
		}
		return null;
	};

	/**
	 *	Converts a backend date into a timestamp.
	 *
	 *  @method strToTS
	 *  @param {String} strDate - date in backend format.
	 *	@return {int} a timestamp for date parameter.
	 */
	DateUtils.prototype.strToTS = function(strDate) {
		if (!strDate) return null;

		var year = strDate.substring(0,4);
		var month = strDate.substring(4,6);
		var day = strDate.substring(6,8);

		if (year.length === 4 && month.length === 2 && day.length === 2) {
			var d = new Date(year, month-1, day);

			return d.getTime();
		}
		return null;
	};

	/**
	 *	Adds days to a date.
	 *
	 *  @method dateAddDays
	 *  @param {Date} strDate - a date.
	 *  @param {int} days - number of days to add.
	 *	@return {Date} a date with added number of days.
	 */
	DateUtils.prototype.dateAddDays = function(dateDate, days) {
		var d = new Date(dateDate);
		d.setDate(dateDate.getDate()+days);
		return (d);
	};

	/**
	 *	Get today in backend date format.
	 *
	 *  @method nowToReverse
	 *	@return {String} today in backend date format.
	 */
	DateUtils.prototype.nowToReverse = function() {
		return new DateUtils().dateToReverse(new Date());
	};

	/**
	 *	Checks that the parameter is after now.
	 *
	 *  @method isReverseAfterNow
	 *  @param {String} reversDate - a date in backend format.
	 *	@return {boolean} - true if reversDate is after today.
	 */
	DateUtils.prototype.isReverseAfterNow = function(reversDate) {
		var nowRevers =  new DateUtils().nowToReverse();
		if (reversDate>nowRevers) {
			return true;
		}
		return false;
	};

	/**
	 *	Converts date to frontend format.
	 *
	 *  @method dateToStr
	 *  @param {Date} dateDate - a date.
	 *	@return {String} - the dateDate in frontend format.
	 */
	DateUtils.prototype.dateToStr = function(dateDate) {
		var ys = dateDate.getFullYear().toString(10);
		var ms = (dateDate.getMonth() + 1).toString(10);

		if (ms.length < 2) {
			ms = '0'.concat(ms);
		}

		var ds = dateDate.getDate().toString();
		if (ds.length < 2) {
			ds = '0'.concat(ds);
		}

		return ds.conat('.',ms,'.',ys);
	};

	/**
	 *	Converts date to backend format.
	 *
	 *  @method dateToStr
	 *  @param {Date} dateDate - a date.
	 *	@return {String} - the dateDate in backend format.
	 */
	DateUtils.prototype.dateToReverse = function(dateDate) {
		var ys = dateDate.getFullYear().toString(10);
		var ms = (dateDate.getMonth() + 1).toString(10);

		if (ms.length < 2) {
			ms = '0'.concat(ms);
		}

		var ds = dateDate.getDate().toString();
		if (ds.length < 2) {
			ds = '0'.concat(ds);
		}

		return ys.concat(ms, ds);
	};

	/**
	 *	Converts date in frontend string to backend format.
	 *
	 *  @method strToReverse
	 *  @param {String} strDate - date in frontend string.
	 *	@return {String} - the dateDate in backend format.
	 */
	DateUtils.prototype.strToReverse = function(strDate) {
		var d = new Date();
		var s = strDate.split('.');
		if (s.length === 3) {
			var day = parseInt(s[0]);
			var month = parseInt(s[1]);
			var year = parseInt(s[2]);

			if ((day > 0 && day < 32) && (month > 0 && month <13) && (year > 0 && year < 10000)) {
				d.setYear(year);
				d.setMonth(month -1);
				d.setDate(day);
				return new DateUtils().dateToReverse(d);
			}
							// invalid
							return null;
						}
						// invalid
						return null;

	};

	/**
	 *	Converts date in backend string to date.
	 *
	 *  @method reverseToDate
	 *  @param {String} strReverseDate - date in backend string.
	 *	@return {Date} - the strReverseDate as date.
	 */
	DateUtils.prototype.reverseToDate = function (strReverseDate) {
		var year = strReverseDate.substring(0,4);
		var month = strReverseDate.substring(4,6);
		var day = strReverseDate.substring(6,8);
		if (year.length === 4 && month.length === 2 && day.length === 2) {
			return new Date(year, month-1, day);
		}
		return null;
	};

	/**
	 * Methods from date-util service in client.
	 */
	DateUtils.prototype.getDateFromYYYYMMDD = function (dateYYYYMMDD) {
		return new DateUtils().reverseToDate(dateYYYYMMDD);
	};
//	DateUtils.prototype.getDateFromDMYYYY = function (dateDMYYYY) {
//		return new DateUtils().(dateDMYYYY);
//	};
	function formatterDMYYYY(date) {
		if (angular.isString(date)) {
			date = new DateUtils().reverseToDate(date);
		}
		if (date instanceof Date) {
			return date.getDate() + '.' + (date.getMonth()+1) + '.' + date.getFullYear();
		}
		return null;
	};
	DateUtils.prototype.formatter = function(value) {
		if (value) {
			var string = formatterDMYYYY(value);
			if (string) {
				return string;
			}

			return value;
		}
		return '';
	};
	DateUtils.prototype.parser = function(value) {
		if (value) {
			var dateUtil = new DateUtils();
			if (!angular.isDate(value)) {
				console.log('Undefined? ' + value);
				value = dateUtil.reverseToDate(dateUtil.strToReverse(value));
			}
			var string = dateUtil.dateToReverse(value);
			if(string){
				return string;
			}
			// invalid
			return undefined;
		}
	};
//	DateUtils.prototype.formatterToBackend = function(value) {
//		if (value) {
//			var string = new DateUtils().dateToStr(value);
//			if(string){
//				return string;
//			}
//
//			return value;
//		}
//		return '';
//	};
	DateUtils.prototype.getNameOfMonth = function(month) {
		if (month == 0) {
			return this.$translate.instant('date.jan');
		}else if (month == 1){
			return this.$translate.instant('date.feb');
		}else if (month == 2){
			return this.$translate.instant('date.mar');
		}else if (month == 3){
			return this.$translate.instant('date.apr');
		}else if (month == 4){
			return this.$translate.instant('date.may');
		}else if (month == 5){
			return this.$translate.instant('date.jun');
		}else if (month == 6){
			return this.$translate.instant('date.jul');
		}else if (month == 7){
			return this.$translate.instant('date.aug');	
		}else if (month == 8){
			return this.$translate.instant('date.sep');
		}else if (month == 9){
			return this.$translate.instant('date.oct');
		}else if (month == 10){
			return this.$translate.instant('date.nov');
		}else if (month == 11){
			return this.$translate.instant('date.dec');
		}
	};

	/**
	 * Exported for server.
	 *
	 * @class DataUtilsModule
	 */
	if (module) {
		/**
		 * Exported for server.
		 *
		 * @property nodejsExport
		 */
		module.exports = {
			DateUtils: new DateUtils()
		};
	} else {
		/**
		 * Exported for client.
		 *
		 * @property angularExport
		 */
		angular.module('xpsui:services').factory('xpsui:DateUtil', [ '$translate', 
			function ($translate) { return new DateUtils($translate); } 
		]);
	}

}(
	(typeof angular === "undefined") ? null : angular,
	(typeof module === "undefined") ? null : module))
