//controller per gli eventi in bacheca

const event = require('../models/event');

exports.createNewEvent = function (eventDate, text, author) {
    return event.create({ Data_Evento: eventDate, Testo_Evento: text, Autore_Evento: author });
}

exports.getEvents = function () {
    return event.find({}).sort({ Data_Evento: 'ascending' });
}

exports.getEventsAscendingDateFromToday = function () {
    var date = new Date;
    return event.find({}).sort({ Data_Evento: 'ascending' }).where('Data_Evento').gt(date.setDate(date.getDate() - 1));
}

exports.deleteEventsById = function(eventIds) {
    return event.deleteMany({ _id: { $in: eventIds } })
}