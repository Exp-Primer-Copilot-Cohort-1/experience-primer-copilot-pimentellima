/* eslint-disable camelcase */
const { format, parseISO, subYears } = require('date-fns');

// eslint-disable-next-line no-restricted-globals
const isInvalidDate = (date) => isNaN(Date.parse(date));

class IsDateModified {
	constructor({ date, hour_start, hour_end }) {
		this.date = new Date(date);
		this.hour_start = this.treatmentOfDates(date, hour_start);
		this.hour_end = this.treatmentOfDates(date, hour_end);
	}

	treatmentOfDates(date, hours) {
		const dateTreated = new Date(date);

		if (isInvalidDate(hours)) {
			const hour = hours.split(':')[0];
			const minute = hours.split(':')[1];
			dateTreated.setHours(parseInt(hour, 10));
			dateTreated.setMinutes(parseInt(minute, 10));
			return dateTreated;
		}

		const newDate = new Date(hours);
		dateTreated.setHours(newDate.getHours());
		dateTreated.setMinutes(newDate.getMinutes());

		return dateTreated;
	}

	transformThisDateStringObject() {
		return {
			date: this.date,
			hour_start: this.hour_start.toISOString(),
			hour_end: this.hour_end.toISOString(),
		};
	}

	static compare(dateBefore, dateAfter) {
		try {
			if (
				dateBefore.date.getTime() === dateAfter.date.getTime() &&
				dateBefore.hour_start.getTime() ===
				dateAfter.hour_start.getTime() &&
				dateBefore.hour_end.getTime() === dateAfter.hour_end.getTime()
			) {
				return false;
			}

			return true;
		} catch (error) {
			throw new Error(error);
		}
	}
}

module.exports = IsDateModified;
