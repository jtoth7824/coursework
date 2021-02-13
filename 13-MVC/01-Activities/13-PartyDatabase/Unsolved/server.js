const orm = require('./config/orm.js');

// Find all the pets ordering by the lowest price to the highest price.
orm.selectPartyType('party_name', 'parties', 'party_type', 'grown-up');

// Find a pet in the pets table by an animal_name of Rachel.
orm.selectAll('parties', 'party_name');
orm.selectAll('clients', 'client_name');

// Find the buyer with the most pets.
orm.selectAllClientParties('client_name', 'party_name', 'clients', 'parties', 'client_id');
