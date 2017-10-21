import React, {Component} from 'react';
import {Card, CardHeader} from 'material-ui/Card';
import {List, ListItem} from 'material-ui/List';
import styled from 'styled-components';
import Avatar from 'material-ui/Avatar';
import Subheader from 'material-ui/Subheader';
import {handshake, cancel} from '../images/images';
import Drawer from 'material-ui/Drawer';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Divider from 'material-ui/Divider';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import {CreateBusinessContact} from '../api/CreateBusinessContact';

const CardDiv = styled.div`
display:flex;
text-align: center;
justifyContent: 'flex-start';
alignItems: 'center';
    padding-Top:2%;
    width:40%;
    height: '45vw';
    margin: 0 auto;
`;

const Form = styled.div`
display: inline-block;
width: 100%;
`;

const Img = styled.img`
width: 6%;
padding-left: 4%';
`;
const CardStyle = {height: '45vw',
    width: '200px',
    flex: '0 0 300px'
};

const ImgCancel = styled.img`
width: 4%;
padding-left: 50%;
`;
const CardStyleNested = {
    height: '45vw',
    width: '200px',
    flex: '0 0 430px'
};

class Contacts extends Component {
    constructor() {
        super();
        this.state = {
            openAddcontact: false,
            showBillingDetails: false,
            gstin: '',
            errors: '',
            fields: {},
            CreditOrDebit: false
        };
    }

showAddContactDrawer = () => {
    this.setState({
        openAddcontact: !this.state.openAddcontact
    });
}

showBillingForm = () => {
    this.setState({showBillingDetails: !this.state.showBillingDetails});
}

onChangeHandleCompanyData = (name, event) => {
    const CompanyData = {};
    CompanyData[name] = event.target.value;
    this.setState({

        companyData: {CompanyData}

    });
}

onSubmit = () => {
    const companyData = {
        name: this.state.LegalBusinessName,
        aliasName: this.state.aliassName,
        gstBusinessType: this.state.gstBusinessType,
        city: this.state.city,
        address: this.state.address,
        state: this.state.stateName,
        pincode: this.state.Pincode
    };

    const contactData = {
        name: this.state.ContactName,
        phone: this.state.ContactMobileNo
    };

    const accountData = {
        balance: this.state.OpeningBalance,
        isDebit: this.state.CreditOrDebit,
        gstin: this.state.gstin,
        balanceDate: this.state.date
    };
    CreateBusinessContact(companyData, contactData, accountData).
        then((res) => {
            console.log('response Api:', res);
        }).
        catch((err) => {
            console.log('response Api:', err);
        });
}
legalNameValidation = (event) => {
    const {value} = event.target;
    if (value.length) {
        this.setState({
            LegalBusinessName: value
        });
        this.setState({errors_LegalName: ''});
    } else {
        this.setState({errors_LegalName: 'Can not be empty'});
    }
}

aliassNameValidation = (event) => {
    const {value} = event.target;
    if (value.length) {
        this.setState({
            aliassName: value
        });
    }
}

contactNameValidate = (event) => {
    const {value} = event.target;
    if (value.length) {
        this.setState({
            ContactName: value
        });
        this.setState({errors_ContactName: ''});
    } else {
        this.setState({errors_LegalName: 'Can not be empty'});
    }
}
openingBalanceValidation = (event) => {
    const {value} = event.target;
    const numsOnly = value.replace(/[^0-9]/g, '');

    if (numsOnly.length < 11) {
        this.setState({
            OpeningBalance: numsOnly
        });
    } else {
        this.setState({
            errors_amount: 'Sorry, this is not a valid Amount'
        });
    }
}

phoneValidation = (event) => {
    const {value} = event.target;
    const numsOnly = value.replace(/[^0-9]/g, '');

    if (numsOnly.length < 11) {
        this.setState({
            ContactMobileNo: numsOnly
        });
    } else {
        this.setState({
            errors_mobile: 'Sorry, this is not a valid Mobile no'
        });
    }
}
pincodeValidation = (event) => {
    const {value} = event.target;
    const numsOnly = value.replace(/[^0-9]/g, '');

    if (numsOnly.length < 7) {
        this.setState({
            Pincode: numsOnly
        });
    } else {
        this.setState({
            errors_pincode: 'Sorry, this is not a valid pincode'
        });
    }
}
gstinValidate = (event) => {
    const value = event.target.value;
    const auto = this.stateAutopupulate;
    if (/^([0][1-9]|[1-2][0-9]|[3][0-5])([a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[1-9a-zA-Z]{1}[zZ]{1}[0-9a-zA-Z]{1})+$/.test(value) || value === '') {
        this.setState({
            gstin: value
        });
    } else {
        console.log('invalid value');
        this.setState({
            error_gstin: 'Invalid Gstin'
        });
    }
    auto();
}
stateAutopupulate = () => {
    const code = this.state.gstin.slice(0, 2);

    console.log('code', code);
    switch (code) {
    case '07' : this.setState({stateName: 'Delhi'});
        break;
    case '08' : this.setState({stateName: 'RAJASTHAN'});
        break;
    case '09' : this.setState({stateName: 'UTTAR PRADESH'});
        break;
    case '10' : this.setState({stateName: 'BIHAR'});
        break;
    case '11' : this.setState({stateName: 'SIKKIM'});
        break;
    case '12' : this.setState({stateName: 'ARUNACHAL PRADESH'});
        break;
    default: this.setState({stateName: ''});
    }
}

billingForm = () => {
    return (
        <div>
            <Img src={handshake} />
            <TextField
                floatingLabelStyle={{size: '2%'}}
                style={{width: '40%'}}
                hintText='Address'
                floatingLabelText='Address'
                onChange={(event) => this.setState({address: event.target.value})}

            />
            <Img src={handshake} />
            <TextField
                floatingLabelStyle={{size: '2%'}}
                style={{width: '40%'}}
                hintText='Registerd GST Buisness'
                floatingLabelText='Registerd GST Buisness'
                onChange={(event) => this.setState({gstBusinessType: event.target.value})}
            />
            <br />
            <Img src={handshake} />
            <TextField
                floatingLabelStyle={{size: '2%'}}
                style={{width: '40%'}}
                hintText='GST IN'
                floatingLabelText='GST IN'
                onChange={(event) => this.gstinValidate(event)}
            />

            <Img src={handshake} />
            <TextField
                floatingLabelStyle={{size: '2%'}}
                style={{width: '40%'}}
                hintText='City'
                floatingLabelText='City'
                onChange={(event) => this.setState({city: event.target.value})}
            />

            <Img src={handshake} style={{paddingLeft: '3%'}} />
            <TextField
                floatingLabelStyle={{size: '2%'}}
                style={{width: '40%'}}
                hintText='State'
                floatingLabelText='State'
                value={this.state.stateName}
            />

            <Img src={handshake} />
            <TextField
                floatingLabelStyle={{size: '2%'}}
                style={{width: '40%'}}
                hintText='Pincode'
                floatingLabelText='Pincode'
                onChange={(event) => this.pincodeValidation(event)}
                errorText={this.state.errors_pincode}
                errorStyle={{
                    float: 'left'
                }}
            />

            <br />
            <Img src={handshake} />
            <TextField
                floatingLabelStyle={{size: '2%'}}
                style={{width: '40%'}}
                hintText='Website (optional)'
                floatingLabelText='Website (optional)'
                onChange={(event) => this.setState({Website: event.target.value})}
            />

        </div>

    );
}

render() {
    return (
        <CardDiv>
            <Card style={CardStyle}>
                <a onClick={() => this.showAddContactDrawer()}>
                    <CardHeader
                        style={{background: '#C4BFBF'}}
                        title='Business Contacts'
                    />
                </a>

                <List>
                    <Subheader>
                        <ListItem
                            leftAvatar={<Avatar src='images/ok-128.jpg' />}
                            primaryText='Manoj Kumar'
                            secondaryText={
                                <p>
                                    {'Benz Company'}
                                </p>
                            }
                        />
                    </Subheader>
                </List>
            </Card>
            <div style={{padding: '3%'}} />
            <Card style={CardStyleNested} />

            <Drawer
                docked={false}
                openSecondary={true}
                open={this.state.openAddcontact}
                width={500}
            >
                <CardHeader
                    title='Add Contact'
                >
                    <ImgCancel src={cancel}
                        onClick={() => {
                            this.showAddContactDrawer()
                            ;
                        }}
                    />
                </CardHeader>
                <Divider />
                <Form>
                    <Img src={handshake} />
                    <TextField
                        floatingLabelStyle={{size: '2%'}}
                        hintText='Legal business name'
                        onChange={(event) => this.legalNameValidation(event)}
                        floatingLabelText='Legal business name'
                        style={{width: '40%'}}
                        errorText={this.state.errors_LegalName}
                        errorStyle={{
                            float: 'left'
                        }}
                    />

                    <Img src={handshake} />
                    <TextField
                        floatingLabelStyle={{size: '2%'}}
                        style={{width: '40%'}}
                        hintText='Display/Aliass Name'
                        floatingLabelText='Display/Aliass Name'
                        onChange={(event) => this.aliassNameValidation(event)}

                    />
                    <br />

                    <Img src={handshake} />
                    <TextField
                        floatingLabelStyle={{size: '2%'}}
                        style={{width: '40%'}}
                        hintText='Contact Name'
                        floatingLabelText='Contact Name'
                        onChange={(event) => this.contactNameValidate(event)}
                        errorText={this.state.errors_ContactName}
                        errorStyle={{
                            float: 'left'
                        }}

                    />
                    <Img src={handshake} />
                    <TextField
                        floatingLabelStyle={{size: '2%'}}
                        style={{width: '40%'}}
                        hintText='Contact Mobile No'
                        floatingLabelText='Contact Mobile No'
                        onChange={(event) => this.phoneValidation(event)}
                        value={this.state.ContactMobileNo}
                        errorText={this.state.errors_mobile}
                        errorStyle={{
                            float: 'left'
                        }}
                    />
                    <br />

                    <div style={{display: 'flex', justifyContent: 'inherit', paddingTop: '3%'}}>
                        <img src={handshake} style={{
                            position: 'relative',
                            width: '5%',
                            height: '40px',
                            float: 'left',
                            display: 'block',
                            padding: '5px',
                            marginLeft: '20px'
                        }}
                        />

                        <TextField
                            floatingLabelStyle={{size: '2%'}}
                            style={{width: '40%'}}
                            floatingLabelText='Opening Balance'
                            onChange={(event) => this.openingBalanceValidation(event)}
                            value={this.state.OpeningBalance}
                            errorText={this.state.errors_amount}
                        />

                        <label className='switch' style={{marginLeft: '50px'}}>
                            <input type='checkbox' id='togBtn' />
                            <div className='slider round'>
                                <span className='on' onClick={() => this.setState({CreditOrDebit: true})}>Debit</span>
                                <span className='off'>Credit</span>
                            </div>

                        </label>
                        <br />
                        <br />
                        <label style={{paddingLeft: '13px'}} />
                        <DatePicker
                            textFieldStyle={{width: '50%'}}
                            hintText='as of:'
                            onChange={(event, date) => {
                                console.log('date', date);
                                this.setState({date});
                            }}
                        />
                    </div>
                    <br />
                    <Divider />
                    <a onClick={this.showBillingForm}>
                        <div style={{color: 'blue', paddingLeft: '5%', paddingTop: '3%'}}> Add builling related details</div>
                    </a>
                    {this.state.showBillingDetails ? this.billingForm() : ''}

                    <div style={{
                        padding: '10%',
                        margin: 'auto',
                        width: '50%',
                        border: '3px',
                        paddingTop: '10%'
                    }}
                    >
                        <Checkbox
                            label='Notify contact to join Invock'
                        />
                        <div style={{paddingLeft: '20%'}}>
                            <RaisedButton
                                backgroundColor='#0DEE45'
                                label='Save' secondary={false}
                                style={{margin: 12}}
                                onClick={() => {
                                    console.log(this.state);
                                    this.onSubmit();
                                }}
                            />
                        </div>
                    </div>
                </Form>
            </Drawer>
        </CardDiv>
    );
}
}

export default Contacts;