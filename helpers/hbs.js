module.exports = {
	select: function (selected, options) {
		return options.fn(this).replace(new RegExp(' value=\"' + selected + '\"'), '$& selected="selected"').replace(new RegExp('>' + selected + '</option>'), ' selected="selected"$&');
	},
	anyagcsoport: function (inp) {
		switch (inp) {
			case 1:
				return "Alumínium"
				break;
			case 2:
				return "Réz"
				break;
			case 3:
				return "Sárgaréz"
				break;
			case 4:
				return "Bronz"
				break;
			case 5:
				return "Hűtők"
				break;
			case 6:
				return "Horgany"
				break;
			case 7:
				return "Ólom"
				break;
			case 8:
				return "Akkumulátor"
				break;
			case 9:
				return "Saválló"
				break;
			case 10:
				return "Ón"
				break;
			case 11:
				return "Vasfém"
				break;
			case 12:
				return "Kábelek"
				break;
			case 13:
				return "Trafók, motorok"
				break;
			case 14:
				return "Papír hulladék"
				break;
			default:
				return "N/A"
		}
	}
}