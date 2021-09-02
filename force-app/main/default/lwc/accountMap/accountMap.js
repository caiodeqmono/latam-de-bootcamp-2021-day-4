import { LightningElement, track, api, wire } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [
    'Account.BillingCountry',
    'Account.BillingState',
    'Account.BillingCity',
    'Account.BillingStreet',
    'Account.BillingPostalCode',
    'Account.Name'
];

export default class AccountMap extends LightningElement {
    @api recordId;
    @api title;
    @track mapMarkers = [];
    error;

    @wire(getRecord, { recordId: '$recordId', fields: FIELDS })
    wiredAccount({ data, error }) {
        if (data) {
            this.error = undefined;
            this.mapMarkers.push(
                {
                    location: {
                        City: data.fields.BillingCity.value,
                        Country: data.fields.BillingCountry.value,
                        PostalCode: data.fields.BillingPostalCode.value,
                        State: data.fields.BillingState.value,
                        Street: data.fields.BillingStreet.value
                    },
                    title: data.fields.Name.value,
                    description: '',
                    icon: 'standard:account'
                }
            );
        } else if (error) {
            this.error = error;
        }
    }

    get mapMarkersNotEmpty() {
        return this.mapMarkers.length > 0;
    }
}