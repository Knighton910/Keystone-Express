var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * No Model
 * ==========
 */

var No = new keystone.List('No');

No.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true },
	password: { type: Types.Password, initial: true, required: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
No.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});


/**
 * Relationships
 */

No.relationship({ ref: 'Post', path: 'posts', refPath: 'author' });


/**
 * Registration
 */

No.defaultColumns = 'name, email, isAdmin';
No.register();
