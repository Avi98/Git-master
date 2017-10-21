import {baseUrlContacts} from './Url';
import axios from 'axios';

export function CreateBusinessContact(companyData, contactData, accountData) {
    const payload = {
        companyData,
        contactData,
        accountData
    };
    const dumbData = {
        companyData: {
            name: 'asas',
            aliasName: 'asas',
            gstBusinessType: 'registered data',
            city: 'Nodia',
            address: 'Alok',
            state: 'New delhi',
            pincode: '201301',
            country: 'India'
        },

        contactData: {
            name: 'avinash',
            phone: '9871791655'},

        accountData: {
            balance: '2000',
            isDebit: 'true',
            gstin: 'as23232323332',
            balanceDate: '4044'
        }
    };

    console.log('payload:', dumbData);
    const userId = '59eb261470d2d400122706f1';
    const userPhone = '9871791655';
    const companyId = '59e7609816ace52b80901d58';
    const url = `${baseUrlContacts}?iUserPhone=${userPhone}2&iUserId=${userId}&iCompanyId=${companyId}&skipSimilarCompanyCheck=true`;
    return axios.post(url, dumbData);
}

