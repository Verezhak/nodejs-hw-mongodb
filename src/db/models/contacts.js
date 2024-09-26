

import { model, Schema } from 'mongoose';
import { contactTypeList, phoneNumberRegexp } from '../../constants/contactsConstants.js';

const contactSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        phoneNumber: {
            type: String,
            match: phoneNumberRegexp,
            required: true,
        },

        email: {
            type: String,
        },
        isFavorite: {
            type: Boolean,
            default: false,
        },

        contactType: {
            type: String,
            enum: contactTypeList,
            required: true,
            default: 'personal',
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);



export const ContactsCollection = model('contacts', contactSchema);
